import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { GetPost } from '@lib/gql/queries.gql';

const PostDetails = () => {
  const postId = useRouter().query.id;
  const { loading, error, data } = useQuery(GetPost, {
    variables: { postId },
  });

  if (loading) {
    console.log('loading');
    return <div>Loading ...</div>;
  }
  if (error) {
    console.log('error');
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return <div>This is for the post: {postId}</div>;
};

export default PostDetails;
