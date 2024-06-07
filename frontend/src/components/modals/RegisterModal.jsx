import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRegisterModal } from '../../store/modal';
import * as sessionActions from '../../store/session';
import Modal from './Modal';
import Heading from "../Heading";
// import { IconContext } from "react-icons";
import { FaCircleXmark } from "react-icons/fa6";

const RegisterModal = () => {
    const dispatch = useDispatch();
    const isRegisterOpen = useSelector((state) => state.modal.isRegisterOpen);
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
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
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
                <div className='mb-5'>
                    <div className="w-full relative">
                        <input
                                className='
                                    peer
                                    w-full
                                    p-4
                                    pt-6 
                                    font-light 
                                    bg-white 
                                    border-x-2
                                    border-t-2
                                    rounded-tl-lg
                                    rounded-tr-lg
                                    outline-none
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    pl-4
                                    border-neutral-300
                                    focus:border-black
                                '
                                placeholder=" "
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label 
                            className='
                                absolute 
                                text-sm
                                duration-150 
                                transform 
                                -translate-y-3 
                                top-5 
                                z-10 
                                origin-[0] 
                                left-4
                                peer-placeholder-shown:scale-125 
                                peer-placeholder-shown:translate-y-1
                                peer-focus:scale-100
                                peer-focus:-translate-y-3
                                text-zinc-400
                            '
                        >
                            First Name
                        </label>
                    </div>
                    <div className="w-full relative">
                        <input
                                className='
                                    peer
                                    w-full
                                    p-4
                                    pt-6 
                                    font-light 
                                    bg-white 
                                    border-2
                                    rounded-bl-lg
                                    rounded-br-lg
                                    outline-none
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    pl-4
                                    border-neutral-300
                                    focus:border-black
                                '
                                type="text"
                                placeholder=" "
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                        />
                        <label 
                            className='
                                absolute 
                                text-sm
                                duration-150 
                                transform 
                                -translate-y-3 
                                top-5 
                                z-10 
                                origin-[0] 
                                left-4
                                peer-placeholder-shown:scale-125 
                                peer-placeholder-shown:translate-y-1
                                peer-focus:scale-100
                                peer-focus:-translate-y-3
                                text-zinc-400
                            '
                        >
                            Last Name
                        </label>
                    </div>
                </div>
                <div className='"w-full mb-5 relative'>
                    <input
                        className='
                            peer
                            w-full
                            p-4
                            pt-6 
                            font-light 
                            bg-white 
                            border-2
                            rounded-lg
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                            pl-4
                            border-neutral-300
                            focus:border-black
                        '
                        type="text"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label 
                        className='
                                absolute 
                                text-sm
                                duration-150 
                                transform 
                                -translate-y-3 
                                top-5 
                                z-10 
                                origin-[0] 
                                left-4
                                peer-placeholder-shown:scale-125 
                                peer-placeholder-shown:translate-y-1
                                peer-focus:scale-100
                                peer-focus:-translate-y-3
                                text-zinc-400
                        '
                    >
                        Email
                    </label>
                </div>
                <div className='"w-full relative'>
                    <input
                        className='
                            peer
                            w-full
                            p-4
                            pt-6 
                            font-light 
                            bg-white 
                            border-2
                            rounded-lg
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                            pl-4
                            border-neutral-300
                            focus:border-black
                        '
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label 
                        className='
                                absolute 
                                text-sm
                                duration-150 
                                transform 
                                -translate-y-3 
                                top-5 
                                z-10 
                                origin-[0] 
                                left-4
                                peer-placeholder-shown:scale-125 
                                peer-placeholder-shown:translate-y-1
                                peer-focus:scale-100
                                peer-focus:-translate-y-3
                                text-zinc-400
                        '
                    >
                        Password
                    </label>
                </div>
                <ul className='text-red-600 mt-1'>
                    {errors.map((error, index) => 
                        <li key={index} className='text-xs font-semibold flex gap-2 items-center'>
                            <FaCircleXmark /> 
                            {error}
                        </li>
                    )}
                </ul>
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