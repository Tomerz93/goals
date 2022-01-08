import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useLoadFIreBaseDocument } from '@lib/hooks';
import { Goal } from '@lib/modals';
import type { Timestamp } from 'firebase/firestore';
import { formatDate, getDateToDateToNow } from 'utils/date';
import { Steps } from '@components/Goals';

const Label: React.FC<{ title: string }> = ({ title, children }) => (
  <div>
    <dt style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-1)' }}>
      {title}
    </dt>
    <dl style={{ marginBottom: 'var(--spacing-2)' }}>{children}</dl>
  </div>
);
const ShowGoal: NextPage = () => {
  const { query } = useRouter();
  const { document, error, isLoading } = useLoadFIreBaseDocument<Goal>(
    'goals',
    query.id as string
  );
  const getCompletionDate = (timeStamp: Timestamp | null): Date | null => {
    if (!timeStamp) return null;
    return estimatedCompletionDate?.toDate() ?? null;
  };
  const {
    title,
    description,
    estimatedCompletionDate = null,
    categories = [],
    steps = [],
  } = document ?? {};
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--spacing-3)' }}>{title}</h1>
      <Label title="Description">
        <p>{description}</p>
      </Label>
      <Label title="Estimated Completion Date">
        {formatDate(getCompletionDate(estimatedCompletionDate))}
      </Label>
      <Label title="Estimated Remaining Time">
        {getDateToDateToNow(getCompletionDate(estimatedCompletionDate))}
      </Label>
      <Label title="Steps">
        <Steps steps={steps} />
      </Label>
      <Label title="Categories">
        {categories?.length > 0 &&
          categories.map(({ title }) => <p key={title}>{title}</p>)}
      </Label>
    </div>
  );
};

export default ShowGoal;
