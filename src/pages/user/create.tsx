import React, { useState, useEffect, SyntheticEvent } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { createUser, getDocById } from '@lib/firebase';
import { useWithAuthContext } from '@lib/context/auth';
import { GOALS_ROUTES, USER_ROUTES } from '@lib/routes';
import { Input, Button, LayoutWithoutHeader } from '@components/UI';
import { useUserContext } from '@lib/context/user';

const Spacer: React.FC = () => <div style={{ marginTop: '3rem' }}></div>;

const Spinner = () => <div>Loading...</div>;

const UserNameForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [isUserExists, setIsUserExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useWithAuthContext();

  const router = useRouter();
  const handleOnChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setUsername(value);
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (isValidUsername(username)) return;
    setLoading(true);

    const exitingUsername = await getDocById('usernames', username);

    if (!exitingUsername) {
      const {
        email = '',
        uid = '',
        photoURL = '',
      } = user ?? { email: '', uid: '', photoURL: '' };
      await createUser({ email, uid, photoURL }, username);
      router.push(GOALS_ROUTES.GOAL_FEED);
      setLoading(false);
    } else {
      setIsUserExists(true);
      setLoading(false);
    }
  };

  const error = isValidUsername(username);
  const isDisabled = !username.trim() || isValidUsername(username) || loading;
  return (
    <div>
      <h4>
        Please choose a username, the provided username will become be used for
        your profile
      </h4>
      <small style={{ color: '#F5F5F5' }}>
        Do not worry even if you choose a profile you can still set your profile
        to anonymous if you were to so choose from system preferences
      </small>
      <Input
        error={isValidUsername(username)}
        name="username"
        type="text"
        value={username}
        onChange={handleOnChange}
      />
      {error && <p>Username must be at least 2 characters long</p>}
      {isUserExists && <p>Username already exists</p>}
      <Spacer />
      <Button handleOnClick={handleOnSubmit} disabled={isDisabled}>
        {loading ? 'Fetching...' : 'Submit'}
      </Button>
    </div>
  );
};

const isValidUsername = (username: string) => {
  if (!username) return false;
  return username.length < 2;
};

const CreateUsername: NextPage = () => {
  const { user: authUser } = useWithAuthContext();
  const { user } = useUserContext();
  const { username = '' } = user ?? { username: '' };
  const router = useRouter();

  useEffect(() => {
    if (user && user?.categories?.length > 0)
      router.push(GOALS_ROUTES.GOAL_FEED);
    if (user && !user?.categories?.length)
      router.push(USER_ROUTES.USER_CATEGORIES);
  }, [username, authUser]);
  return authUser && !username ? <UserNameForm /> : <Spinner />;
};

CreateUsername.Layout = LayoutWithoutHeader;

export default CreateUsername;
