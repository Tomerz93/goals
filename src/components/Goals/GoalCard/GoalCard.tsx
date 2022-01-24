import React from 'react';
import { Avatar, Button, FlexContainer } from '@components/UI';
import { GoComment } from 'react-icons/go';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { BiUserPlus } from 'react-icons/bi';
import styles from './GoalCard.module.scss';
import Link from 'next/link';
import { useUserContext } from '@lib/context/user';
import Like from '@components/UI/Like/Like';
import { updateGoalLikes } from '@lib/firebase';
import { useArray } from '@lib/hooks';

export interface UserSmall {
  id: string;
  username: string;
  avatarUrl: string;
}

interface Goal {
  userId: string;
  title: string;
  id: string;
  avatar: UserSmall;
  description: string;
  likes: string[];
  commentsCount: number;
}
export type GoalWithUserSmall = Goal & { user: UserSmall };

interface GoalCardProps {
  goal: GoalWithUserSmall;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal: { description, user, commentsCount, id, likes },
}) => {
  const { user: loggedUser } = useUserContext();
  const { data: goalLikes, push, remove } = useArray(likes ?? []);

  const like = async () => {
    if (loggedUser) {
      push(loggedUser.id);
      updateGoalLikes(id, likes);
    }
  };
  const unLike = async () => {
    if (loggedUser) {
      const index = goalLikes.indexOf(loggedUser.id);
      remove(index);
      updateGoalLikes(id, goalLikes);
    }
  };

  return (
    <div className={styles.GoalCardContainer}>
      <FlexContainer gap="4">
        <Avatar src={user?.avatarUrl} round />
        <FlexContainer direction="column">
          <h5>{user?.username}</h5>
          <Button style={{ alignSelf: 'flex-start' }}>
            Follow
            <BiUserPlus />
          </Button>
        </FlexContainer>
      </FlexContainer>
      <p>{description}</p>
      <FlexContainer alignItems="center" gap="3" justifyContent="end">
        <FlexContainer alignItems="center">
          <span>{commentsCount}</span>
          <Link href={`goals/${id}/comments`}>
            <GoComment />
          </Link>
        </FlexContainer>
        <Like
          likes={goalLikes}
          like={like}
          unLike={unLike}
          userId={loggedUser!.id}
        />
      </FlexContainer>
    </div>
  );
};

export default GoalCard;
