import { useDispatch, useSelector } from 'react-redux';
import { closeBookedModal } from '../../store/modal';
import { useNavigate } from 'react-router-dom';

import Modal from './Modal';

const BookedModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isBookedOpen = useSelector((state) => state.modal.isBookedOpen);

    const onClose = () => {
        dispatch(closeBookedModal());
    };

    const handleClick = () => {
        dispatch(closeBookedModal())
        navigate('/trips');
    }

    const bodyContent = (
        <div className="flex flex-col gap-4 text-center">
            <p>We hope you are satisfied with our service. Have a nice trip!</p>
            <button 
                onClick={handleClick}
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
                Done
            </button>
        </div>
    );

    return (
        <Modal
            isOpen={isBookedOpen}
            title="Thanks for your booking!"
            onClose={onClose}
            body={bodyContent}
            disabled={true}
        />
    );
};

export default BookedModal;