import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations } from "../../store/reservation";
import TripCard from "./TripCard";

const TripGrid = () => {
    const dispatch = useDispatch()
    const sessionUserId = useSelector((state) => state.session.user.id);
    const reservations = useSelector((state) => Object.values(state.reservation))
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchUserReservations(sessionUserId)).then(() => setLoading(false));
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
                    {reservations && reservations.length > 0 ? (reservations.slice().reverse().map(reservation =>
                        reservation ? <TripCard key={reservation.id} reservation={reservation} /> : null
                    )) : (<div>No reservations available</div>)}
                </div>
            </div>
        </div>
    )
}

export default TripGrid;