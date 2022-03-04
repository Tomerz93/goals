import type { Step } from 'prisma/prisma-client';

import styles from './Steps.module.scss';

const Steps: React.FC<{ steps: Step[] }> = ({ steps }) => {
  const getIsCurrent = () => {
    const completedSteps = steps.filter((step) => step.isCompleted).length;
    if (!completedSteps) return 0;
    if (completedSteps === steps.length) return completedSteps - 1;
    return completedSteps;
  };
  return (
    <div>
      {steps.map(({ title, id, isCompleted }, index) => (
        <div
          style={index === getIsCurrent() ? { fontWeight: 'bold' } : {}}
          className={`${styles.step} ${isCompleted ? styles.completed : ''}`}
          key={id}
        >
          {title}
        </div>
      ))}
    </div>
  );
};
export default Steps;
