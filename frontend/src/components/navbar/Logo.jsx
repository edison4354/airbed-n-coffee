import { NavLink } from 'react-router-dom';
import { ReactComponent as AirbnbLogo } from '../../../public/logo.svg'; // Adjust the path as necessary

const Logo = () => {
    return (
        <NavLink to="/">
            <AirbnbLogo />
        </NavLink>
    )
}

export default Logo;