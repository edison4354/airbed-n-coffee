import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllListings } from "../../store/listing";
import ListingCard from "./ListingCard";

const ListingGrid = () => {
    const dispatch = useDispatch();
    const listings = useSelector((state) => Object.values(state.listing))

    useEffect(() => {
        dispatch(fetchAllListings());
    }, [dispatch]);

    return (
        <div className="flex flex-wrap justify-around gap-4 pl-20 pr-20"> 
            {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing}/>
            ))}
        </div>
    )
}

export default ListingGrid;