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
import { GOALS_ROUTES } from '@lib/routes';
import { useAsyncCall } from '@lib/hooks/useAsyncCall';
import { NextPageWithLayout } from '@lib/modals/generic';
import { client } from '@lib/client';

const CATEGORY_MAP = {
  lifestyle: [],
  development: [],
};

interface CategoryMap {
  [key: string]: boolean;
}

type SelectedCategories = CategoryMap;

const SelectCategories: NextPageWithLayout = () => {
  const { data, set, push, remove, exists } = useArray<CategoryItem>([]);
  const {
    user,
    isLoading,
    error: userError,
  } = { user: null, isLoading: false, error: null };
  const { call, error, isSuccess } = useAsyncCall(() => {});
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

export async function getServerSideProps(ctx) {
  try {
    const data = await Promise.resolve();

    return {
      props: {
        categories: [],
      },
    };
  } catch (error) {
    return {
      props: {
        categories: [],
      },
    };
  }
}
