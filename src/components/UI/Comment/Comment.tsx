import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEdit, MdRemoveCircle } from 'react-icons/md';
import { Avatar, Backdrop, FlexContainer } from '@components/UI';
import styles from './Comment.module.scss';
import cx from 'classnames';
import { useToggle } from '@lib/hooks';

interface CommentMenu {
  handleOnEdit?: () => void;
  handleOnDelete: () => void;
  closeDrawer: () => void;
  isVisible: Boolean;
}

const CommentMenu: React.FC<CommentMenu> = ({
  handleOnEdit,
  handleOnDelete,
  isVisible,
  closeDrawer,
}) => {
  const drawerClasses = cx({
    [styles.drawerContainer]: true,
    [styles.visible]: isVisible,
  });
  return (
    <>
      {isVisible && <Backdrop closeDrawer={closeDrawer} />}
      <div className={drawerClasses}>
        <FlexContainer>
          <span>Edit</span>
          <MdEdit />
        </FlexContainer>
        <FlexContainer>
          <span onClick={handleOnDelete}>Remove</span>
          <MdRemoveCircle />
        </FlexContainer>
      </div>
    </>
  );
};

const Comment: React.FC = ({
  comment,
  currentUserId,
  handleOnRemoveComment,
}) => {
  const { isVisible, toggle } = useToggle(false);
  return (
    <>
      <CommentMenu
        closeDrawer={toggle}
        isVisible={isVisible}
        handleOnDelete={() => handleOnRemoveComment(comment.id)}
      />
      <FlexContainer className={styles.commentContainer}>
        <FlexContainer>
          <Avatar round src={comment?.user.avatarUrl} />
          <div>
            <h5>{comment?.user.username}</h5>
            <p>{comment?.content}</p>
          </div>
        </FlexContainer>
        {currentUserId === comment?.user.id && (
          <>
            <BsThreeDotsVertical onClick={toggle} />
          </>
        )}
      </FlexContainer>
    </>
  );
};

export default Comment;
