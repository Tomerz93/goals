import { capitalize } from '@lib/utils/helpers';
import { Button } from '..';
import styles from './Category.module.scss';
import type { CategoryItem } from '@lib/modals';
import { Fragment } from 'react';

interface CategoryItemProps {
  category: CategoryItem;
  isSelected: boolean;
  onClick: (category: CategoryItem) => void;
}

const CategoryListItem: React.FC<CategoryItemProps> = ({
  category,
  onClick,
  isSelected,
}) => {
  return (
    <Button
      handleOnClick={() => {
        onClick(category);
      }}
      isSelected={isSelected}
      variant="gradient"
    >
      {category.title}
    </Button>
  );
};

const CategoryList = ({
  items,
  onClick,
  selectedCategories = {},
}: {
  items: CategoryItem[];
  selectedCategories: {
    [key: string]: boolean;
  };
  onClick: (category: CategoryItem) => void;
}) => (
  <div className={styles.CategoriesContainer}>
    {items.map((item) => (
      <CategoryListItem
        isSelected={!!selectedCategories[item.id]}
        onClick={onClick}
        key={item.id}
        category={item}
      />
    ))}
  </div>
);

interface CategoryGridProps {
  categories: {
    [key: string]: CategoryItem[];
  };
  selectedCategories: {
    [key: string]: boolean;
  };
  onClick: (category: CategoryItem) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategories,
  onClick,
}) => (
  <>
    {Object.entries(categories).map(([key, items]) => (
      <Fragment key={key}>
        <h5>{capitalize(key)}</h5>
        <CategoryList
          selectedCategories={selectedCategories}
          onClick={onClick}
          items={items}
        />
      </Fragment>
    ))}
  </>
);

export default CategoryGrid;
