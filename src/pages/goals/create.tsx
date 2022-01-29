import React from 'react';
import type { NextPage } from 'next';
import type { Goal } from '@lib/modals';
import { StepOne, StepTwo } from '@components/Goals/GoalForm';
import { FormProvider, useFormContext } from '@lib/context/form';
import { addGoal, getGoalById } from '@lib/firebase';
import { useUserContext } from '@lib/context/user';

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
  const { user } = useUserContext();
  const { stepOneData, stepTwoData } = defaultFormData ?? {};
  const handleOnSubmit = async (
    lastStepData: { title: { value: string }; description: { value: string } }[]
  ) => {
    const goal = {
      userId: user!.id,
      ...formData[0],
      estimatedCompletionDate: '',
      steps: lastStepData.map(({ title, description }) => ({
        title: title.value,
        description: description.value,
        completed: false,
      })),
    };
    await addGoal(user!.id, goal);
  };
  const STEP_TEXTS = ['Create Goal', 'Add Steps'];
  const STEPS = [
    <StepOne defaultValues={stepOneData} />,
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
  try {
    const goal = (await getGoalById(id)) as Goal;
    const { title, categories, estimatedCompletionDate, description, steps } =
      goal;
    if (!goal) {
      return {
        props: {
          formData: null,
        },
      };
    }
    const stepsData = steps.map(({ description, title }) => ({
      description: { value: description },
      title: { value: title },
    }));
    return {
      props: {
        formData: {
          stepOneData: {
            title,
            categories,
            description,
          },
          stepTwoData: stepsData,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        initialData: {},
      },
    };
  }
}
