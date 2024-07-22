import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllReservations } from "../../store/reservation";
import { useLocation } from "react-router-dom";

const TripDetailPage = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const listingId = parseInt(new URLSearchParams(location.search).get('listingId'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (listingId) {
            dispatch(fetchAllReservations(listingId)).then(() => setLoading(false));
        }
    }, [dispatch, listingId])

    if (loading) {
        return (
            <div className="flex justify-center pt-24">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <main className="flex justify-center pt-24 px-10">
            <div className='flex flex-col w-[900px]'>
            </div>
        </main>
    )
}

export default TripDetailPage;