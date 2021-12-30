import React from 'react';
import type { NextPage } from 'next';
import { useArray } from '@lib/hooks';
import type { CategoryItem } from '@lib/modals';
import { Button, CategoryGrid, LayoutWithoutHeader } from '@components/UI';

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

type SelectedCategories = CategoryMap | {};

const SelectCategories: NextPage = () => {
  const { data, push, remove, exists } = useArray<CategoryItem>([]);
  const handleOnClick = (category: CategoryItem) => {
    if (exists(category.id)) remove(category.id);
    else push(category);
  };

  const selectedCategories = data.reduce<SelectedCategories>((acc, item) => {
    acc[item.id] = true;
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
      <Button>Submit</Button>
    </div>
  );
};

SelectCategories.Layout = LayoutWithoutHeader;

export default SelectCategories;
