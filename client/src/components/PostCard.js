import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    function likePost() {
        console.log("liked")
    }
    function commentOnPost() {

    }
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                    basic
                    labelPosition="right"
                    onClick={likePost}
                    color="teal"
                    icon='heart'
                    label={{ basic: true, color: 'teal', pointing: 'left', content: likeCount }}
                />
                <Button
                    basic
                    labelPosition="right"
                    onClick={commentOnPost}
                    color="blue"
                    icon="comments"
                    label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
                />
            </Card.Content>
        </Card>
    )
}