import { lazy, Suspense } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import {useRecoilValue} from "recoil";
import userAtom from "~/recoil/user";
import {SignInButton} from "~/components/domain/auth/SignInButton";
import {SignOutButton} from "~/components/domain/auth/SignOutButton";

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/pages/Index'));
const Page404Screen = lazy(() => import('~/components/pages/404'));

function Layout() {
  const userProfile = useRecoilValue(userAtom);
  const imagePath = userProfile ? <img src={userProfile.photoURL ? userProfile.photoURL : "src/images/blank-profile-grey.png"}  alt="Sign In" /> : <img src="src/images/blank-profile-grey.png"  alt="Sign In" />

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Application</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {imagePath}
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <div className="justify-between btn-disabled">
                  { userProfile ? userProfile.displayName : "Sign In" }
                </div>
              </li>
              <li><a>Settings</a></li>
              <li>
                {userProfile ? <SignOutButton /> : <SignInButton />}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
