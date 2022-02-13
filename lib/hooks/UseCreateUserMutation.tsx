import { useMutation } from 'react-query';
import axios from 'axios';

const setUsername = (username: string) =>
  axios.post('/api/user/username', { username });

export const UseCreateUserMutation = () => useMutation(setUsername);
