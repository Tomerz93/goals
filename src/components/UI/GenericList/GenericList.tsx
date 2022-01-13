import { getUniqueId } from '@lib/utils/helpers';

interface GenericListProps {
  items: unknown[];
  component: any;
  resourceName: string;
  className?: string;
  el?: 'ul' | 'div';
  type?: 'grid' | 'list';
  gap?: number;
}
interface gapDefinition {
  vertical: { x: number } & { y: number };
  horizontal: { x: number } & { y: number };
  symmetric: number;
  all: { bottom: number } & { right: number } & { top: number } & {
    left: number;
  };
  only:
    | { bottom: number }
    | { right: number }
    | { top: number }
    | { left: number };
}

const GenericList: React.FC<GenericListProps> = ({
  items,
  component: Component,
  className = '',
  resourceName,
  el: Element = 'div',
  type = 'grid',
  otherProps,
  gap,
}) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <div
          key={getUniqueId()}
          style={{ marginBlockEnd: `var(--spacing-${gap})` }}
        >
          <Component {...{ [resourceName]: item }} {...otherProps} />
        </div>
      ))}
    </div>
  );
};

export default GenericList;
