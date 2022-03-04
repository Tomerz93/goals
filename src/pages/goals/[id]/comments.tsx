import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery, useMutation } from 'react-query';
import { GoalCard } from '@components/Goals';
import { Button, Input, GenericList, Comment } from '@components/UI';
import { useArray } from '@lib/hooks';
import { client } from '@lib/client';
import { useSession } from 'next-auth/react';

const Comments: React.FC = (props) => {
  const { data } = useSession();
  console.log(data);
  const router = useRouter();
  const { id } = router.query;

  const { username = '', user, userId } = data ?? {};

  const { mutate: addComment } = useMutation(
    ({
      content,
      userId,
      goalId,
    }: {
      content: string;
      userId: string;
      goalId: string;
    }) => client.addComment({ goalId, userId, content }),
    {
      onSuccess: ({ addComment: { content, id } }) => {
        setComment('');
        const comment = {
          content,
          id,
          user: {
            ...user,
            username: username,
          },
        };
        push(comment);
      },
    }
  );
  const { mutate: removeComment } = useMutation(
    ({ id }: { id: string }) => client.removeComment({ id }),
    {
      onSuccess: ({ removeComment: { id } }) => {
        removeById(id);
      },
    }
  );
  const { mutate: updateComment } = useMutation(
    ({ id, content }: { id: string; content: string }) =>
      client.updateComment({
        id,
        content,
      }),
    {
      onSuccess: ({ updateComment: { id, content } }) =>
        replace(id, {
          content,
          id,
          user: {
            ...user,
            username,
          },
        }),
    }
  );
  const { data: { goal } = {} } = useQuery('initialComments', () =>
    client.getGoal({ id })
  );

  const {
    data: comments,
    push,
    removeById,
    replace,
    set,
  } = useArray(goal?.comments ?? []);
  useEffect(() => {
    if (goal) {
      set(goal.comments);
    }
  }, [goal]);
  const [comment, setComment] = useState('');
  const { user: goalOwner } = goal ?? {};
  const handleOnAddComments = async () => {
    if (!comment) return;
    if (!goal?.id) return;
    addComment({
      goalId: goal.id,
      userId,
      content: comment,
    });
    setComment('');
  };

  const handleOnRemoveComment = (commentId: string) =>
    removeComment({ id: commentId });

  const handleOnEdit = (commentId: string, content: string) =>
    updateComment({ id: commentId, content });

  const memoizedHandleOnRemoveComment = useCallback(handleOnRemoveComment, []);

  const memoizedHandleOnEditComment = useCallback(handleOnEdit, [comments]);

  return (
    <>
      {goal && (
        <div>
          <GoalCard
            goal={{
              ...goal,
              user: goalOwner,
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
          {comments?.length > 0 &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                currentUserId={userId}
                handleOnEdit={memoizedHandleOnEditComment}
                handleOnRemoveComment={memoizedHandleOnRemoveComment}
              />
            ))}
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();
  const { id = '' } = query ?? {};
  try {
    await queryClient.prefetchQuery('initialComments', () =>
      client.getGoal({ id })
    );
    return {
      props: {
        initialData: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      props: {
        initialData: {},
      },
    };
  }
};

export default Comments;
