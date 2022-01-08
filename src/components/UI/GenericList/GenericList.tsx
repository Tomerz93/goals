import { getUniqueId } from '@lib/utils/helpers';

interface GenericListProps {
  items: unknown[];
  component: any;
  resourceName: string;
  el?: 'ul' | 'div';
  type?: 'grid' | 'list';
  gap: number;
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
  resourceName,
  el: Element = 'div',
  type = 'grid',
  gap,
}) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={getUniqueId()}
          style={{ marginBottom: `var(--spacing-${gap})` }}
        >
          <Component {...{ [resourceName]: item }} />
        </div>
      ))}
    </>
  );
};

export default GenericList;
