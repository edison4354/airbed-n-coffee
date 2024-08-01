import { useEffect, useState, Suspense, lazy} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations } from "../../store/reservation";
import { createSelector } from "reselect";

const TripCard = lazy(() => import("./TripCard"));

const selectReservations = (state) => state.reservation;
const selectReservationsArray = createSelector(
    [selectReservations],
    (reservations) => reservations ? Object.values(reservations) : []
  );

const TripGrid = () => {
    const dispatch = useDispatch()
    const sessionUserId = useSelector((state) => state.session.user.id);
    const reservations = useSelector(selectReservationsArray);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (sessionUserId) {
            dispatch(fetchUserReservations(sessionUserId)).then(() => setLoading(false));
        }
    }, [dispatch, sessionUserId]);

    if (loading) {
        return (
            <div className="flex justify-center pt-24">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center pt-24">
            <div className='flex flex-col w-[900px]'>
                <h1 className="text-4xl font-semibold">Trips</h1>
                <h2 className="text-xl font-medium mt-12">Upcoming reservations</h2>
                <div className="mt-2">
                    {reservations.length > 0 ? (
                        <Suspense fallback={<div>Loading trips...</div>}>
                            {reservations.map((reservation) =>
                                reservation ? (
                                <TripCard key={reservation.id} reservation={reservation} />
                                ) : null
                            )}
                        </Suspense>
                    ) : (
                        <div>No reservations available</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TripGrid;