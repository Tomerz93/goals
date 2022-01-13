import type { NextPage } from 'next';
import styles from './index.module.scss';
import { GoalCard } from '@components/Goals';
import { useUserContext } from '@lib/context/user';
import { useRef, useEffect, useState } from 'react';
import { FlexContainer } from '@components/UI';
import { loadAllGoals } from '@lib/firebase';
import { GoalWIthUser } from '@lib/modals/goal';
import { useWithAuthContext } from '@lib/context/auth';

const Feed: NextPage = () => {
  const { user } = useUserContext();
  const ref = useRef(null);
  const [goals, setGoals] = useState<GoalWIthUser[] | []>([]);
  const { user: ath } = useWithAuthContext();
  console.log(ath);
  useEffect(() => {
    const load = async () => {
      const data = await loadAllGoals();
      setGoals(() => data);
      console.log('data', data.length);
    };
    load();
  }, []);
  console.log(goals.length);
  // const { isIntersecting } = useIntersectionObserver(ref, { threshold: 0.5 });
  if (goals.length === 0) return <div>Loading...</div>;
  return (
    <div className={styles.feedContainer}>
      {goals.map((goal) => (
        <GoalCard goal={goal} key={goal.id}></GoalCard>
      ))}
    </div>
  );
};

export default Feed;
