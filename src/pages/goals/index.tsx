import type { NextPage } from 'next';
import styles from './index.module.scss';
import { GoalCard } from '@components/Goals';
import { useUserContext } from '@lib/context/user';
import { useRef } from 'react';
import { useIntersectionObserver } from '@lib/hooks/useIntersectionObersver';
import { FlexContainer } from '@components/UI';

const Feed: NextPage = () => {
  const { user } = useUserContext();
  const ref = useRef(null);
  // const { isIntersecting } = useIntersectionObserver(ref, { threshold: 0.5 });
  return (
    <div className={styles.feedContainer}>
      <GoalCard />
    </div>
  );
};

export default Feed;
