import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/LoginForm';
import SignupForm from './components/session/SignupForm';
import Navbar from './components/navbar/Navbar';
import Modal from './components/modals/Modal';
import * as sessionActions from './store/session';

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
        <Modal title="Login" isOpen={true} actionLabel={"Submit"}/>
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
        element: <h1 className="text-3xl font-bold underline"> Hello world! </h1>
      },
      {
        path: 'login',
        element: <LoginForm />
      },
      {
        path: 'signup',
        element: <SignupForm />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;