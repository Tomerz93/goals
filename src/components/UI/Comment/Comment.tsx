import { useState } from 'react';
import cx from 'classnames';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEdit, MdRemoveCircle, MdArrowBackIosNew } from 'react-icons/md';
import { Avatar, Backdrop, Button, FlexContainer } from '@components/UI';
import { useToggle } from '@lib/hooks';
import { Input } from '../Input';
import styles from './Comment.module.scss';
import { UserSmall } from '@components/Goals/GoalCard/GoalCard';

interface ActionMenuProps {
  increment: () => void;
  handleOnDelete: () => void;
}

interface Comment {
  id: string;
  content?: string;
  userId?: string;
}
interface CommentWithUser {
  user: UserSmall;
  id: string;
  content?: string;
  userId?: string;
}

interface EditCommentProps {
  decrement: () => void;
  handleOnEdit: (currentComment: string) => void;
  commentContent: string;
}

interface CommentMenuProps {
  handleOnEdit: (currentComment: string) => void;
  handleOnDelete: () => void;
  closeDrawer: () => void;
  currentComment: CommentWithUser;
  isVisible: Boolean;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  increment,
  handleOnDelete,
}) => (
  <>
    <FlexContainer className="h-100">
      <Button
        handleOnClick={increment}
        variant="minimal"
        className={styles.iconContainer}
      >
        <span>Edit</span>
        <MdEdit />
      </Button>
    </FlexContainer>
    <FlexContainer className="h-100">
      <Button
        handleOnClick={handleOnDelete}
        variant="minimal"
        className={styles.iconContainer}
      >
        <span>Remove</span>
        <MdRemoveCircle />
      </Button>
    </FlexContainer>
  </>
);

const EditComment: React.FC<EditCommentProps> = ({
  handleOnEdit,
  decrement,
  commentContent,
}) => {
  const [editComment, setEditComment] = useState(commentContent);
  return (
    <>
      <div className="h-100">
        <MdArrowBackIosNew className="flex ml-auto mr-2" onClick={decrement} />
        <Input
          labelText="update your comment here"
          mode="controlled"
          name="comment"
          type="textarea"
          rowNum={2}
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
        />
        <Button
          className="ml-auto"
          handleOnClick={() => {
            handleOnEdit(editComment);
          }}
          variant="minimal"
        >
          Update
        </Button>
      </div>
    </>
  );
};

const CommentMenu: React.FC<CommentMenuProps> = ({
  handleOnEdit,
  handleOnDelete,
  isVisible,
  currentComment,
  closeDrawer,
}) => {
  const drawerClasses = cx({
    [styles.drawerContainer]: true,
    [styles.visible]: isVisible,
  });
  const [currentScreen, setCurrentScreen] = useState(0);
  const increment = () => setCurrentScreen((prev) => prev + 1);
  const decrement = () => setCurrentScreen((prev) => prev - 1);
  return (
    <>
      {isVisible && <Backdrop closeDrawer={closeDrawer} />}
      <div className={drawerClasses}>
        {currentScreen === 0 ? (
          <ActionMenu increment={increment} handleOnDelete={handleOnDelete} />
        ) : (
          <EditComment
            decrement={decrement}
            commentContent={currentComment.content!}
            handleOnEdit={handleOnEdit}
          />
        )}
      </div>
    </>
  );
};

interface CommentProps {
  comment: CommentWithUser;
  currentUserId: string;
  handleOnEdit: (commentId: string, newComment: string) => void;
  handleOnRemoveComment: (commentId: string) => void;
}

// TODO Reactor to use context and add typescript types
const Comment: React.FC<CommentProps> = ({
  comment,
  currentUserId,
  handleOnRemoveComment,
  handleOnEdit,
}) => {
  const { isVisible, toggle } = useToggle(false);
  return (
    <>
      <CommentMenu
        closeDrawer={toggle}
        isVisible={isVisible}
        currentComment={comment}
        handleOnEdit={(newComment: string) => {
          toggle();
          handleOnEdit(comment.id, newComment);
        }}
        handleOnDelete={() => {
          toggle();
          handleOnRemoveComment(comment.id);
        }}
      />
      <FlexContainer className={styles.commentContainer}>
        <FlexContainer>
          <Avatar
            round
            src={comment.user.image}
            username={comment.user.username}
          />
          <div>
            <h5>{comment.user.username}</h5>
            <p>{comment.content}</p>
          </div>
        </FlexContainer>
        {currentUserId === comment.user.id && (
          <BsThreeDotsVertical onClick={toggle} />
        )}
      </FlexContainer>
    </>
  );
};

export default Comment;
