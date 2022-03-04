import { Avatar } from '@components/UI';
import type { NextPage } from 'next';
import type { User } from '@lib/modals';
import { client } from '@lib/client';

interface Props {
  user: User | null;
}

const Profile: NextPage<Props> = ({ user }) => {
  if (!user) return <div>User not found...</div>;
  return (
    <div>
      <Avatar round size="m" src={user?.image} />
      <h4>{user?.username}</h4>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { username } = query ?? '';
  try {
    const { user } = await client.getUser({ username });
    if (!user) return { props: { user: null } };
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
        user: null,
      },
    };
  }
}

export default Profile;
