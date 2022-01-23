import styles from './Backdrop.module.scss';

interface BackdropProps {
  closeDrawer: () => void;
}

const BackDrop: React.FC<BackdropProps> = ({ closeDrawer }) => (
  <div onClick={closeDrawer} className={styles.backdrop} />
);
export default BackDrop;
