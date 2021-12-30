import cx from 'classnames';

interface HeadingProps {
  Element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ Element, children }) => (
  <Element>{children}</Element>
);

export default Heading;
