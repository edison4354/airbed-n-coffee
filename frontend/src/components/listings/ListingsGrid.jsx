import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllListings } from "../../store/listing";
import ListingCard from "./ListingCard";

const ListingGrid = () => {
    const dispatch = useDispatch();
    const listings = useSelector((state) => Object.values(state.listing))
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchAllListings()).then(() => setLoading(false));
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center pt-24">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-between gap-5 pl-10 pr-10 xl:pr-20 xl:pl-20"> 
            {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing}/>
            ))}
        </div>
    )
}

export default ListingGrid;