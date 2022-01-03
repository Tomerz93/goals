import { FlexContainer } from '@components/UI';
import { Goal } from '@lib/modals';
import styles from './GoalListCard.module.scss';
import { useRouter } from 'next/router';

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
  goal: { title, completed, id },
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
        <Circle isCompleted={completed} />
        <div className={styles.goalListCardContainer}>
          <p>{title}</p>
        </div>
      </FlexContainer>
    </div>
  );
};
export default GoalListCard;
