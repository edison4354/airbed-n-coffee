import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const login = ({ email, password }) => async dispatch => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE"
    });
    dispatch(removeUser());
    return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  console.log(firstName, lastName, email, password)
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
        user: {
            firstName,
            lastName,
            email,
            password
        }
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
        return { ...state, user: action.payload };
    case REMOVE_USER:
        return { ...state, user: null };
    default:
        return state;
  }
}

export default sessionReducer;