const { gql } = require("@apollo/client");

export const FETCH_POSTS_QUERY = gql`
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