import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    
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
                        <>
                            <MenuItem 
                                onClick={() => {}}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="Sign up"
                            />
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu;