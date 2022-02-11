import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton"

export default function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    const { user } = useContext(AuthContext);
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
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button
                    basic
                    labelPosition="right"
                    as={Link}
                    to={`/posts/${id}`}
                    color="blue"
                    icon="comments"
                    label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
                />
                {
                    user && user.username === username &&
                    <Button
                        basic
                        color="red"
                        onClick={() => { }}
                        icon="trash"
                        floated="right"
                    />
                }
            </Card.Content>
        </Card>
    )
}