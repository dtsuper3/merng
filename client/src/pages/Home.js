import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

export default function Home() {
    const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
    if (data) {
        // console.log(loading, data.getPosts, error);        
    }
    return (
        <Grid columns={3} divided>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ?
                        <h1>Loading Posts...</h1>
                        :
                        data && data.getPosts && data.getPosts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20, boxShadow: "none" }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                }
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    query {        
        getPosts{
            id
            body
            username
            createdAt
            likeCount
            commentCount
            comments {
                body
                username      
                id
            }
            likes{
                username
            }
        }
}
`