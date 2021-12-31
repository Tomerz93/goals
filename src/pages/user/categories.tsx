import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { CategoryItem } from '@lib/modals';
import { useArray } from '@lib/hooks';
import {
  Button,
  CategoryGrid,
  LayoutWithoutHeader,
  FlexContainer,
} from '@components/UI';
import { addTag } from '@lib/firebase';
import { useWithAuthContext } from '@lib/context';
import { GOALS_ROUTES } from '@lib/routes';

const LIFE_STYLE_ITEMS = [
  {
    id: '1',
    title: 'Lifestyle',
    value: 'lifestyle',
  },
  {
    id: '2',
    title: 'Health',
    value: 'health',
  },
  {
    id: '3',
    title: 'Fitness',
    value: 'fitness',
  },
  {
    id: '4',
    title: 'Relationship',
    value: 'relationship',
  },
  {
    id: '5',
    title: 'Career',
    value: 'career',
  },
  {
    id: '6',
    title: 'Money',
    value: 'money',
  },
];
const DEVELOPMENT_ITEMS = [
  {
    id: 'a',
    title: 'Development',
    value: 'development',
  },
  {
    id: 'b',
    title: 'Design',
    value: 'design',
  },
  {
    id: 'c',
    title: 'Business',
    value: 'business',
  },
  {
    id: 'd',
    title: 'Javascript',
    value: 'javascript',
  },
  {
    id: 'e',
    title: 'React',
    value: 'react',
  },
];
const CATEGORY_MAP = {
  lifestyle: LIFE_STYLE_ITEMS,
  development: DEVELOPMENT_ITEMS,
};

interface CategoryMap {
  [key: string]: boolean;
}

type SelectedCategories = CategoryMap;

type Layout = {
  Layout: React.ReactNode;
};

type NextPageWithLayout = NextPage & Layout;

const SelectCategories: NextPageWithLayout = () => {
  const { data, push, remove, exists } = useArray<CategoryItem>([]);
  const { user } = useWithAuthContext();
  const router = useRouter();
  const handleOnClick = (category: CategoryItem) => {
    if (exists(category.id)) remove(category.id);
    else push(category);
  };
  const navigateToFeed = () => router.push(GOALS_ROUTES.GOAL_FEED);
  const handleOnSubmit = async () => {
    if (data.length > 0) {
      await addTag(user?.uid, data);
      navigateToFeed();
    }
  };
  const selectedCategories = data.reduce<SelectedCategories>((acc, { id }) => {
    acc[id] = true;
    return acc;
  }, {});

  return (
    <div>
      <h4>What goals would you like to support and see on your main feed?</h4>
      <small style={{ color: '#F5F5F5' }}>
        You can Select up to 20 Tags to see your main feed, dont worry you can
        always change this settings on your profile page later
      </small>
      <CategoryGrid
        selectedCategories={selectedCategories}
        onClick={handleOnClick}
        categories={CATEGORY_MAP}
      />
      <div style={{ marginTop: '5rem' }} />
      <FlexContainer justifyContent="start">
        <Button
          style={{ marginInlineEnd: 'var(--spacing-4)' }}
          disabled={!data.length}
          handleOnClick={handleOnSubmit}
        >
          Submit
        </Button>
        <Button handleOnClick={navigateToFeed}>Set Categories Later</Button>
      </FlexContainer>
    </div>
  );
};

SelectCategories.Layout = LayoutWithoutHeader;

export default SelectCategories;
