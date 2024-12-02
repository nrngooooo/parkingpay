"use client";
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";
import crossFetch from "cross-fetch";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_BACK_END_URL + "graphql/",
      fetch: crossFetch,
      fetchOptions: { method: "GET" },
      headers: {
        "Content-Type": "application/graphql",
      },
    }),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloProvider client={makeClient()}>
      {children}
    </ApolloProvider>
  );
}
