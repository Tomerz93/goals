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
  id?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Goal = {
  __typename?: 'Goal';
  category?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUsername: User;
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Maybe<Comment>>;
  goals: Array<Maybe<Goal>>;
  users: Array<Maybe<User>>;
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

export type AllGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGoalsQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'Goal', title?: string | null | undefined, description?: string | null | undefined, user?: { __typename?: 'User', username?: string | null | undefined, image?: string | null | undefined } | null | undefined } | null | undefined> };


export const CreateUsernameDocument = gql`
    mutation createUsername($username: String!) {
  createUsername(username: $username) {
    id
    username
  }
}
    `;
export const AllGoalsDocument = gql`
    query allGoals {
  goals {
    title
    description
    user {
      username
      image
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
    allGoals(variables?: AllGoalsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllGoalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllGoalsQuery>(AllGoalsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allGoals');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;