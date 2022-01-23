import type { NextPage } from 'next';
import styles from './index.module.scss';
import { GoalCard } from '@components/Goals';
import { useUserContext } from '@lib/context/user';
import { useEffect, useRef, useState } from 'react';
import { getAllGoals } from '@lib/firebase';
import GenericList from '@components/UI/GenericList/GenericList';
import { Modal } from '@components/UI';

const Feed: NextPage = () => {
  const { user } = useUserContext();
  const ref = useRef(null);
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const goals = await getAllGoals();
      console.log(goals);
      setGoals(goals);
    };
    fetch();
  }, []);
  return (
    <div className={`${styles.feedContainer} mt-5`}>
      <div>
        {goals.length > 0 && (
          <GenericList
            items={goals}
            gap={4}
            component={GoalCard}
            resourceName="goal"
          />
        )}
      </div>
      <Modal>children</Modal>
    </div>
  );
};

export default Feed;
