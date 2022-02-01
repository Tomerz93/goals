import type { NextPage } from 'next';
import styles from './index.module.scss';
import { GoalCard } from '@components/Goals';
import { useUserContext } from '@lib/context/user';
import { getAllGoals } from '@lib/firebase';
import GenericList from '@components/UI/GenericList/GenericList';
import { useAsyncCall } from '@lib/hooks/useAsyncCall';
import { GoalWithUserSmall } from '@components/Goals/GoalCard/GoalCard';
import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { client } from '../../../lib/client';
import { useQuery } from 'react-query';

const Feed: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: { goals = null } = {}, isLoading } = useQuery('allGoals', () =>
    client.allGoals()
  );

  if (isLoading || !goals) return <div>Loading...</div>;
  return (
    <div className={`${styles.feedContainer} mt-5`}>
      <div>
        {goals?.length > 0 && (
          <GenericList
            items={goals}
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
