import { Avatar } from '@components/UI';
import { getUserByUsername } from '@lib/firebase';
import type { NextPage } from 'next';
import type { User } from '@lib/modals';

interface Props {
  user: User;
}

const Profile: NextPage<Props> = ({ user }) => {
  return (
    <div>
      <Avatar round size="m" src={user?.avatarUrl} />
      <h4>{user?.username}</h4>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { username } = query ?? '';
  try {
    const user = await getUserByUsername(username);
    if (user) {
      return {
        props: {
          user,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        initialData: {},
      },
    };
  }
}

export default Profile;
