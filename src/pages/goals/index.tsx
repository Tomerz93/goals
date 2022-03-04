import { useState } from 'react';
import type { NextPage } from 'next';
import styles from './index.module.scss';
import { GoalCard } from '@components/Goals';
import GenericList from '@components/UI/GenericList/GenericList';
import { client } from '@lib/client';
import { useQuery } from 'react-query';

const Feed: NextPage = () => {
  const [goalsWithCommentCount, setGoalsWithCommentCount] = useState([]);

  const {
    data: { allGoals: goals } = {},
    isLoading,
    error,
  } = useQuery('allGoals', () => client.getAllGoals(), {
    onSuccess: ({ allGoals }) => {
      setGoalsWithCommentCount(
        allGoals.map((goal) => ({
          ...goal,
          commentsCount: goal.comments.length,
        }))
      );
    },
  });

  if (isLoading || !goals) return <div>Loading...</div>;
  return (
    <div className={`${styles.feedContainer} mt-5`}>
      <div>
        {goals?.length > 0 && (
          <GenericList
            items={goalsWithCommentCount}
            gap={4}
            component={GoalCard}
            resourceName="goal"
          />
        )}
      </div>
    </div>
  );
};

export default Feed;
