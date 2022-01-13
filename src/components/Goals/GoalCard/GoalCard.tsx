import React from 'react';
import { Avatar, Button, FlexContainer } from '@components/UI';
import { GoComment } from 'react-icons/go';
import { FcLike } from 'react-icons/fc';
import { BiUserPlus } from 'react-icons/bi';
import styles from './GoalCard.module.scss';
import { GoalWIthUser } from '@lib/modals/goal';

interface UserSmall {
  id: string;
  username: string;
  avatar: string;
}

interface GoalCardProps {
  goal: GoalWIthUser;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal: { username, description, avatarUrl },
}) => (
  <div className={styles.GoalCardContainer}>
    <FlexContainer gap="4">
      <Avatar round src={avatarUrl} />
      <FlexContainer direction="column">
        <h5>{username}</h5>
        <Button style={{ alignSelf: 'flex-start' }}>
          Follow
          <BiUserPlus />
        </Button>
      </FlexContainer>
    </FlexContainer>
    <p>{description}</p>
    <FlexContainer alignItems="center" gap="3" justifyContent="end">
      <GoComment />
      <FcLike />
    </FlexContainer>
  </div>
);

export default GoalCard;
