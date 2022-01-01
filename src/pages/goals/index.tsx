import { GoalCard } from '@components/Goals';
import { useUserContext } from '@lib/context/user';
import type { NextPage } from 'next';
import styles from './index.module.scss';
import React from 'react';

const Feed: NextPage = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <div className={styles.feedContainer}>
      <GoalCard />
    </div>
  );
};

export default Feed;
