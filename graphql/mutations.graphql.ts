import gql from "graphql-tag";
export const createUsername = gql`
    mutation createUsername($username: String!) {
    createUsername(username: $username) {
        id
        username
        }
    }
        
`;
