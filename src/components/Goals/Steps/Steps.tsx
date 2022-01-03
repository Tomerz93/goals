import { Step } from '@lib/modals';
import styles from './Steps.module.scss';

const Steps: React.FC<{ steps: Step[] }> = ({ steps }) => {
  const getIsCurrent = () => {
    const completedSteps = steps.filter((step) => step.completed).length;
    if (!completedSteps) return 0;
    if (completedSteps === steps.length) return completedSteps - 1;
    return completedSteps;
  };
  return (
    <div>
      {steps.map(({ title, id, completed }, index) => (
        <div
          style={index === getIsCurrent() ? { fontWeight: 'bold' } : {}}
          className={`${styles.step} ${completed ? styles.completed : ''}`}
          key={id}
        >
          {title}
        </div>
      ))}
    </div>
  );
};
export default Steps;
