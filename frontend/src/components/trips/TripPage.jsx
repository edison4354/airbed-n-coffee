import { useEffect, useState, lazy} from "react";
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
                <div className='flex flex-col w-[900px]'>
                    <h1 className="text-4xl font-semibold">Trips</h1>
                    <h2 className="text-xl font-medium mt-12">Upcoming reservations</h2>
                    <div className="mt-2">
                        <div className="w-[900px] h-[253px] border border-slate-100 mt-4 mb-5 rounded-2xl shadow-lg">
                            <div className="flex justify-between animate-pulse h-full">
                                <div className="flex-1 space-y-6 p-6">
                                    <div className="h-2 bg-slate-700 rounded w-72"></div>
                                    <div className="h-2 bg-slate-700 rounded w-52"></div>
                                    <div className="space-y-4 pt-20">
                                        <div className="grid grid-cols-3 gap-4 w-96">
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 w-96">
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-700 rounded-r-2xl w-80"></div>
                            </div>
                        </div>
                    </div>
                </div>
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
                        reservations.map((reservation) =>
                            reservation ? (
                                <TripCard key={reservation.id} reservation={reservation} />
                            ) : null
                        )
                    ) : (
                        <div>No reservations available</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TripGrid;