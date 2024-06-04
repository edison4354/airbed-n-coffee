import { useNavigate } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";

const ListingCard = ({listing}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/listings/${listing.id}`);
    }

    return (
        <div 
            onClick={handleClick}
            className="col-span-1 cursor-pointer group w-72 pb-6"
        >
            <div className="flex flex-col">
                <div 
                    className="
                        w-72
                        h-72
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <img
                        className="
                            object-cover 
                            h-full
                            w-full
                            group-hover:scale-110
                            transition-transform
                        "
                        src="./../../../public/listing_image.png"
                        alt="Listing"
                    />
                </div>
                <div className="flex justify-between font-medium pt-2">
                    {listing.address}
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