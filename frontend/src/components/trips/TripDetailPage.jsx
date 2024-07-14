import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservation } from "../../store/reservation";
import { useParams } from "react-router-dom";

const TripDetail = () => {
    const { reservationId } = useParams()
    const dispatch = useDispatch()
    const reservation = useSelector((state) => Object.values(state.reservation)[0])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (reservationId) {
            dispatch(fetchReservation(reservationId)).then(() => setLoading(false));
        } 
    }, [dispatch, reservationId])

    if (loading) {
        return (
            <div className="flex justify-center pt-24">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="flex justify-center pt-24 px-10">
            <div className='flex flex-col w-[900px]'>
                <h1 className="text-3xl font-semibold">What do you want to change?</h1>
                <div className="flex border rounded-xl p-6 mt-6">
                    <img src={reservation.listing.photoUrls[0]} alt="Listing" className="object-fill rounded-lg w-36"/>
                    <div className="flex flex-col justify-center pl-4">
                        <p className="text-lg font-semibold">Blue Marine; New 2br Apt</p>
                        <p className="text-base font-light">Entire home/apt · 2 bed · 1 bath</p>
                    </div>
                </div>
                <h2 className="text-xl font-medium mt-16">Reservation Details</h2>
            </div>
        </div>
    )
}

export default TripDetail;