import type { NextPage } from 'next';
import styles from './index.module.scss';
import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabList,
  TabPanel,
  TabButton,
  TabsPanelList,
} from '@components/UI';
import GenericList from '@components/UI/GenericList/GenericList';
import GoalListCard from '@components/Goals/GoalListCard/GoalListCard';
import { client } from '../../../lib/client';
import { useQuery } from 'react-query';
import type { Goal } from 'prisma/prisma-client';

type sortGoalReturnType =
  | { inProgress: []; isCompleted: [] }
  | { inProgress: []; isCompleted: Goal[] }
  | { inProgress: Goal[]; isCompleted: [] }
  | { inProgress: Goal[]; isCompleted: [] };

const sortGoals = (goals: Goal[]) =>
  goals.length > 0
    ? goals.reduce(
        (acc, curr) => {
          if (curr.isCompleted) acc.isCompleted.push(curr);
          else acc.inProgress.push(curr);
          return acc;
        },
        { inProgress: [], isCompleted: [] }
      )
    : { inProgress: [], isCompleted: [] };

const GoalList: React.FC<{ goals: Goal[] }> = ({ goals }) => (
  <GenericList
    items={goals}
    gap={4}
    component={GoalListCard}
    resourceName="goal"
    type="list"
  />
);

const Feed: NextPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [goals, setGoals] = useState<{ inProgress: []; isCompleted: [] }>({
    inProgress: [],
    isCompleted: [],
  });
  const { inProgress, isCompleted } = goals;
  const { data, status } = useQuery('goalList', () => client.goalList(), {
    onSuccess: (data) => {
      const { goals } = data;
      console.log(goals);
      setGoals(sortGoals(goals));
    },
  });

  return (
    <div className={styles.feedContainer}>
      <Tabs activeTabIndex={activeTabIndex} handleOnClick={setActiveTabIndex}>
        <TabList>
          <TabButton>In Progress</TabButton>
          <TabButton>Completed</TabButton>
        </TabList>
        <TabsPanelList>
          <TabPanel>
            <GoalList goals={inProgress} />
          </TabPanel>
          <TabPanel>
            <GoalList goals={isCompleted} />
          </TabPanel>
        </TabsPanelList>
      </Tabs>
    </div>
  );
};

export default Feed;
