import { GoalCard } from '@components/Goals';
import { Button, Input, Comment } from '@components/UI';
import GenericList from '@components/UI/GenericList/GenericList';
import { useUserContext } from '@lib/context/user';
import {
  getGoalWithUserAndComments,
  addComment,
  removeComment,
  editComment,
} from '@lib/firebase';
import { useArray } from '@lib/hooks';
import { useState, useRef } from 'react';

const Comments: React.FC = ({ initialData }) => {
  const { user: currentUser } = useUserContext();
  const { goal, comments: initialComments, user } = initialData ?? {};
  const {
    data: comments,
    push,
    removeById,
    replace,
  } = useArray(initialComments ?? []);
  const [comment, setComment] = useState('');
  const inputRef = useRef(null);
  const handleOnAddComments = async () => {
    if (!comment) return;
    const newCommentId = await addComment(goal.id, {
      content: comment,
      userId: currentUser?.id,
    });
    push({ content: comment, user: currentUser, id: newCommentId });
    setComment('');
  };

  const handleOnRemoveComment = async (commentId: string) => {
    await removeComment(goal?.id, commentId);
    removeById(commentId);
  };

  const handleOnEdit = async (commentId: string, content: string) => {
    console.log(commentId, content);
    const comment = comments.find((comment) => comment.id === commentId);
    const { userId, id } = comment;
    await editComment(goal?.id, commentId, { id, userId, content });
    replace(commentId, { ...comment, content });
  };

  return (
    <>
      {initialData && (
        <div>
          <GoalCard
            goal={{
              ...goal,
              user,
              commentsCount: comments?.length > 0 ? comments.length : 0,
            }}
          />
          <div className="mb-4" />
          <Input
            labelText="enter your comment here"
            mode="controlled"
            name="comment"
            type="textarea"
            rowNum={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginInlineStart: 'auto' }}
            variant="minimal"
            handleOnClick={handleOnAddComments}
          >
            Submit
          </Button>
          {comments?.length > 0 && (
            <GenericList
              component={Comment}
              resourceName="comment"
              items={comments}
              otherProps={{
                currentUserId: currentUser?.id,
                handleOnEdit,
                handleOnRemoveComment,
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { id } = query ?? '';
  try {
    const { user, goal, comments } = await getGoalWithUserAndComments(id);
    const { estimatedCompletionDate, ...rest } = goal;
    console.log({ user, goal, comments });
    return {
      props: {
        initialData: {
          goal: {
            ...rest,
          },
          user,
          comments,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        initialData: {},
      },
    };
  }
}

export default Comments;
