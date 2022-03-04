import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputError, Input } from '@components/UI/Input';
import { Badge, Button } from '@components/UI';
import type { CategoryItem, Goal } from '@lib/modals';
import { useArray } from '@lib/hooks';
import styles from './StepOne.module.scss';
import { StepNavigator } from '.';
import { useFormContext } from '@lib/context/form';
import { getIsMinLength } from '@utils/index';
import { useQuery } from 'react-query';
import { client } from '@lib/client';

interface StepOneProps {
  defaultValues?: Partial<Goal>;
}

const StepOne: React.FC<StepOneProps> = ({ defaultValues }) => {
  const {
    data: selectedCategories,
    push,
    removeById,
    exists,
    set: setSelectedCategories,
  } = useArray<CategoryItem>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const {
    register,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });
  // handle repopulate form fields and creation of step elements

  const { onNextStep: goToNextStep, currentStepData } = useFormContext();
  useQuery('allGoals', () => client.getCategories(), {
    onSuccess: ({ categories = [] }) => {
      setCategories(categories);
    },
  });
  useEffect(() => {
    if (currentStepData || defaultValues) {
      const { title, description, categories, estimatedCompletionDate } =
        currentStepData || defaultValues;
      setValue('title', title, { shouldValidate: true });
      setValue('completion_date', estimatedCompletionDate, {
        shouldValidate: true,
      });
      setValue('description', description, { shouldValidate: true });
      setSelectedCategories(categories);
    }
  }, [currentStepData]);

  const CategorySelectItem: React.FC<{
    category: CategoryItem;
    handleOnAddCategory: (category: CategoryItem) => void;
  }> = ({ category, handleOnAddCategory }) => {
    const { title } = category;
    return (
      <Button
        variant="styleless"
        handleOnClick={() => handleOnAddCategory?.(category)}
      >
        <p>{title}</p>
      </Button>
    );
  };
  const handleOnAddCategory = (category: CategoryItem) => {
    if (exists(category.id)) removeById(category.id);
    else push(category);
  };
  const filteredCategories = useMemo(
    () =>
      categories.filter(({ title }) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, categories]
  );
  return (
    <div>
      <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
        <div>
          <Input
            register={register}
            required
            validation={{
              required: 'Please insert a title',
              getIsMinLength: getIsMinLength(3),
            }}
            name="title"
            type="text"
            mode="uncontrolled"
            error={errors?.title}
          />
          <InputError message={errors.title?.message} />
        </div>
        <div>
          <Input
            register={register}
            validation={{
              required: 'Please insert a Description',
              getIsMinLength: getIsMinLength(3),
            }}
            name="description"
            type="textarea"
            mode="uncontrolled"
            error={errors?.description}
            explanation="This will be be the title posted on the feed"
          />
          <InputError message={errors.description?.message} />
        </div>
        <Input
          register={register}
          name="completion_date"
          labelText="Estimated Completion Date"
          type="date"
          mode="uncontrolled"
          explanation="Try to choose a realistic end date"
        />
        <Input
          name="categories"
          type="text"
          mode="controlled"
          placeholder="Search for a category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.categoryListContainer}>
          {filteredCategories.map((category) => (
            <CategorySelectItem
              key={category.id}
              category={category}
              handleOnAddCategory={handleOnAddCategory}
            />
          ))}
        </div>
        {selectedCategories?.length > 0 && (
          <div>
            {selectedCategories.map(({ title }) => (
              <Badge variant="success" key={title}>
                {title}
              </Badge>
            ))}
          </div>
        )}
        <StepNavigator
          disabled={!isValid || !selectedCategories?.length}
          stepAmount={2}
          onNextStep={() => {
            goToNextStep({ ...getValues(), categories: selectedCategories });
          }}
        />
      </div>
    </div>
  );
};

export default StepOne;
