import React from 'react';
import { Avatar, Button, FlexContainer } from '@components/UI';
import { GoComment } from 'react-icons/go';
import { FcLike } from 'react-icons/fc';
import { BiUserPlus } from 'react-icons/bi';
import styles from './GoalCard.module.scss';

interface UserSmall {
  id: string;
  username: string;
  avatar: string;
}

interface Goal {
  owner: string;
  id: string;
  avatar: UserSmall;
  description: string;
  likes: number;
  comments: number;
}

interface GoalCardProps {
  goal?: Goal;
}

const GoalCard: React.FC<GoalCardProps> = () => (
  <div className={styles.GoalCardContainer}>
    <FlexContainer gap="4">
      <Avatar round />
      <FlexContainer direction="column">
        <h5>Some really long name</h5>
        <Button style={{ alignSelf: 'flex-start' }}>
          Follow
          <BiUserPlus />
        </Button>
      </FlexContainer>
    </FlexContainer>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum omnis error,
      dolorem nostrum sunt rerum. Quia laboriosam enim facilis atque.
    </p>
    <FlexContainer alignItems="center" gap="3" justifyContent="end">
      <GoComment />
      <FcLike />
    </FlexContainer>
  </div>
);

export default GoalCard;
