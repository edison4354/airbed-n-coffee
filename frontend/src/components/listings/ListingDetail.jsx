import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListing } from "../../store/listing";

const ListingDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const listing = useSelector((state) => state.listing[id]);

    useEffect(() => {
        dispatch(fetchListing(id));
    }, [dispatch, id]);

    return (
        <div className="flex flex-col items-center justify-center pt-24">
            <h1 className="text-3xl font-semibold">{listing.title}</h1>
        </div>
    );
}

export default ListingDetail;