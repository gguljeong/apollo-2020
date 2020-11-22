import React from 'react';
import {useQuery, gql} from '@apollo/client';
import Movie from './../components/Movie';

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

export default () => {
  const {loading, data} = useQuery(GET_MOVIES);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {data?.movies.map(m => (
        <Movie key={m.id} id={m.id} isLiked={m.isLiked} poster={m.medium_cover_image} />
      ))}
    </div>
  );
};
