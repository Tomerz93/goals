import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import { useUserContext } from '@lib/context/user';
import { useRouter } from 'next/router';
import { Avatar, NavigationLinks, ThemeToggler } from '@components/UI';
import FlexContainer from '../FlexContainer/FlexContainer';
import styles from './Drawer.module.scss';

const BackDrop: React.FC<{ closeDrawer: () => void }> = ({ closeDrawer }) => (
  <div onClick={closeDrawer} className={styles.backdrop} />
);

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
  const { user } = useUserContext();
  if (!user) return null;

  const drawerClasses = cx({
    [styles.drawerContainer]: true,
    [styles.visible]: isVisible,
  });
  const toggleDrawer = () => (isVisible ? toggle() : null);
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
