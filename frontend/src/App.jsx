import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/LoginForm';
import SignupForm from './components/session/SignupForm';
import Navbar from './components/navbar/Navbar';
import * as sessionActions from './store/session';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ListingsGrid from './components/listings/ListingsGrid';
import ListingDetail from './components/listings/ListingDetail';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: 
            <div className="pb-20 pt-24">
                <ListingsGrid />
            </div>
      },
      {
        path: 'login',
        element: <LoginForm />
      },
      {
        path: 'signup',
        element: <SignupForm />
      },
      {
        path: '/listings/:id',
        element: <ListingDetail />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;