import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservation, deleteExistingReservation, updateExistingReservation } from "../../store/reservation";
import { fetchListing } from "../../store/listing";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import DatePicker from "../reservations/DatePicker";
import { FaArrowCircleLeft } from "react-icons/fa";

const TripDetailPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const reservationId = parseInt(useParams().reservationId)
    const listingId = parseInt(new URLSearchParams(location.search).get('listingId'));
    const reservation = useSelector((state) => state.reservation)
    const listing = useSelector((state) => state.listing)
    const [ loading, setLoading ] = useState(true);
    const [ dateRange, setDateRange ] = useState([null, null]);
    const [ numGuests, setNumGuests ] = useState(0)

    const checkIn = dateRange[0]
    const checkOut = dateRange[1]

    useEffect(() => {
        if (listingId && reservationId) {
            dispatch(fetchReservation(reservationId));
            dispatch(fetchListing(listingId)).then(() => setLoading(false));
        }
    }, [dispatch, listingId, reservationId])

    useEffect(() => {
        if (reservation && reservation.checkIn && reservation.checkOut) {
            setDateRange([
                dayjs(reservation.checkIn),
                dayjs(reservation.checkOut)
            ]);
        }
        
        if (reservation && reservation.numGuests) {
            setNumGuests(reservation.numGuests)
        }

    }, [reservation]);

    const formatDate = (dateString) => {
        const date = new Date(dateString  + 'T12:00:00Z');
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
    };

    const getCancellationDate = (checkInDate) => {
        const date = new Date(checkInDate);
        date.setDate(date.getDate() - 5);
        return date;
    };

    const handleGuestChange = (e) => {
        setNumGuests(e.target.value);
    };

    const handleExit = () => {
        navigate(-1);
    }

    const reservationUpdates = {
        listingId,
        checkIn,
        checkOut,
        numGuests
    }

    const handleSaveChanges = () => {
        dispatch(updateExistingReservation(reservationId, reservationUpdates));
        navigate('/trips');
    }

    const handleCancel = () => {
        dispatch(deleteExistingReservation(reservationId));
        navigate('/trips');
    }

    if (loading) {
        return (
            <div className="flex justify-center pt-24">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <main className="flex justify-center pt-24 px-10">
            <div className="flex flex-col w-[900px]">
                <header>
                    <h1 className="text-4xl font-semibold">What do you want to change?</h1>
                </header>

                <section className="flex border rounded-xl p-6 mt-6" aria-labelledby="listing-heading">
                    <figure className="flex-shrink-0">
                        <img src={listing.photoUrls[0]} alt="Listing" className="object-fill rounded-lg w-36" />
                    </figure>
                    <div className="flex flex-col justify-center pl-4">
                        <h2 id="listing-heading" className="text-lg font-semibold">{listing.title}</h2>
                        <p className="text-base font-light">{`Entire home · ${listing.numBedrooms} beds · ${listing.numBathrooms} bath`}</p>
                    </div>
                </section>

                <section aria-labelledby="reservation-details-heading">
                    <h2 id="reservation-details-heading" className="text-2xl font-medium mt-12">Reservation Details</h2>
                    <div>
                        <p className="mt-8 mb-4">Dates</p>
                        <DatePicker value={dateRange} onChange={setDateRange}/>
                    </div>
                    <div>
                        <p className="mt-6 mb-3">Guests</p>
                        <input
                            type="number"
                            value={numGuests}
                            onChange={handleGuestChange}
                            placeholder="Number of guests"
                            className="font-base border border-[#C4C4C4] rounded py-4 px-3.5 hover:border-black focus:border-black w-[429px]"
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-medium mt-14 mb-3">Cancellation policy</h2>
                    <p className="font-light">{`Free cancellation before 3:00PM on ${formatDate(getCancellationDate(reservation.checkIn))}. Cancel before check-in at 3:00 PM on ${formatDate(reservation.checkIn)} for a partial refund`}</p>
                </section>

                <hr className=' mt-10 w-[900px]'/>

                <footer className="mt-6 mb-6 flex justify-between">
                    <button onClick={handleExit} className="flex items-center bg-gray-300 text-white px-4 py-2 rounded-lg font-medium hover:bg-black">
                        <FaArrowCircleLeft className="text-md"/>
                        <p className="pl-2">Exit</p>
                    </button>
                    <div>
                        <button onClick={handleCancel} className="bg-gray-300 text-white px-4 py-2 rounded-lg font-medium hover:bg-[#FF385C] mr-2">Cancel Reservation</button>
                        <button onClick={handleSaveChanges} className="bg-gray-300 text-white px-4 py-2 rounded-lg font-medium hover:bg-[#FF385C]">Save Changes</button>
                    </div>
                </footer>
            </div>
        </main>
    )
}

export default TripDetailPage;