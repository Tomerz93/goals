import cx from 'classnames';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  justifyContent?: 'start' | 'center' | 'end' | 'between';
  alignItems?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  direction?: 'row' | 'column';
}

const FlexContainer: React.FC<HeadingProps> = ({
  children,
  justifyContent = 'center',
  alignItems = 'center',
  direction = 'row',
}) => {
  const containerStyles = cx({
    flex: true,
    'justify-center': justifyContent === 'center',
    'space-between': justifyContent === 'between',
    'align-center': alignItems === 'center',
    colum: direction === 'column',
  });
  return <div className={containerStyles}>{children}</div>;
};

export default FlexContainer;
