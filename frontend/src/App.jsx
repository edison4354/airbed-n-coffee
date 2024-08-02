import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import * as sessionActions from './store/session';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import BookedModal from './components/modals/BookedModal';
import ListingsGrid from './components/listings/ListingsGrid';
import ListingDetail from './components/listings/ListingDetail';
import ReservationForm from './components/reservations/DatePicker';
import TripPage from './components/trips/TripPage';
import TripDetailPage from './components/trips/TripDetailPage';
import Footer from './components/common/Footer';

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
        <BookedModal />
        <Navbar />
        {isLoaded && <Outlet />}
        <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <ListingsGrid />
        },
        {
            path: '/listings/:id',
            element: <ListingDetail />
        },
        {
            path: '/reservations',
            element: <ReservationForm />
        },
        {
            path: '/trips',
            element: <TripPage />
        },
        {
            path: '/trips/:reservationId',
            element: <TripDetailPage />
        }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;