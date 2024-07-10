import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations } from "../../store/reservation";

const TripGrid = () => {
    const dispatch = useDispatch()
    const sessionUserId = useSelector((state) => state.session.user.id);
    const reservations = useSelector((state) => Object.values(state.reservation))

    useEffect(() => {
        dispatch(fetchUserReservations(sessionUserId));
    }, [dispatch, sessionUserId]);

    return (
        <div className="flex justify-center pt-24">
            <div className='flex flex-col'>
                <h1 className="text-3xl font-medium">Trips</h1>
                <h2 className="text-xl font-medium mt-20">Upcoming reservations</h2>
                <div className="mt-8">
                    {reservations.map(reservation => (
                        <div key={reservation.id} className="flex w-[1000px] border mt-2 mb-2 p-2">
                            <p>Check-In: {reservation.checkIn}</p>
                            <p>Check-Out: {reservation.checkOut}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TripGrid;