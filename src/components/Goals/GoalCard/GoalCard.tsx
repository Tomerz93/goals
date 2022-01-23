import React from 'react';
import { Avatar, Button, FlexContainer } from '@components/UI';
import { GoComment } from 'react-icons/go';
import { FcLike } from 'react-icons/fc';
import { BiUserPlus } from 'react-icons/bi';
import styles from './GoalCard.module.scss';
import Link from 'next/link';

interface UserSmall {
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
  likes: number;
  commentsCount: number;
}
type GoalWithUserSmall = Goal & { user: UserSmall };

interface GoalCardProps {
  goal: GoalWithUserSmall;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal: { description, user, commentsCount, id },
}) => (
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
      <FcLike />
    </FlexContainer>
  </div>
);

export default GoalCard;
