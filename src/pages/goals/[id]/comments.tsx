import { getComments } from '@lib/firebase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const comments = () => {
  const { query } = useRouter();
  const { id: goalId } = query;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const comments = await getComments(goalId);
      setComments(comments);
    };
    fetch();
  });
  return <div>{JSON.stringify(comments)}</div>;
};

export default comments;
