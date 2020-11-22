import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';
import Movie from './../components/Movie';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      rating
      medium_cover_image
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const {id} = useParams();
  const {loading, data} = useQuery(GET_MOVIE, {variables: {id: +id}});
  console.log(data);

  if (loading) {
    return <h1>loading...</h1>;
  }
  if (data?.movie) {
    return (
      <div>
        <img src={data.movie.medium_cover_image} />
        <h1>
          {data.movie.title} {data.movie.isLiked ? '😍' : '😕'}
        </h1>
        <div>{data.movie.rating}</div>
        <div>{data.movie.description_intro}</div>
        {data?.suggestions.map(m => (
          <Movie key={m.id} id={m.id} poster={m.medium_cover_image} />
        ))}
      </div>
    );
  }
};
