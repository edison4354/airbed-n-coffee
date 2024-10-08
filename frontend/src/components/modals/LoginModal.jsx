import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModal } from '../../store/modal';
import * as sessionActions from '../../store/session';
import Modal from './Modal';

const LoginModal = () => {
    const dispatch = useDispatch();
    const isLoginOpen = useSelector((state) => state.modal.isLoginOpen);
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const onClose = () => {
        dispatch(closeLoginModal());
    }

    useEffect(() => {
        if (sessionUser) {
            dispatch(closeLoginModal())
        }
    }, [dispatch, sessionUser]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
          .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }

            // Check if unauthorized error (typically 401)
            if (res.status === 401) {
                setErrors(["Incorrect username or password"]);
            } else if (data?.errors) {
                setErrors(data.errors);
            } else if (data) {
                setErrors([data]);
            } else {
                setErrors([res.statusText]);
            }
          });
    };

    const hanndleDemoUserLogin = () => {
        dispatch(sessionActions.login({ email: "demo@user.io", password: "password" }))
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
                <ul className='text-red-600'>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
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
                    Log In
                </button>
            </form>
            <button 
                className='flex justify-center items-center bg-gray-400 text-white px-4 py-3.5 rounded-lg font-medium hover:opacity-80 w-full'
                onClick={hanndleDemoUserLogin}
            >
                <p>Log in as Demo User</p>
            </button>
        </div>
    )

    return (
        <Modal 
            isOpen={isLoginOpen}
            title="Welcome back"
            onClose={onClose}
            body={bodyContent}
        />
    )
}

export default LoginModal;