import Link from 'next/link';
import { FlexContainer } from '..';
import styles from './NavigationLinks.module.scss';
import { GOALS_ROUTES, USER_ROUTES } from '@lib/routes';

const { GOAL_LIST, GOAL_STATS } = GOALS_ROUTES;
const { USER_CATEGORIES, USER_SETTINGS } = USER_ROUTES;

const NavigationLinks: React.FC = () => (
  <FlexContainer
    direction="column"
    className={styles.navigationLinksContainer}
    gap="4"
  >
    <Link href={GOAL_LIST}>My Goals</Link>
    <Link href={GOAL_STATS}>Stats</Link>
    <Link href={USER_SETTINGS}>settings</Link>
    <Link href={USER_CATEGORIES}>categories</Link>
  </FlexContainer>
);
export default NavigationLinks;
