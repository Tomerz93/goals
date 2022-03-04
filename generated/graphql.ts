import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  category?: Maybe<Scalars['String']>;
  goal?: Maybe<Goal>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  value?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  content?: Maybe<Scalars['String']>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type Goal = {
  __typename?: 'Goal';
  categories?: Maybe<Array<Maybe<Category>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  description?: Maybe<Scalars['String']>;
  estimatedCompletionDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  steps?: Maybe<Array<Maybe<Step>>>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  createGoal: Goal;
  createUsername: User;
  removeComment?: Maybe<Comment>;
  removeGoal: Goal;
  updateComment?: Maybe<Comment>;
};


export type MutationAddCommentArgs = {
  content: Scalars['String'];
  goalId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateGoalArgs = {
  categories: Array<InputMaybe<CreateCategoryInput>>;
  description: Scalars['String'];
  estimatedCompletionDate: Scalars['String'];
  steps: Array<InputMaybe<CreateStepInput>>;
  title: Scalars['String'];
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['String'];
};


export type MutationRemoveGoalArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allGoals: Array<Maybe<Goal>>;
  categories: Array<Maybe<Category>>;
  comments: Array<Maybe<Comment>>;
  goal?: Maybe<Goal>;
  goals: Array<Maybe<Goal>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryGoalArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type Step = {
  __typename?: 'Step';
  description?: Maybe<Scalars['String']>;
  goal?: Maybe<Goal>;
  goalId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  goals?: Maybe<Array<Maybe<Goal>>>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type CreateCategoryInput = {
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type CreateStepInput = {
  description?: InputMaybe<Scalars['String']>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type CreateUsernameMutation = { __typename?: 'Mutation', createUsername: { __typename?: 'User', id?: string | null | undefined, username?: string | null | undefined } };

export type AddCommentMutationVariables = Exact<{
  content: Scalars['String'];
  goalId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename?: 'Comment', content?: string | null | undefined, id?: string | null | undefined } };

export type RemoveCommentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveCommentMutation = { __typename?: 'Mutation', removeComment?: { __typename?: 'Comment', id?: string | null | undefined } | null | undefined };

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['String'];
  content: Scalars['String'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'Comment', id?: string | null | undefined, content?: string | null | undefined } | null | undefined };

export type CreateGoalMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  estimatedCompletionDate: Scalars['String'];
  steps: Array<InputMaybe<CreateStepInput>> | InputMaybe<CreateStepInput>;
  categories: Array<InputMaybe<CreateCategoryInput>> | InputMaybe<CreateCategoryInput>;
}>;


export type CreateGoalMutation = { __typename?: 'Mutation', createGoal: { __typename?: 'Goal', id?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, estimatedCompletionDate?: string | null | undefined } };

export type RemoveGoalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveGoalMutation = { __typename?: 'Mutation', removeGoal: { __typename?: 'Goal', id?: string | null | undefined } };

export type GetAllGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGoalsQuery = { __typename?: 'Query', allGoals: Array<{ __typename?: 'Goal', id?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, user?: { __typename?: 'User', username?: string | null | undefined, image?: string | null | undefined } | null | undefined, comments?: Array<{ __typename?: 'Comment', id?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined> };

export type GoalListQueryVariables = Exact<{ [key: string]: never; }>;


export type GoalListQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'Goal', id?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, isCompleted?: boolean | null | undefined } | null | undefined> };

export type GetGoalQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetGoalQuery = { __typename?: 'Query', goal?: { __typename?: 'Goal', title?: string | null | undefined, id?: string | null | undefined, estimatedCompletionDate?: string | null | undefined, description?: string | null | undefined, user?: { __typename?: 'User', id?: string | null | undefined, username?: string | null | undefined, image?: string | null | undefined } | null | undefined, comments?: Array<{ __typename?: 'Comment', id?: string | null | undefined, content?: string | null | undefined, user?: { __typename?: 'User', id?: string | null | undefined, username?: string | null | undefined, image?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, steps?: Array<{ __typename?: 'Step', isCompleted?: boolean | null | undefined, title?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined, categories?: Array<{ __typename?: 'Category', title?: string | null | undefined, value?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: string | null | undefined, username?: string | null | undefined, image?: string | null | undefined, goals?: Array<{ __typename?: 'Goal', id?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, isCompleted?: boolean | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id?: string | null | undefined, title?: string | null | undefined, category?: string | null | undefined, value?: string | null | undefined } | null | undefined> };


export const CreateUsernameDocument = gql`
    mutation createUsername($username: String!) {
  createUsername(username: $username) {
    id
    username
  }
}
    `;
export const AddCommentDocument = gql`
    mutation addComment($content: String!, $goalId: String!, $userId: String!) {
  addComment(content: $content, goalId: $goalId, userId: $userId) {
    content
    id
  }
}
    `;
export const RemoveCommentDocument = gql`
    mutation removeComment($id: String!) {
  removeComment(id: $id) {
    id
  }
}
    `;
export const UpdateCommentDocument = gql`
    mutation updateComment($id: String!, $content: String!) {
  updateComment(id: $id, content: $content) {
    id
    content
  }
}
    `;
export const CreateGoalDocument = gql`
    mutation createGoal($title: String!, $description: String!, $estimatedCompletionDate: String!, $steps: [createStepInput]!, $categories: [createCategoryInput]!) {
  createGoal(
    title: $title
    description: $description
    estimatedCompletionDate: $estimatedCompletionDate
    steps: $steps
    categories: $categories
  ) {
    id
    title
    description
    estimatedCompletionDate
  }
}
    `;
export const RemoveGoalDocument = gql`
    mutation removeGoal($id: String!) {
  removeGoal(id: $id) {
    id
  }
}
    `;
export const GetAllGoalsDocument = gql`
    query getAllGoals {
  allGoals {
    id
    title
    description
    user {
      username
      image
    }
    comments {
      id
    }
  }
}
    `;
export const GoalListDocument = gql`
    query goalList {
  goals {
    id
    title
    description
    isCompleted
  }
}
    `;
export const GetGoalDocument = gql`
    query getGoal($id: String!) {
  goal(id: $id) {
    title
    id
    estimatedCompletionDate
    description
    user {
      id
      username
      image
    }
    comments {
      id
      content
      user {
        id
        username
        image
      }
    }
    steps {
      isCompleted
      title
      description
    }
    categories {
      title
      value
    }
  }
}
    `;
export const GetUserDocument = gql`
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
    `;
export const GetCategoriesDocument = gql`
    query getCategories {
  categories {
    id
    title
    category
    value
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createUsername(variables: CreateUsernameMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUsernameMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUsernameMutation>(CreateUsernameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUsername');
    },
    addComment(variables: AddCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddCommentMutation>(AddCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addComment');
    },
    removeComment(variables: RemoveCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemoveCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveCommentMutation>(RemoveCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeComment');
    },
    updateComment(variables: UpdateCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCommentMutation>(UpdateCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateComment');
    },
    createGoal(variables: CreateGoalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateGoalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateGoalMutation>(CreateGoalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createGoal');
    },
    removeGoal(variables: RemoveGoalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemoveGoalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveGoalMutation>(RemoveGoalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeGoal');
    },
    getAllGoals(variables?: GetAllGoalsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllGoalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllGoalsQuery>(GetAllGoalsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllGoals');
    },
    goalList(variables?: GoalListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GoalListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GoalListQuery>(GoalListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'goalList');
    },
    getGoal(variables: GetGoalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGoalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGoalQuery>(GetGoalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getGoal');
    },
    getUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser');
    },
    getCategories(variables?: GetCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;