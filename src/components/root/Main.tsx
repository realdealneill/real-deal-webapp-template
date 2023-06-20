import { Router } from "~/components/router/Router";
import { setupFirebase } from "~/lib/firebase";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSignIn, useSignOut } from "~/components/contexts/UserContext";
import userAtom from "../../recoil/user";
import {useSetRecoilState} from "recoil";

function Main() {
  const setUser = useSetRecoilState(userAtom);
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();

  useEffect(() => {
    setupFirebase();

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        setUser({
          uid,
          displayName,
          email,
          photoURL
        });
        signIn(user);
      } else {
        setUser(undefined);
        signOut();
      }
    });
  }, []);
  return (
    <main>
      <Router />
    </main>
  );
}

export default Main;
