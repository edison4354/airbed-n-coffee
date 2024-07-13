import { statesObject } from '../states';

const TripCard = ({ reservation }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
    };

    return (
        <div className="flex w-[900px] border border-slate-100 mt-4 mb-5 rounded-2xl shadow-lg">
            <div className="p-6 flex-1">
                <div className="mb-6">
                    <h1 className="text-2xl font-medium pb-2">{reservation.listing.title}</h1>
                    <h2>Entire home hosted by {reservation.listing.host.firstName}</h2>
                </div>
                <hr className="border-gray-200"/>
                <div className="flex items-center mt-5">
                    <div>
                        <p>Check in: {formatDate(reservation.checkIn)}</p>
                        <p>Check out: {formatDate(reservation.checkOut)}</p>
                    </div>
                    <div className="border-[0.5px] border-gray-200 h-24 mx-4"></div>
                    <div>
                        <p>{reservation.listing.address.split(',')[1]}, {statesObject[reservation.listing.address.split(',')[2].trim().slice(0, 2)]}</p>
                        <p>United States</p>
                    </div>        
                </div>
            </div>
            <div className="flex justify-end"> 
                <img src={reservation.listing.photoUrls[0]} alt="Listing" className="object-fill rounded-r-2xl w-80"/>
            </div>
        </div>
    )
}

export default TripCard;