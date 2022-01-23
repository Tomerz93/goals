import Link from 'next/link';
import { Button, FlexContainer } from '..';
import styles from './NavigationLinks.module.scss';
import { GOALS_ROUTES, USER_ROUTES } from '@lib/routes';
import { GiStairsGoal } from 'react-icons/gi';
import {
  MdPieChartOutlined,
  MdSettings,
  MdGames,
  MdOutlineLogout,
} from 'react-icons/md';
import { logout } from '@lib/firebase';

const { GOAL_LIST, GOAL_STATS } = GOALS_ROUTES;
const { USER_CATEGORIES, USER_SETTINGS } = USER_ROUTES;

const NavigationLinks: React.FC<{
  showIcons: boolean;
  toggle: () => void;
}> = ({ toggle }) => (
  <FlexContainer
    direction="column"
    className={styles.navigationLinksContainer}
    gap="3"
  >
    <Link href={GOAL_LIST}>
      <div onClick={toggle}>
        <GiStairsGoal />
        My Goals
      </div>
    </Link>
    <Link href={GOAL_STATS}>
      <div onClick={toggle}>
        <MdPieChartOutlined />
        Stats
      </div>
    </Link>
    <Link href={USER_SETTINGS}>
      <div onClick={toggle}>
        <MdSettings />
        Settings
      </div>
    </Link>
    <Link href={USER_CATEGORIES}>
      <div onClick={toggle}>
        <MdGames />
        Categories
      </div>
    </Link>
    <div>
      <Button variant="styleless" handleOnClick={logout}>
        <MdOutlineLogout />
        Logout
      </Button>
    </div>
  </FlexContainer>
);
export default NavigationLinks;
