import { useUserContext } from '@lib/context/user';
import { Avatar, NavigationLinks } from '@components/UI';
import FlexContainer from '../FlexContainer/FlexContainer';
import React, { useEffect, useRef } from 'react';
import styles from './Drawer.module.scss';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { BsSun, BsMoon } from 'react-icons/bs';

const BackDrop: React.FC<{ closeDrawer: () => void }> = ({ closeDrawer }) => (
  <div
    onClick={closeDrawer}
    style={{
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}
  />
);

interface AvatarUserCardProps {
  username: string;
  email: string;
  avatarUrl: string;
}

const ThemeToggler: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const toggle = () =>
    theme === 'light' ? setTheme('dark') : setTheme('light');
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div>
      {theme === 'light' ? (
        <BsMoon onClick={toggle} />
      ) : (
        <BsSun onClick={toggle} />
      )}
    </div>
  );
};

const AvatarUserCard: React.FC<AvatarUserCardProps> = ({
  username,
  email,
  avatarUrl,
}) => (
  <FlexContainer styles={{ zIndex: 2, padding: 'var(--spacing-2)' }}>
    <Avatar src={avatarUrl} round />
    <div>
      <span style={{ display: 'block' }}>{username}</span>
      <span>{email}</span>
      <ThemeToggler />
    </div>
  </FlexContainer>
);

const Drawer: React.FC<{ isVisible: boolean; toggle: () => void }> = ({
  isVisible,
  toggle,
}) => {
  const { user } = useUserContext();
  const router = useRouter();
  const { pathname } = router;
  const currentPath = useRef(pathname);
  useEffect(() => {
    if (currentPath.current !== pathname) {
      if (isVisible) toggle();
      currentPath.current = pathname;
    }
  }, [pathname]);

  if (!user) return null;
  const drawerClasses = cx({
    [styles.drawerContainer]: true,
    [styles.visible]: isVisible,
  });
  return (
    <>
      {isVisible && <BackDrop closeDrawer={toggle} />}
      <div className={drawerClasses}>
        <AvatarUserCard {...user} />
        <NavigationLinks />
      </div>
    </>
  );
};
export default Drawer;