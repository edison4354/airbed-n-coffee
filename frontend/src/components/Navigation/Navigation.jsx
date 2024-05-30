import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Log In</NavLink>
            </>
        );
    }

    return (
        <div className="container">
            <img src="./../../../public/airbnb.png"/>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                    {sessionLinks}
                </li>
            </ul>
        </div>
    );
}
