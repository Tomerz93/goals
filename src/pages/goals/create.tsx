import React from 'react';
import type { NextPage } from 'next';
import type { Goal } from '@lib/modals';
import { StepOne, StepTwo } from '@components/Goals/GoalForm';
import { FormProvider, useFormContext } from '@lib/context/form';
import { client } from '@lib/client';
import { useMutation } from 'react-query';

interface CreateGoalProps {
  formData: {
    stepOneData: Goal;
    stepTwoData: { title: { value: string }; description: { value: string } }[];
  } | null;
}

const CreateGoal: NextPage<CreateGoalProps> = ({
  formData: defaultFormData,
}) => {
  const { currentStep, formData } = useFormContext();
  const { stepOneData, stepTwoData } = defaultFormData ?? {};
  const handleOnSubmit = async (
    lastStepData: { title: { value: string }; description: { value: string } }[]
  ) => {
    const steps = lastStepData.map(({ title, description }) => ({
      title: title.value,
      description: description.value,
      isCompleted: false,
    }));
    const { completion_date } = formData[0];
    const goal = {
      ...formData[0],
      estimatedCompletionDate: new Date(completion_date),
      steps,
    };
    addGoal({
      ...goal,
    });
  };
  const { mutate: addGoal } = useMutation(
    ({
      title,
      description,
      steps,
      estimatedCompletionDate,
      categories,
    }: {
      title: string;
      description: string;
      categories: any;
      steps: any;
      estimatedCompletionDate: string;
    }) =>
      client.createGoal({
        title,
        description,
        steps,
        estimatedCompletionDate,
        categories,
      })
  );

  const STEP_TEXTS = ['Create Goal', 'Add Steps'];
  console.log(stepOneData);
  const STEPS = [
    <StepOne
      defaultValues={
        stepOneData
        // estimatedCompletionDate: stepOneData
        //   ? format(
        //       new Date(+stepOneData?.estimatedCompletionDate),
        //       'yyyy-MM-dd'
        //     )
        //   : '',
      }
    />,
    <StepTwo defaultValues={stepTwoData} handleOnSubmit={handleOnSubmit} />,
  ];
  return (
    <div>
      <h3 className="mb-4">{STEP_TEXTS[currentStep]}</h3>
      {STEPS[currentStep]}
    </div>
  );
};

CreateGoal.Provider = FormProvider;

export default CreateGoal;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { id } = query ?? '';
  if (!id) return { props: { formData: null } };
  const data = await client.getGoal({ id });
  const { goal } = data ?? {};
  if (!goal?.id) {
    return {
      props: {
        formData: {},
      },
    };
  }
  const { title, description, steps, categories, estimatedCompletionDate } =
    goal;
  return {
    props: {
      formData: {
        stepOneData: {
          title,
          estimatedCompletionDate,
          categories,
          description,
        },
        stepTwoData: steps,
      },
    },
  };
}
