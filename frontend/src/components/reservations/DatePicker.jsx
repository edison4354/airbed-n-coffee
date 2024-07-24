import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import './custom.css'

const DatePicker = ({value, onChange, handleDateChange}) => {
    const reservations = useSelector((state) => state.listing.reservations);

    const handleChange = (newValue) => {
        handleDateChange(newValue)
        onChange(newValue)
    }

    const shouldDisableDate = (date) => {
        return Object.values(reservations).some(reservation => {
            const checkIn = dayjs(reservation.checkIn);
            const checkOut = dayjs(reservation.checkOut);
            return date.isBetween(checkIn, checkOut, null, '[]');
        });
    };

    
    const dayjsValue = value ? [dayjs(value[0]), dayjs(value[1])] : [null, null];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker 
                value={dayjsValue}
                onChange={handleChange}
                disablePast={true}
                shouldDisableDate={shouldDisableDate}
                slotProps={{
                    textField: {
                        variant: "outlined",
                        error: false, // Explicitly set to false to remove red border
                    }
                }}
                localeText={{ 
                    start: 'Check-in', 
                    end: 'Check-out' 
                }}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
