const OPEN_REGISTER_MODAL = 'modal/openRegisterModal';
const CLOSE_REGISTER_MODAL = 'modal/closeRegisterModal';
const OPEN_LOGIN_MODAL = 'modal/openLoginModal';
const CLOSE_LOGIN_MODAL = 'modal/closeLoginModal';
const OPEN_BOOKED_MODAL = 'modal/openBookedModal';
const CLOSE_BOOKED_MODAL = 'modal/closeBookedModal';

export const openRegisterModal = () => ({
    type: OPEN_REGISTER_MODAL
});

export const closeRegisterModal = () => ({
    type: CLOSE_REGISTER_MODAL
});

export const openLoginModal = () => ({
    type: OPEN_LOGIN_MODAL
});

export const closeLoginModal = () => ({
    type: CLOSE_LOGIN_MODAL
});

export const openBookedModal = () => ({
    type: OPEN_BOOKED_MODAL
});

export const closeBookedModal = () => ({
    type: CLOSE_BOOKED_MODAL
});

const initialState = {
    isLoginOpen: false,
    isRegisterOpen: false,
    isBookedOpen: false
};

function modalReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_REGISTER_MODAL:
            return {
                ...state,
                isRegisterOpen: true
            };
        case CLOSE_REGISTER_MODAL:
            return {
                ...state,
                isRegisterOpen: false
            };
        case OPEN_LOGIN_MODAL:
            return {
                ...state,
                isLoginOpen: true
            };
        case CLOSE_LOGIN_MODAL:
            return {
                ...state,
                isLoginOpen: false
            };
        case OPEN_BOOKED_MODAL:
            return {
                ...state,
                isBookedOpen: true
            };
        case CLOSE_BOOKED_MODAL:
            return {
                ...state,
                isBookedOpen: false
            };
        default:
            return state;
    }
}

export default modalReducer
