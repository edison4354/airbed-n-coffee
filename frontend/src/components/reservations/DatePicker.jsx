import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import './custom.css'

const DatePicker = ({value, onChange, handleDateChange, reservation}) => {
    const reservations = useSelector((state) => state.listing.reservations);

    // Process reservations to get all dates that should be disabled
    const disabledDates = useMemo(() => {
        const dates = new Set();
        Object.values(reservations).forEach((reservation) => {
            const currentDate = new Date(reservation.checkIn);
            const endDate = new Date(reservation.checkOut);

            while (currentDate <= endDate) {
                dates.add(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return dates;
    }, [reservations]);

    const handleChange = (newValue) => {
        handleDateChange(newValue)
        onChange(newValue)
    }

    const shouldDisableDate = (date) => {
        return disabledDates.has(date.toISOString().split('T')[0]);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker 
                    value={new Date(value)}
                    onChange={handleChange}
                    disablePast={true}
                    shouldDisableDate={shouldDisableDate}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default DatePicker;
