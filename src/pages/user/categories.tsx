import React, { useEffect } from 'react';
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
import { useUserContext } from '@lib/context/user';
import { GOALS_ROUTES } from '@lib/routes';
import { useAsyncCall } from '@lib/hooks/useAsyncCall';
import { NextPageWithLayout } from '@lib/modals/generic';

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

const SelectCategories: NextPageWithLayout = () => {
  const { data, set, push, remove, exists } = useArray<CategoryItem>([]);
  const { user, isLoading } = useUserContext();
  const { call, isSuccess } = useAsyncCall(addTag);
  const router = useRouter();
  const navigateToFeed = () => router.push(GOALS_ROUTES.GOAL_FEED);

  useEffect(() => {
    if (isSuccess) navigateToFeed();
  }, [isSuccess]);

  useEffect(() => {
    if (user?.categories?.length > 0) set(user?.categories);
  }, [user]);

  const handleOnClick = (category: CategoryItem) => {
    if (exists(category.id)) remove(category.id);
    else push(category);
  };
  const handleOnSubmit = async () => {
    if (data.length > 0) await call(user?.id, data);
  };

  const selectedCategories = data.reduce<SelectedCategories>((acc, { id }) => {
    acc[id] = true;
    return acc;
  }, {});

  if (!user) return <div>Loading...</div>;
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
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
        <Button handleOnClick={navigateToFeed}>Set Categories Later</Button>
      </FlexContainer>
    </div>
  );
};

SelectCategories.Layout = LayoutWithoutHeader;

export default SelectCategories;
