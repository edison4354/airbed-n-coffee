import { csrfFetch } from './csrf';

// Action Types
const CREATE_RESERVATION = 'CREATE_RESERVATION';
const UPDATE_RESERVATION = 'UPDATE_RESERVATION';
const DELETE_RESERVATION = 'DELETE_RESERVATION';
const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
const RECEIVE_RESERVATIONS = 'RECEIVE_RESERVATIONS';
const RECEIVE_USER_RESERVATIONS = 'RECEIVE_USER_RESERVATIONS';

// Action Creators
const createReservation = (reservation) => ({
  type: CREATE_RESERVATION,
  payload: reservation,
});

const updateReservation = (id, updates) => ({
  type: UPDATE_RESERVATION,
  payload: { id, updates },
});

const deleteReservation = (id) => ({
  type: DELETE_RESERVATION,
  payload: id,
});

const receiveReservation = (reservation) => ({
  type: RECEIVE_RESERVATION,
  payload: reservation,
});

const receiveReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
  payload: reservations,
});

const receiveUserReservations = (reservations) => ({
  type: RECEIVE_USER_RESERVATIONS,
  payload: reservations,
})

// Thunks Action Creators
export const fetchReservation = (reservationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`);
  const data = await res.json();
  dispatch(receiveReservation(data));
}

export const fetchAllReservations = (listingId) => async (dispatch) => {
  const res = await csrfFetch('/api/reservations');
  const data = await res.json()
  const listingData = await data.filter(reservation => reservation.listingId === listingId)
  const normalizedData = listingData.reduce((acc, reservation) => {
    acc[reservation.id] = reservation;
    return acc
  }, {});

  dispatch(receiveReservations(normalizedData));
}

export const fetchUserReservations = (userId) => async (dispatch) => {
  const res = await csrfFetch('/api/reservations');
  const data = await res.json();
  const userData = await data.filter(reservation => reservation.guestId === userId)
  dispatch(receiveUserReservations(userData));
}

export const createNewReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch('/api/reservations', {
    method: 'POST',
    body: JSON.stringify({reservation}),
  });
  const data = await res.json();
  dispatch(createReservation(data));
  return res;
}

export const updateExistingReservation = (id, reservation) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${id}`, {
    method: 'PUT',
    body: JSON.stringify({reservation}),
  });
  const data = await res.json();
  dispatch(updateReservation(id, data));
  return res;
}

export const deleteExistingReservation = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${id}`, {
    method: 'DELETE',
  });
  dispatch(deleteReservation(id));
  return res;
}

// Reducer
const reservationReducer = (state = {}, action) => {
    Object.freeze(state);

    const nextState = { ...state };
    
    switch (action.type) {
        case CREATE_RESERVATION:
            return { 
              ...nextState, 
              [action.payload.id]: action.payload 
            };

        case UPDATE_RESERVATION:
            return { 
              ...nextState, 
              [action.payload.id]: action.payload 
            };

        case DELETE_RESERVATION:
            delete nextState[action.payload];
            return nextState;

        case RECEIVE_RESERVATION:
            return action.payload;

        case RECEIVE_RESERVATIONS:
            return {
              ...nextState,
              ...action.payload
            };

        case RECEIVE_USER_RESERVATIONS:
            return action.payload;

        default:
            return state;
    }
}

export default reservationReducer;  