import React, { useState, useEffect, SyntheticEvent } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { GOALS_ROUTES, USER_ROUTES } from '@lib/routes';
import { Input, Button, LayoutWithoutHeader } from '@components/UI';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { client } from '../../../lib/client';
import { useMutation } from 'react-query';

const Spacer: React.FC = () => <div style={{ marginTop: '3rem' }}></div>;

const Spinner = () => <div>Loading...</div>;

const isValidUsername = (username: string) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

const UserNameForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [isUserExists, setIsUserExists] = useState(false);
  const router = useRouter();
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation(
    (username: string) => client.createUsername({ username })
  );
  useEffect(() => {
    if (isSuccess) {
      router.push(GOALS_ROUTES.GOAL_FEED);
    }
  }, [isLoading, isSuccess]);

  const handleOnChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setUsername(value);
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // if (isValidUsername(username)) return;
    // TODO handle checking if user exits or not before creating
    // const exitingUsername = await getDocById('usernames', username);
    mutate(username);
  };

  const formError = isValidUsername(username);
  const isDisabled = !isValidUsername(username) || isLoading;
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
        error={!isValidUsername(username)}
        name="username"
        type="text"
        value={username}
        onChange={handleOnChange}
      />
      {/* {formError && <p>Username must be at least 2 characters long</p>} */}
      {isUserExists && <p>Username already exists</p>}
      <Spacer />
      <Button handleOnClick={handleOnSubmit} disabled={isDisabled}>
        {isLoading ? 'Fetching...' : 'Submit'}
      </Button>
    </div>
  );
};

const CreateUsername: NextPage = () => {
  const router = useRouter();
  // useEffect(() => {
  //   if (user && user?.categories?.length > 0)
  //     router.push(GOALS_ROUTES.GOAL_FEED);
  //   if (user && !user?.categories?.length)
  //     router.push(USER_ROUTES.USER_CATEGORIES);
  // }, [username, authUser]);
  return <UserNameForm />;
};

CreateUsername.Layout = LayoutWithoutHeader;
CreateUsername.isProtected = true;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  await prisma.user.findFirst({
    where: { id: session?.userId as string },
    include: { categories: true },
  });

  // const { user = null } = session ?? {};
  // if (user && user.username) {
  //   return {
  //     redirect: {
  //       destination: USER_ROUTES.USER_CREATE,
  //       props: {},
  //     },
  //   };
  // }
  // return {
  //   redirect: {
  //     destination: GOALS_ROUTES.GOAL_FEED,
  //     props: {},
  //   },
  // };
  return {
    props: {},
  };
};

export default CreateUsername;
