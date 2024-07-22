import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import DatePicker from "./DatePicker";
import * as reservationActions from '../../store/reservation';
import { openLoginModal, openBookedModal } from '../../store/modal';

const ReservationForm = () => {
    const dispatch = useDispatch()
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [nights, setNights] = useState(0);
    const [numGuests, setNumGuests] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false)

    const listing = useSelector((state) => state.listing);
    const sessionUser = useSelector(state => state.session.user);

    const listingId = listing.id
    const checkIn = dateRange[0]
    const checkOut = dateRange[1]

    useEffect(() => {
        setLoggedIn(!!sessionUser);
    }, [sessionUser]);

    const handleChange = (e) => {
        setNumGuests(e.target.value);
    };

    const handleDateChange = (newDateRange) => {
        const days = calculateDaysLeft(newDateRange[0], newDateRange[1]);
        setNights(days);
    };

    const calculateDaysLeft = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInTime = end - start;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
        return differenceInDays;
    };

    const reservation = { 
        listingId,
        checkIn,
        checkOut,
        numGuests
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (loggedIn) {
                await dispatch(reservationActions.createNewReservation(reservation))
                dispatch(openBookedModal());
            } else {
                dispatch(openLoginModal());
            }
        } catch (error) {
            console.error("Failed to create a new reservation:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center p-4 shadow-xl rounded-xl border">
            <div className="w-[322px] flex justify-start pb-3">
                <h1 className="flex text-xl font-semibold items-end">
                    ${(listing.pricePerNight).toLocaleString()}
                    <p className="font-light text-base pl-1">night</p>
                </h1>
            </div>
            <DatePicker value={dateRange} onChange={setDateRange} handleDateChange={handleDateChange}/>
            <div className="w-[322px] h-[61px] border rounded-lg border-[#B0B0B0] mt-3 pl-3 flex flex-col justify-center">
                <label className="text-[10px] font-bold" htmlFor="guest">GUESTS</label>
                <input
                    type="number"
                    value={numGuests}
                    onChange={handleChange}
                    placeholder="1 guest"
                    className="font-light"
                />
            </div>
            <button 
                type="submit"
                className='
                    relative 
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    rounded-lg
                    hover:opacity-80
                    transition
                    w-[322px]
                    bg-rose-500
                    border-rose-500
                    text-white
                    py-3
                    text-md
                    font-semibold
                    border-2
                    mt-6
                '
            >
                Reserve
            </button>
            <p className="mt-4">You won&apos;t be charged yet</p>
            <div className="flex w-[322px] justify-between mt-6 font-light">
                <p className="underline">${(listing.pricePerNight).toLocaleString()} x {nights} nights</p>
                <p>${(listing.pricePerNight * nights).toLocaleString()}</p>
            </div>
            <div className="flex w-[322px] justify-between mt-3 mb-5 font-light">
                <p className="underline">Airbnb service fee</p>
                <p>${(Math.round(listing.pricePerNight * nights * 0.142)).toLocaleString()}</p>
            </div>
            <hr className="w-[322px]"/>
            <div className="flex w-[322px] justify-between mt-4 mb-1 font-semibold">
                <p>Total before taxes</p>
                <p>${(Math.round(listing.pricePerNight * nights * 0.142) + (listing.pricePerNight * nights)).toLocaleString()}</p>
            </div>
        </form>
    )
}

export default ReservationForm;