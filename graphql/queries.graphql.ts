import gql from "graphql-tag";
export const AllUsersQuery = gql`
  query allGoals {
    goals {
      id
      title
      description
      user{
        username
        image
      }
      comments{
        id
      }
    }
  }
`;
export const getGoal = gql`
  query getGoal($id: String!) {
  goal(id: $id) {
    title
    id
    description
    user{
      username
      image
    }
    comments{
      id
      content
      user{
        id
        username
        image
      }
    }
  }
}
`
