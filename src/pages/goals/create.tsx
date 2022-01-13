import React, { useEffect, useRef, useMemo } from 'react';
import { Button, Input } from '@components/UI';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useArray, useLoadFIreBaseDocument } from '@lib/hooks';
import { IoIosAdd } from 'react-icons/io';
import { IoRemoveCircleOutline } from 'react-icons/io5';
import { FormLabelDescription } from '@components/UI';
import { useRouter } from 'next/router';
import { Goal } from '@lib/modals';
import GenericList from '@components/UI/GenericList/GenericList';
import type { CategoryItem } from '@lib/modals';
import styles from './create.module.scss';
import SelectCategories from 'pages/user/categories';

const INPUT_GROUP_SIZE = 2;

type Inputs = {
  title: string;
  description: string;
};

interface StepInput {
  id: string;
  name: string;
  type: string;
  labelText: string;
}

const STEP_INPUT = {
  id: '1',
  name: 'step_title',
  type: 'text',
  labelText: 'title',
};
const STEP_DESCRIPTION_INPUT = {
  id: '10',
  name: 'step_description',
  type: 'textarea',
  labelText: 'description',
};

const getInputName = (name: string, index: number) =>
  index > 0 ? `${name}_${index}` : name;

const generateStepInputs = (amount: number) =>
  Array.from({ length: amount }, (_, i) => {
    const stepName = getInputName('step_title', i);
    const descriptionName = getInputName('step_description', i);
    return [
      {
        id: `${Math.random()}`,
        name: stepName,
        type: 'text',
        labelText: 'title',
      },
      {
        id: `${Math.random()}`,
        name: descriptionName,
        type: 'description',
        labelText: 'description',
      },
    ];
  }).flat();

const LABELS = ['title', 'description'];

const getIsEven = (num: number) => num % 2 === 0;

const LIFE_STYLE_ITEMS = [
  {
    id: '1',
    title: 'Lifestyle',
    value: 'lifestyle',
  },
  {
    id: '2',
    title: 'Health',
    value: 'health',
  },
  {
    id: '3',
    title: 'Fitness',
    value: 'fitness',
  },
  {
    id: '4',
    title: 'Relationship',
    value: 'relationship',
  },
  {
    id: '5',
    title: 'Career',
    value: 'career',
  },
  {
    id: '6',
    title: 'Money',
    value: 'money',
  },
];
const DEVELOPMENT_ITEMS = [
  {
    id: 'a',
    title: 'Development',
    value: 'development',
  },
  {
    id: 'b',
    title: 'Design',
    value: 'design',
  },
  {
    id: 'c',
    title: 'Business',
    value: 'business',
  },
  {
    id: 'd',
    title: 'Javascript',
    value: 'javascript',
  },
  {
    id: 'e',
    title: 'React',
    value: 'react',
  },
];

const CreateGoal: NextPage = () => {
  const { query } = useRouter();
  const {
    document: goal,
    error,
    isLoading,
  } = useLoadFIreBaseDocument<Goal>('goals', query?.id as string);
  const {
    addMany,
    set,
    removeMany,
    data: stepTitles,
  } = useArray<StepInput>([STEP_INPUT, STEP_DESCRIPTION_INPUT]);
  const {
    data: selectedCategories,
    push,
    remove,
    exists,
  } = useArray<CategoryItem>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });
  const isStepsPopulate = useRef(false);
  // handle repopulate form fields and creation of step elements
  useEffect(() => {
    if (goal) {
      const { title, categories, estimatedCompletionDate, description, steps } =
        goal;
      setValue('title', title);
      setValue('description', description);
      setValue('categories', categories[0].title);
      setValue('estimatedCompletionDate', estimatedCompletionDate);
      if (steps.length) set(generateStepInputs(steps.length));
      isStepsPopulate.current = true;
    }
  }, [goal]);
  // handle setting the value of the input after adding the input to state
  useEffect(() => {
    if (isStepsPopulate.current && goal) {
      const { steps } = goal;
      steps.forEach((step, index) => {
        const stepTitle = getInputName('step_title', index);
        const descriptionTitle = getInputName('step_description', index);
        setValue(stepTitle, step.title);
        setValue(descriptionTitle, step.description);
      });
      isStepsPopulate.current = false;
    }
  }, [stepTitles]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const addStepGroup = () => addMany(generateStepInputs(1));

  const removeGroupAtIndex = (index: number) => removeMany([index, index - 1]);
  const getIsMinLength = (minLength: number) => (val: string) =>
    val.length >= minLength || `Must be at least ${minLength} characters`;

  const InputError: React.FC<{ message: string }> = ({ message }) =>
    message ? (
      <span
        className="my-2"
        style={{ display: 'block', color: 'var(--danger)' }}
      >
        {message}
      </span>
    ) : null;

  const CategorySelectItem: React.FC = ({ category, handleOnAddCategory }) => {
    const { title } = category;
    console.log(handleOnAddCategory);
    return (
      <p
        onClick={() => {
          handleOnAddCategory?.(category);
        }}
      >
        {title}
      </p>
    );
  };
  const handleOnAddCategory = (category) => {
    const foundCategory = exists(category.id);
    console.log(category);
    if (exists(category.id)) {
      remove(category.id);
    } else push(category);
  };
  const FilteredCategories = useMemo(
    () =>
      LIFE_STYLE_ITEMS.filter(({ title }) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <div>
      <h1 className="mb-4">Create Goal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div>
            <Input
              register={register}
              required
              validation={{
                required: 'Please insert a title',
                getIsMinLength: getIsMinLength(3),
              }}
              name="title"
              type="text"
              mode="uncontrolled"
              error={errors?.title}
            />
            <InputError message={errors.title?.message} />
          </div>
          <div>
            <Input
              register={register}
              validation={{
                required: 'Please insert a Description',
                getIsMinLength: getIsMinLength(3),
              }}
              name="description"
              type="textarea"
              mode="uncontrolled"
              error={errors?.title}
              explanation="This will be be the title posted on the feed"
            />
            <InputError message={errors.description?.message} />
          </div>
          <Input
            register={register}
            name="completion_date"
            labelText="Estimated Completion Date"
            type="date"
            mode="uncontrolled"
            explanation="Try to choose a realistic end date"
          />
          <Input
            name="categories"
            type="text"
            mode="controlled"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {JSON.stringify(selectedCategories)}
          <GenericList
            className={styles.categoryListContainer}
            items={FilteredCategories}
            resourceName="category"
            component={CategorySelectItem}
            otherProps={{ handleOnAddCategory }}
          />
          <FormLabelDescription
            title="steps"
            description="You must add at least one step, it is good to be able to spread
            your tasks into small steps"
          />
          {stepTitles.map(({ name, type, labelText, id }, index) => (
            <div className="ml-4" key={id}>
              <Input
                register={register}
                validation={{
                  required: `Please insert a ${
                    LABELS[getIsEven(index) ? 0 : 1]
                  }`,
                }}
                name={name}
                labelText={labelText}
                type={type}
                mode="uncontrolled"
              />
              <InputError message={errors[name]?.message} />
              {/* will only render for each 2nd element which is not the first group */}
              {(index + 1) % INPUT_GROUP_SIZE === 0 && index !== 1 && (
                <Button
                  variant="minimal"
                  type="button"
                  handleOnClick={() => removeGroupAtIndex(index)}
                >
                  <IoRemoveCircleOutline />
                  Remove Group
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button type="button" variant="minimal" handleOnClick={addStepGroup}>
          <IoIosAdd />
          Add Goal
        </Button>
        <Button disabled={!isValid} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateGoal;
