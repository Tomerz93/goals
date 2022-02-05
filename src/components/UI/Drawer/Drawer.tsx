import React from 'react';
import cx from 'classnames';
import { Avatar, NavigationLinks, ThemeToggler } from '@components/UI';
import FlexContainer from '../FlexContainer/FlexContainer';
import styles from './Drawer.module.scss';
import BackDrop from '../Backdrop/Backdrop';
import { useSession } from 'next-auth/react';

interface AvatarUserCardProps {
  username: string;
  email: string;
  avatarUrl: string;
}

const AvatarUserCard: React.FC<AvatarUserCardProps> = ({
  username,
  email,
  avatarUrl,
}) => (
  <FlexContainer className={styles.avatarUserCard}>
    <Avatar src={avatarUrl} round />
    <FlexContainer alignItems="center" gap="6">
      <div>
        <span style={{ display: 'block' }}>{username}</span>
        <span>{email}</span>
      </div>
      <ThemeToggler />
    </FlexContainer>
  </FlexContainer>
);

interface DrawerProps {
  isVisible: boolean;
  toggle: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isVisible, toggle }) => {
  const { data } = useSession();
  console.log(data);
  const { user = null } = data ?? {};
  if (!user) return null;

  const drawerClasses = cx({
    [styles.drawerContainer]: true,
    [styles.visible]: isVisible,
  });
  const toggleDrawer = () => (isVisible ? toggle() : null);
  console.log(isVisible);
  return (
    <>
      {isVisible && <BackDrop closeDrawer={toggle} />}
      <div className={drawerClasses}>
        <AvatarUserCard {...user} />
        <NavigationLinks showIcons toggle={toggleDrawer} />
      </div>
    </>
  );
};
export default Drawer;
