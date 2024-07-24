import { useNavigate } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import { statesObject } from '../states';

const ListingCard = ({ listing }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/listings/${listing.id}`);
    }

    const city = (listing.address) ? listing.address.split(',')[1] : '';
    const state = (listing.address) ? statesObject[listing.address.split(',')[2].trim().slice(0, 2)] : '';

    return (
        <div 
            onClick={handleClick}
            className="
                w-full 
                min-[580px]:w-[48%] 
                min-[827px]:w-[48.5%] 
                min-[947px]:w-[31.64%] 
                min-[1029px]:w-[31.8%] 
                min-[1159px]:w-[23.5%] 
                min-[1409px]:w-[23.8%] 
                min-[1639px]:w-[18.91%] 
                min-[1759px]:w-[19%] 
                min-[1882px]:w-[15.7%] 
                cursor-pointer 
                group
            "
        >
            <div className="flex flex-col">
                <div 
                    className="
                        relative
                        overflow-hidden
                        rounded-xl
                        aspect-[20/19]
                    "
                >
                    {listing.photoUrls && listing.photoUrls[0] ? (
                        <img
                            className="
                                object-cover 
                                h-full
                                w-full
                                group-hover:scale-110
                                transition
                            "
                            src={`${listing.photoUrls[0]}`}
                            alt="Listing"
                        />
                    ) : (
                        <div className="object-cover h-full w-full bg-gray-200">
                        </div>
                    )}
                </div>
                <div className="flex justify-between font-medium pt-2">
                    {city}, {state}
                    <div className='flex items-center'>
                        <IoIosStar /> 
                        <p className='pl-1 font-light'>4.98</p>
                    </div>
                </div>
                <div className="font-light text-neutral-500">
                    55 Miles Away
                </div>
                <div className="font-light text-neutral-500">
                    June 18 - 22
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-medium">
                        ${listing.pricePerNight}
                    </div>
                    <div className="font-light">night</div>
                </div>
            </div>
        </div>
    )
}

export default ListingCard;