import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import './custom.css'

const DatePicker = ({ value, onChange, handleDateChange}) => {
    const handleChange = (newValue) => {
        onChange(newValue);
        handleDateChange(newValue);
     };

    return (
        <div className="p-1">
            <div className='calendar-container'>
                <div className='calendar-header'>
                    <p className='w-1/2 pl-3 -mb-1'>CHECK-IN</p>
                    <p className='w-1/2 pl-3 -mb-1'>CHECKOUT</p>
                </div>
                <DateRangePicker
                    onChange={handleChange}
                    value={value}
                    className='w-full text-[14px] font-light select-none'
                />
            </div>
        </div>
    );
};

export default DatePicker;
