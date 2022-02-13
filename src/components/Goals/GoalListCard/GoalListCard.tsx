import { FlexContainer } from '@components/UI';
import { useRouter } from 'next/router';
import { Goal } from 'prisma/prisma-client';
import styles from './GoalListCard.module.scss';

interface GoalListCardProps {
  goal: Goal;
}

interface CircleProps {
  isCompleted: boolean;
}
const Circle: React.FC<CircleProps> = ({ isCompleted }) => (
  <div
    style={{
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      backgroundColor: `${isCompleted ? 'var(--success)' : 'var(--danger)'}`,
    }}
  />
);

const GoalListCard: React.FC<GoalListCardProps> = ({
  goal: { title, isCompleted, id },
}) => {
  const router = useRouter();
  return (
    <div
      aria-label="button"
      onClick={() => {
        router.push(`/goals/${id}`);
      }}
    >
      <FlexContainer alignItems="center" gap="2">
        <Circle isCompleted={isCompleted} />
        <div className={styles.goalListCardContainer}>
          <p>{title}</p>
        </div>
      </FlexContainer>
    </div>
  );
};
export default GoalListCard;
