import gql from "graphql-tag";
export const createUsername = gql`
    mutation createUsername($username: String!) {
    createUsername(username: $username) {
        id
        username
        }
    }
        
`;

export const addComment = gql`
    mutation addComment($content: String!, $goalId: String!, $userId: String!) {
    addComment(content: $content, goalId: $goalId, userId: $userId) {
        content
        id
        }
    }   
`;

export const removeComment = gql`
    mutation removeComment($id: String!) {
    removeComment(id: $id) {
        id
        }
    }
`;

export const updateComment = gql`
    mutation updateComment($id: String!, $content: String!) {
    updateComment(id: $id, content: $content) {
        id
        content
        }
    }
    `;