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
  category?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  createUsername: User;
  removeComment?: Maybe<Comment>;
  updateComment?: Maybe<Comment>;
};


export type MutationAddCommentArgs = {
  content: Scalars['String'];
  goalId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Maybe<Comment>>;
  goal?: Maybe<Goal>;
  goals: Array<Maybe<Goal>>;
  users: Array<Maybe<User>>;
};


export type QueryGoalArgs = {
  id: Scalars['String'];
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

export type AllGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGoalsQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'Goal', id?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, user?: { __typename?: 'User', username?: string | null | undefined, image?: string | null | undefined } | null | undefined, comments?: Array<{ __typename?: 'Comment', id?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined> };

export type GoalListQueryVariables = Exact<{ [key: string]: never; }>;


export type GoalListQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'Goal', id?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, isCompleted?: boolean | null | undefined } | null | undefined> };

export type GetGoalQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetGoalQuery = { __typename?: 'Query', goal?: { __typename?: 'Goal', title?: string | null | undefined, id?: string | null | undefined, description?: string | null | undefined, user?: { __typename?: 'User', username?: string | null | undefined, image?: string | null | undefined } | null | undefined, comments?: Array<{ __typename?: 'Comment', id?: string | null | undefined, content?: string | null | undefined, user?: { __typename?: 'User', id?: string | null | undefined, username?: string | null | undefined, image?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined };


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
export const AllGoalsDocument = gql`
    query allGoals {
  goals {
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
    description
    user {
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
    allGoals(variables?: AllGoalsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllGoalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllGoalsQuery>(AllGoalsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allGoals');
    },
    goalList(variables?: GoalListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GoalListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GoalListQuery>(GoalListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'goalList');
    },
    getGoal(variables: GetGoalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGoalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGoalQuery>(GetGoalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getGoal');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;