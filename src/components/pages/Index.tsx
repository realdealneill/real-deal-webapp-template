import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useQuery, gql } from '@apollo/client';

const GET_SINGLE_TRANSACTION = gql`
  query GetSingleTransaction {
      allTransactions(first: 1) {
        nodes {
          categoryLevel1
          categoryLevel2
          amount
          merchantName
          postingDate
        }
      }
    }
`;

function Index() {
  const { state } = useAuthState();
  const { loading, error, data } = useQuery(GET_SINGLE_TRANSACTION);

    const databaseMessage = loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : <p>{JSON.stringify(data)}</p>;
  if (error) {
    console.log(JSON.stringify(error),null,3);
  }
  return (
    <>
      <Head title="App" />
      <div className="hero min-h-screen" style={{backgroundImage: "url(src/images/pexels-sindre-fs-1144176.jpg)"}}>
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">Welcome to the Real Deal Webapp Template. To begin, sign in below to access protected routes.</p>
            {state.state === 'UNKNOWN' ? null : state.state === 'SIGNED_OUT' ? <SignInButton /> : <SignOutButton />}
              {databaseMessage}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
