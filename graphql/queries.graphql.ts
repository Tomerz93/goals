import gql from "graphql-tag";
export const AllUsersQuery = gql`
  query getAllGoals {
    allGoals {
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
export const getGoalList = gql`
  query goalList {
    goals {
      id
      title
      description
      isCompleted
    }
  }
`;
export const getGoal = gql`
  query getGoal($id: String!) {
  goal(id: $id) {
    title
    id
    estimatedCompletionDate
    description
    user{
      id
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
    steps{
      isCompleted
      title
      description
    }
    categories{
      title
      value
    }
  }
}
`

export const getUser = gql` 
query getUser($username: String!) {
  user(username: $username) {
    id
    username
    image
    goals {
      id
      title
      description
      isCompleted
    }
  }
}
`
export const getCategories = gql`
query getCategories {
 categories
 {
    id
    title
    category
    value
  }
}
`