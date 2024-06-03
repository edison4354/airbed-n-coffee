import { csrfFetch } from "./csrf";

// const RECEIVE_LISTING = 'RECEIVE_TEA';
const RECEIVE_LISTINGS = 'RECEIVE_TEAS';

// const receiveListing = listing => {
//     return {
//         type: RECEIVE_LISTING,
//         listing: listing
//     }
// };

const receiveListings = listings => {
    return {
        type: RECEIVE_LISTINGS,
        listings
    }
};

// export const fetchListing = (listingId) => async dispatch => {
//     const res = await csrfFetch(`/api/listing/${listingId}`);
//     const data = await res.json();
//     dispatch(receiveListing(data));
// };


export const fetchAllListings = () => async dispatch => {
    // debugger
    const res = await csrfFetch('/api/listings');
    const data = await res.json();
    dispatch(receiveListings(data));
};

const listingReducer = (state = {}, action) => {
    Object.freeze(state);

    const nextState = { ...state }; 

    switch (action.type) {
        // case RECEIVE_LISTING:
        //     nextState[action.tea.id] = action.listing;
        //     return nextState;
        case RECEIVE_LISTINGS:
            return { ...nextState, ...action.listings };
        default:
            return state;
    }
};

export default listingReducer;