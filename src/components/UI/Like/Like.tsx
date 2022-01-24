import { useUserContext } from '@lib/context/user';
import { useArray } from '@lib/hooks';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FlexContainer } from '..';

interface LikeProps {
  likes: string[];
  unLike: () => void;
  like: () => void;
  userId: string;
}

const Like: React.FC<LikeProps> = ({ likes, unLike, like, userId }) => (
  <FlexContainer alignItems="center">
    <span>{likes.length}</span>
    {likes.includes(userId) ? (
      <FcLike onClick={unLike} />
    ) : (
      <FcLikePlaceholder onClick={like} />
    )}
  </FlexContainer>
);

export default Like;
