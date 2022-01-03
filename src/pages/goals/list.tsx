import { useUserContext } from '@lib/context/user';
import type { NextPage } from 'next';
import styles from './index.module.scss';
import React, { ReactElement, useState, useEffect, useMemo } from 'react';
import { getGoalsByUser } from '@lib/firebase';
import {
  Tabs,
  TabList,
  TabPanel,
  TabButton,
  TabsPanelList,
} from '@components/UI';
import GenericList from '@components/UI/GenericList/GenericList';
import GoalListCard from '@components/Goals/GoalListCard/GoalListCard';

interface Goal {
  completed: boolean;
  title: string;
}

type sortGoalReturnType =
  | { inProgress: []; completed: [] }
  | { inProgress: []; completed: Goal[] }
  | { inProgress: Goal[]; completed: [] }
  | { inProgress: Goal[]; completed: [] };

const sortGoals = (goals: Goal[]) =>
  goals.length > 0
    ? goals.reduce(
        (acc, curr) => {
          if (curr.completed) acc.completed.push(curr);
          else acc.inProgress.push(curr);
          return acc;
        },
        { inProgress: [], completed: [] }
      )
    : { inProgress: [], completed: [] };

const GoalList = ({ goals }) => (
  <GenericList
    items={goals}
    gap={4}
    component={GoalListCard}
    resourceName="goal"
    type="list"
  />
);

const Feed: NextPage = () => {
  const { user } = useUserContext();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [goals, setGoals] = useState<{ inProgress: []; completed: [] }>({
    inProgress: [],
    completed: [],
  });
  const { inProgress, completed } = goals;
  useEffect(() => {
    const fetch = async () => {
      if (user?.id) {
        const data = await getGoalsByUser(user.id);
        if (data && data?.length > 0) setGoals(sortGoals(data));
      }
    };
    fetch();
  }, [user]);
  return (
    <div className={styles.feedContainer}>
      <Tabs activeTabIndex={activeTabIndex} handleOnClick={setActiveTabIndex}>
        <TabList>
          <TabButton>In Progress</TabButton>
          <TabButton>completed</TabButton>
        </TabList>
        <TabsPanelList>
          <TabPanel>
            <GoalList goals={inProgress} />
          </TabPanel>
          <TabPanel>
            <GoalList goals={completed} />
          </TabPanel>
        </TabsPanelList>
      </Tabs>
    </div>
  );
};

export default Feed;
