import {HelmetProvider} from "react-helmet-async";
import {AuthProvider} from "~/components/contexts/UserContext";
import Main from "~/components/root/Main";
import {RecoilRoot} from 'recoil';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, ApolloProvider } from '@apollo/client';

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT });

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            'CF-Access-Client-Id': '1222727bde326cb7f9dcf2059c74636a.access' || null,
            'CF-Access-Client-Secret': '1f22dd4bae25e92f752d001f11253fbd20546dff3f60c11c136d9446b8dd305e' || null
        }
    }));

    return forward(operation);
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
});

export const App = () => {
  return (
    <HelmetProvider>
        <RecoilRoot>
          <AuthProvider>
              <ApolloProvider client={client}>
                <Main />
              </ApolloProvider>
          </AuthProvider>
        </RecoilRoot>
    </HelmetProvider>
  )
};
