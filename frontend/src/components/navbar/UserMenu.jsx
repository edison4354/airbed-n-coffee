import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { openLoginModal, openRegisterModal } from '../../store/modal';
import * as sessionActions from '../../store/session';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const menuRef = useRef(null);

    const sessionUser = useSelector(state => state.session.user);
    
    useEffect(() => {
        setLoggedIn(!!sessionUser);
        setIsOpen(false);

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [sessionUser, menuRef]);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onLoginOpen = () => {
        setIsOpen(false)
        dispatch(openLoginModal());
    }

    const onRegisterOpen = () => {
        setIsOpen(false)
        dispatch(openRegisterModal());
    }

    const handleLogout = () => {
        navigate('/');
        dispatch(sessionActions.logout());
    };

    const handleTrips = () => {
        setIsOpen(false);
        navigate('/trips');
    }

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={toggleOpen}
                    className="
                            p-4
                            md:py-1
                            md:px-2
                            border-[1px]
                            border-neutral-200
                            flex
                            flex-row
                            items-center
                            gap-3
                            rounded-full
                            cursor-pointer
                            hover:shadow-md
                            transition
                    "
                >
                    <AiOutlineMenu/>
                    <div className='hidden md:block'>
                        <Avatar/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className='
                        absolute
                        rounded-xl
                        shadow-md
                        min-w-60
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    '
                >
                    <div className='flex flex-col cursor-pointer'>
                        {!loggedIn ? (
                            <div>
                                <MenuItem
                                    onClick={onLoginOpen}
                                    label="Login"
                                />
                                <MenuItem 
                                    onClick={onRegisterOpen}
                                    label="Sign up"
                                />
                            </div>
                        ) : (
                            <div>
                                <MenuItem 
                                    onClick={handleTrips}
                                    label="Trips"
                                />
                                <MenuItem
                                    onClick={handleLogout}
                                    label="Logout"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu;