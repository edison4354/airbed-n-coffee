import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { openLoginModal, openRegisterModal } from '../../store/modal';
import * as sessionActions from '../../store/session';

const UserMenu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const sessionUser = useSelector(state => state.session.user);
    
    useEffect(() => {
        setLoggedIn(!!sessionUser);
        setIsOpen(false);
    }, [sessionUser]);
    

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onLoginOpen = () => {
        dispatch(openLoginModal());
    }

    const onRegisterOpen = () => {
        dispatch(openRegisterModal());
    }

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };
    
    return (
        <div className="relative">
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
                            <>
                                <MenuItem
                                    onClick={onLoginOpen}
                                    label="Login"
                                />
                                <MenuItem 
                                    onClick={onRegisterOpen}
                                    label="Sign up"
                                />
                            </>
                        ) : (
                            <MenuItem
                                label="Logout"
                                onClick={handleLogout}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu;