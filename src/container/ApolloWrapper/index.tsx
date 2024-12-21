import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import crossFetch from "cross-fetch";

const csrfToken =
  typeof window !== "undefined"
    ? document.cookie.match(/csrftoken=([\w-]+)/)?.[1]
    : null;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACK_END_URL + "graphql/",
    fetch: crossFetch,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
    },
  }),
});

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
