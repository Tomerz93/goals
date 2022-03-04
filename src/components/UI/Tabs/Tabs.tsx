import React from 'react';
import { Button, FlexContainer } from '..';
import styles from './Tabs.module.scss';

interface TabsProps {
  activeTabIndex: number;
  children: React.ReactNode[];
  handleOnClick: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  activeTabIndex,
  handleOnClick,
}) => {
  const childrenArray = React.Children.toArray(children);
  const [TabList, TabPanelList] = childrenArray;
  if (!React.isValidElement(TabList) || !React.isValidElement(TabPanelList))
    return null;
  return (
    <div>
      {React.cloneElement(TabList, { activeTabIndex, handleOnClick })}
      {React.cloneElement(TabPanelList, { index: activeTabIndex })}
    </div>
  );
};

interface TabButtonProps {
  currentIndex: number;
  isSelected: boolean;
  children: React.ReactNode[];
  handleOnClick: (index: number) => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  currentIndex,
  isSelected,
  handleOnClick,
  children,
}) => (
  <Button
    variant="tab"
    isSelected={isSelected}
    handleOnClick={() => {
      handleOnClick(currentIndex);
    }}
  >
    {children}
  </Button>
);

export const TabPanel: React.FC = ({ children }) => <>{children}</>;

interface TabListProps {
  children: React.ReactNode[];
  handleOnClick: (index: number) => void;
  activeTabIndex: number;
}

export const TabList: React.FC<TabListProps> = ({
  children,
  handleOnClick,
  activeTabIndex,
}) => {
  const childrenArray = React.Children.toArray(children);
  if (!childrenArray.length) return null;
  return (
    <FlexContainer
      justifyContent="center"
      alignItems="center"
      gap="2"
      className={styles.tabsContainer}
    >
      {childrenArray.map((child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              currentIndex: i,
              handleOnClick,
              isSelected: i === activeTabIndex,
            })
          : null
      )}
    </FlexContainer>
  );
};
interface TabsPanelListProps {
  children: React.ReactNode[];
  index: number;
}

export const TabsPanelList: React.FC<TabsPanelListProps> = ({
  children,
  index,
}) => {
  const childrenArray = React.Children.toArray(children);
  return !React.isValidElement(childrenArray[index])
    ? null
    : (childrenArray[index] as React.ReactElement);
};
