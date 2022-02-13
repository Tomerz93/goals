import type { InferGetServerSidePropsType, NextPage } from 'next';
import type { Category, Step } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { formatDate, getDateToDateToNow } from '@utils/date';
import { Steps } from '@components/Goals';
import Link from 'next/link';
import { client } from '@lib/client';

interface GoalPageProps {
  goalData: {
    title: string;
    description: string;
    estimatedCompletionDate: string;
    categories: Category[];
    steps: Step[];
  };
}

const Label: React.FC<{ title: string }> = ({ title, children }) => (
  <div>
    <dt style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-1)' }}>
      {title}
    </dt>
    <dl style={{ marginBottom: 'var(--spacing-2)' }}>{children}</dl>
  </div>
);
const ShowGoal: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  goalData,
}) => {
  const { query } = useRouter();

  const getCompletionDate = (timeStamp: number): number | null => {
    // add formatting
    if (!timeStamp) return null;
    return getDateToDateToNow(new Date(+timeStamp));
  };
  const {
    title,
    description,
    estimatedCompletionDate = null,
    categories = [],
    steps = [],
  } = goalData ?? {};
  console.log(estimatedCompletionDate);
  console.log(new Date(+estimatedCompletionDate));
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--spacing-3)' }}>{title}</h1>
      <Label title="Description">
        <p>{description}</p>
      </Label>
      <Label title="Estimated Completion Date">
        {formatDate(new Date(+estimatedCompletionDate))}
      </Label>
      <Label title="Estimated Remaining Time">
        {getCompletionDate(estimatedCompletionDate)}
      </Label>
      <Label title="Steps">
        <Steps steps={steps} />
      </Label>
      <Label title="Categories">
        {categories?.length > 0 &&
          categories.map(({ title }) => <p key={title}>{title}</p>)}
      </Label>
      <Link href={`/goals/create?id=${query?.id}`}>Edit</Link>
    </div>
  );
};

export default ShowGoal;

export async function getServerSideProps(ctx) {
  const { userId: currentUserId } = (await getSession(ctx)) ?? { userId: '' };
  const { query } = ctx;
  const { id } = query ?? '';
  if (!id) return { props: { goalData: null } };
  try {
    const data = await client.getGoal({ id });
    const { goal } = data ?? {};
    const {
      title,
      description,
      steps,
      categories,
      estimatedCompletionDate,
      user: { id: goalOwner },
    } = goal;

    if (currentUserId !== goalOwner) {
      return {
        notFound: true,
        props: {
          goalData: {},
        },
      };
    }
    return {
      props: {
        goalData: {
          title,
          description,
          steps,
          categories,
          estimatedCompletionDate,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
      props: {
        goalData: {},
      },
    };
  }
}
