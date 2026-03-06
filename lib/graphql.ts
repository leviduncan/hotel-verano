// lib/graphql.ts
import { GraphQLClient } from 'graphql-request'


if (!process.env.NEXT_PUBLIC_WP_GRAPHQL_URL) {
  throw new Error('NEXT_PUBLIC_WP_GRAPHQL_URL is not defined')
}


export const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL
)

