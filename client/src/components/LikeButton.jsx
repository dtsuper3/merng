import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

function LikeButton({ post: { id, likeCount, likes }, user }) {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    const likedButton = user ? (
        liked ? <Button basic color="teal" icon="heart" /> : <Button color="teal" icon="heart" />
    ) : <Button
            basic
            color="teal"
            icon="heart"
            as={Link}
            to="/login" />
    return (
        <Button
            as="div"
            labelPosition="right"
            onClick={likePost}
            label={{ basic: true, color: 'teal', pointing: 'left', content: likeCount }}>
            {likedButton}
        </Button>
    )
}

export default LikeButton

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }            
        }
    }
`;