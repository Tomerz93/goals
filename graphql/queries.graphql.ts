import gql from "graphql-tag";
export const AllUsersQuery = gql`
  query allGoals {
    goals {
      title
      description
      user{
        username
        image
      }
    }
  }
`;
