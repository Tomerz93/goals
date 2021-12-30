import { getUniqueId } from '@lib/utils/helpers';

interface GenericListProps {
  items: unknown[];
  component: any;
  resourceName: string;
  el?: 'ul' | 'div';
  type: 'grid' | 'list';
}

const GenericList: React.FC<GenericListProps> = ({
  items,
  component: Component,
  resourceName,
  el: Element = 'div',
  type = 'grid',
}) => {
  return (
    <Element
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
      }}
    >
      {items.map((item) => (
        <Component key={getUniqueId()} {...{ [resourceName]: item }} />
      ))}
    </Element>
  );
};

export default GenericList;
