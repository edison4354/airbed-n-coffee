import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from "../../store/listing";
import { fetchAllReservations } from '../../store/reservation';
import { IoIosStar } from 'react-icons/io';
import { FaWifi } from "react-icons/fa";
import { MdOutlinePool } from "react-icons/md";
import { IoSnow, IoCarOutline } from "react-icons/io5";
import { TbToolsKitchen2 } from "react-icons/tb";
import { PiBathtub } from "react-icons/pi";
import { statesObject } from '../states';
import OceanIcon from '../../../public/view_icon.png';
import { FaHotjar } from "react-icons/fa";
import ReservationForm from '../reservations/ReservationForm';

const ListingDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const listing = useSelector((state) => state.listing);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        dispatch(fetchListing(id)).then(() => setLoading(false));
        dispatch(fetchAllReservations(id))          
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div role="status">
                    <svg aria-hidden="true" className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-400 fill-[#FF385C]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    const city = listing.address.split(',')[1]
    const state = statesObject[listing.address.split(',')[2].trim().slice(0, 2)]

    return (
        <div className="flex justify-center pt-24">
            <div className='flex flex-col'>
                <h1 className="text-[28px] font-medium ">Oceanfront l Deluxe Suite l Full Kitchen</h1>
                <div className="flex items-center gap-2 mt-5 rounded-xl overflow-hidden">
                    <img src={listing.photoUrls[0]} alt="Listing" className="w-[560px] h-[462px]"/>
                    <div className='grid grid-rows-2 grid-flow-col gap-2'>
                        <img src={listing.photoUrls[1]} alt="Listing" className="object-cover w-[272px] h-[227px]"/>
                        <img src={listing.photoUrls[2]} alt="Listing" className="object-cover w-[272px] h-[227px]"/>
                        <img src={listing.photoUrls[3]} alt="Listing" className="object-cover w-[272px] h-[227px]"/>
                        <img src={listing.photoUrls[4]} alt="Listing" className="object-cover w-[272px] h-[227px]"/>       
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div>
                        <div className='pb-8 pt-8'>
                            <h2 className="text-[22px] font-medium">
                                Entire home in {city}, {state}
                            </h2>
                            <div className="flex items-center gap-1">
                                <p className="text-base font-light">6 guests</p>
                                <p className="text-base font-light"> · {listing.numBedrooms} bedrooms</p>
                                <p className="text-base font-light"> · 4 beds</p>
                                <p className="text-base font-light"> · {listing.numBathrooms} baths</p>
                            </div>
                            <div>
                                <div className='flex items-center'>
                                    <IoIosStar /> 
                                    <p className='pl-1 font-medium'>4.98</p>
                                    <p className='pl-1 pr-1 font-medium'> · </p>
                                    <p className="text-base font-medium underline">186 reviews</p>
                                </div>
                            </div>
                        </div>
                        <hr className='w-[653px]'/>
                        <div className='flex pb-7 pt-7'>
                            <img src="../profile.png" alt="Profile Image" className=" rounded-full w-10 h-10"/>
                            <div className='pl-3'>
                                <p className="text-base font-medium">Hosted by {listing.host.firstName} {listing.host.lastName}</p>
                                <p className="text-sm font-light text-slate-500">{Math.floor(Math.random() * 10)} years hosting</p>
                            </div>
                        </div>
                        <hr className='w-[653px]'/>
                        <div className='pb-7 pt-7 max-w-[653px]'>
                            <p className="text-base font-light">{listing.description}</p>
                        </div>
                        <hr className='w-[653px]'/>
                        <div className='pb-7 pt-7 max-w-[653px]'>
                            <h2 className="text-[22px] font-medium">What this place offers</h2>
                            <div className='grid grid-cols-2 gap-4 pt-4'>
                                {listing.amenities.map((amenity, idx) => (
                                    <div key={idx} className='flex flex-col items-left'>
                                        <div className="flex text-md font-light gap-2 items-center">
                                            {amenity == "WiFi" ? <FaWifi className='text-lg'/> : null}
                                            {amenity == "Pool" ? <MdOutlinePool className='text-lg'/> : null} 
                                            {amenity == "Air Conditioning" ? <IoSnow className='text-lg'/> : null} 
                                            {amenity == "Parking" ? <IoCarOutline className='text-lg'/> : null} 
                                            {amenity == "Kitchen" ? <TbToolsKitchen2 className='text-lg'/> : null}
                                            {amenity == "Bathtub" ? <PiBathtub className='text-lg'/> : null}
                                            {amenity == "Central Heating" ? <FaHotjar className='text-lg'/> : null}  
                                            {amenity == "Ocean View" ? <img src={OceanIcon} alt="Ocean_Icon" className='w-[17px] h-[17px]'/> : null}    
                                            {amenity}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/*<hr className='w-[653px]'/>
                        <div className='pb-7 pt-7 max-w-[653px]'>
                            <h2 className="text-[22px] font-medium">Calendar</h2>
                            <div className='border w-full h-[300px] mt-8 mb-8 rounded-lg'>
                            </div>
                        </div>*/}
                    </div>
                    <div className='pb-8 pt-8'>
                        <div className='w-[372px] h-[606px]'>
                            <ReservationForm/>
                        </div>
                    </div>
                </div>
                {/*<hr className='w-full'/>
                <div>
                    <h2 className="flex items-center gap-2 text-[22px] font-medium pb-8 pt-8"> <IoIosStar /> 4.98 · 186 reviews</h2>
                    <div className='border w-full h-[160px] mb-8 rounded-lg'>
                    </div>
                    <hr className='w-full'/>
                    <div className='grid grid-cols-2 pt-8 pb-8 gap-y-16'>
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                            <div key={index}>
                                <div>
                                    <div className='flex gap-3'>
                                        <img src="../profile.png" alt="Profile Image" className=" rounded-full w-12 h-12"/>
                                        <div>
                                            <p className="text-base font-medium">Margarita</p>
                                            <p className="text-sm font-light text-slate-500">Napa, California</p>
                                        </div>
                                    </div>
                                    <div className='max-w-[457px] pt-4'>
                                        <p className="text-base font-light">Very nice place. Pictures did make it seem like it was bigger but it wasn’t. Nice little town. roads to go inside very winding and pretty secluded area. Over all great experience.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className='w-full'/>
                    <div>
                        <h2 className="text-[22px] font-medium pt-8">Where you&apos;ll be</h2>
                        <div className='border w-full h-[500px] mt-8 mb-8 rounded-lg'>
                            Map
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>
    );
}

export default ListingDetail;