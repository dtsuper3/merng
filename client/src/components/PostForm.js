import React from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../utils/hooks'
import { gql, useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

export default function PostForm() {
    const { onSubmit, onChange, values } = useForm(createPostCallback, {
        body: ""
    });
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            const newData = {}
            newData.getPosts = [result.data.createPost, ...data.getPosts];
            console.log(result, newData);
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
            values.body = "";
        },
        errorPolicy: "all"
    });
    function createPostCallback() {
        createPost();
    }
    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        name="body"
                        placeholder="Hi World!"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">Submit</Button>
                </Form.Field>
            </Form>
            {
                error && <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            }
        </>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body:$body){
            id
            body
            createdAt
            likes {
                id
                createdAt
                username
            }
            likeCount
            comments {
              id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;