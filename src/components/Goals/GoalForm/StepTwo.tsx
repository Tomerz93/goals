import React, { useEffect, useState } from 'react';
import { InputError, Input } from '@components/UI/Input';
import { Button, FormLabelDescription } from '@components/UI';
import { StepNavigator } from '.';
import { useFormContext } from '@lib/context/form';

const getIsNotMinLength = (minLength: number) => (val: string) =>
  val.length >= minLength
    ? null
    : { message: `Must be at least ${minLength} characters` };

const TITLE = 'title';
const DESCRIPTION = 'description';

const getInputGroup = () => ({
  [TITLE]: {
    value: '',
    placeholder: '',
    error: '',
    isDirty: false,
    isRequired: true,
    minLength: 3,
    validations: [getIsNotMinLength(3)],
  },
  [DESCRIPTION]: {
    value: '',
    placeholder: '',
    error: '',
    isDirty: false,
    isRequired: true,
    minLength: 5,
    validations: [getIsNotMinLength(5)],
  },
});

interface StepTwoProps {
  defaultValues?: {
    title: {
      value: string;
    };
    description: {
      value: string;
    };
  }[];
  handleOnSubmit: (data: any, index: number) => void;
}
const StepTwo: React.FC<StepTwoProps> = ({
  defaultValues = [],
  handleOnSubmit,
}) => {
  const [inputs, setInputs] = useState(
    defaultValues
      ? defaultValues?.map(({ description, title }) => ({
          [TITLE]: {
            value: title,
            placeholder: '',
            error: '',
            isDirty: false,
            isRequired: true,
            minLength: 3,
            validations: [getIsNotMinLength(3)],
          },
          [DESCRIPTION]: {
            value: description,
            placeholder: '',
            error: '',
            isDirty: false,
            isRequired: true,
            minLength: 3,
            validations: [getIsNotMinLength(3)],
          },
        }))
      : [getInputGroup()]
  );

  const {
    updateFormData,
    onPreviousStep: goBack,
    currentStepData,
  } = useFormContext();

  useEffect(() => {
    if (currentStepData) setInputs(currentStepData);
  }, [currentStepData]);

  const onInputBlur = (value: string, type: string, index: number) => {
    const newInputs = [...inputs];
    const input = newInputs[index][type];
    input.isDirty = true;
    if (input.isDirty && !value) input.error = 'This field is required';
    setInputs(newInputs);
  };

  const setInputValue = (value: string, type: string, index: number) => {
    const newInputs = [...inputs];
    const input = newInputs[index][type];
    input.value = value;
    const isInvalidInput = input.validations[0](value);
    if (isInvalidInput) input.error = isInvalidInput?.message;
    if (!isInvalidInput && value) input.error = '';
    setInputs(newInputs);
  };
  const handleOnRemove = (index: number) =>
    setInputs(inputs.filter((_, i) => i !== index));

  const isFormValid = inputs?.every(
    ({ description, title }) =>
      description.value && title.value && !description.error && !title.error
  );
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit(inputs, 1);
        }}
      >
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <FormLabelDescription
            title="steps"
            description="You must add at least one step, it is good to be able to spread
            your tasks into small steps"
          />
          {inputs.map(({ title, description }, index) => (
            <>
              <div>
                <Input
                  required
                  name={TITLE}
                  type="text"
                  mode="controlled"
                  value={title.value}
                  onBlur={() => onInputBlur(title.value, TITLE, index)}
                  onChange={(e) => {
                    setInputValue(e.target.value, TITLE, index);
                  }}
                  error={!!title?.error}
                />
                <InputError message={title?.error} />
              </div>
              <div>
                <Input
                  name={DESCRIPTION}
                  type="textarea"
                  mode="controlled"
                  value={description.value}
                  onBlur={() =>
                    onInputBlur(description.value, DESCRIPTION, index)
                  }
                  onChange={(e) => {
                    setInputValue(e.target.value, DESCRIPTION, index);
                  }}
                  error={!!description.error}
                  explanation="Step Description"
                />
                <InputError message={description?.error} />
              </div>
              {index > 0 && (
                <Button
                  handleOnClick={() => handleOnRemove(index)}
                  variant="minimal"
                >
                  Remove
                </Button>
              )}
            </>
          ))}
          <Button
            variant="minimal"
            handleOnClick={() => {
              setInputs((prev) => [...prev, getInputGroup()]);
            }}
          >
            Add
          </Button>
          <Button disabled={!isFormValid} type="submit">
            Submit
          </Button>
        </div>
      </form>
      <StepNavigator
        stepAmount={2}
        onPreviousStep={() => {
          updateFormData(inputs, 1);
          goBack();
        }}
      />
    </div>
  );
};

export default StepTwo;
