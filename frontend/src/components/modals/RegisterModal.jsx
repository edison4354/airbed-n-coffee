import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRegisterModal } from '../../store/modal';
import * as sessionActions from '../../store/session';
import Modal from './Modal';
import Heading from "../Heading";

const RegisterModal = () => {
    const dispatch = useDispatch();
    const isRegisterOpen = useSelector((state) => state.modalReducer.isRegisterOpen);
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const onClose = () => {
        dispatch(closeRegisterModal());
    }

    useEffect(() => {
        if (sessionUser) {
            console.log('User is logged in');
            dispatch(closeRegisterModal())
        }
    }, [dispatch, sessionUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password) {
          setErrors([]);
          return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
            .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
            />
            <form onSubmit={handleSubmit}>
                <ul className='text-red-600'>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label>
                    First Name
                    <input
                        className='
                            peer
                            w-full
                            p-4
                            pt-6 
                            font-light 
                            bg-white 
                            border-2
                            rounded-md
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                            pl-4
                            border-neutral-300
                            focus:border-black
                        '
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name
                    <input
                        className='
                            peer
                            w-full
                            p-4
                            pt-6 
                            font-light 
                            bg-white 
                            border-2
                            rounded-md
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                            pl-4
                            border-neutral-300
                            focus:border-black
                        '
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                Email
                <input
                    className='
                        peer
                        w-full
                        p-4
                        pt-6 
                        font-light 
                        bg-white 
                        border-2
                        rounded-md
                        outline-none
                        transition
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        pl-4
                        border-neutral-300
                        focus:border-black
                    '
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </label>
                <label>
                Password
                <input
                    className='
                        peer
                        w-full
                        p-4
                        pt-6 
                        font-light 
                        bg-white 
                        border-2
                        rounded-md
                        outline-none
                        transition
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        pl-4
                        border-neutral-300
                        focus:border-black
                    '
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </label>
                <button 
                    type="submit"
                    className='
                        relative 
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80
                        transition
                        w-full
                        bg-rose-500
                        border-rose-500
                        text-white
                        py-3
                        text-md
                        font-semibold
                        border-2
                        mt-6
                    '
                >
                    Agree and Continue 
                </button>
            </form>
        </div>
    )

    return (
        <Modal 
            // disabled={isLoading}
            isOpen={isRegisterOpen}
            title="Register"
            onClose={onClose}
            body={bodyContent}
        />
    )
}

export default RegisterModal;