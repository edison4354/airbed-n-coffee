import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <NavLink to="/">
            <img src="../../../public/airbnb.png" alt="Logo"/>
        </NavLink>
    )
}

export default Logo;