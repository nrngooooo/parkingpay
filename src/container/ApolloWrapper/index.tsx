"use client";
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";
import { useMemo } from "react";
import crossFetch from "cross-fetch";

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACK_END_URL + 'graphql/',
    fetch: crossFetch,
    credentials: "same-origin",
    fetchOptions: { method: "GET" },
    headers: {
      "Content-Type": "application/graphql",
    },
    
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const client = useMemo(() => makeClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
