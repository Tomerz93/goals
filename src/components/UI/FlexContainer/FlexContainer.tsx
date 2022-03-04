import cx from 'classnames';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  justifyContent?: 'start' | 'center' | 'end' | 'between';
  alignItems?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  direction?: 'row' | 'column';
  gap?: string;
  styles?: React.CSSProperties;
}

const FlexContainer: React.FC<HeadingProps> = ({
  children,
  justifyContent,
  alignItems,
  className,
  direction = 'row',
  gap = '1',
  styles,
}) => {
  const containerStyles = cx({
    flex: true,
    [`${className}`]: className,
    'justify-center': justifyContent === 'center',
    'justify-end': justifyContent === 'end',
    'space-between': justifyContent === 'between',
    'align-center': alignItems === 'center',
    column: direction === 'column',
  });
  return (
    <div
      style={{ gap: `var(--spacing-${gap})`, ...styles }}
      className={containerStyles}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
