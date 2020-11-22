import React from "react";
import {Link} from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
        toggleLikeMovie(id: $id, isLiked: $isLiked) @client
    }
`;


export default ({id, isLiked, poster}) => {
    const [toggleLikeMovie]=useMutation(LIKE_MOVIE, {variables: {id: parseInt(id), isLiked}})
    
    return (
        <div>
            <Link to={`/${id}`}> <img src={poster} /></Link>
            <button onClick={toggleLikeMovie}>{isLiked ? `Unlike`: `Like`}</button>
        </div>
)};