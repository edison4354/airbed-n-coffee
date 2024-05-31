import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Container from '../Container';
import Logo from './Logo';
import './Navigation.css';
import UserMenu from './UserMenu';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </div>
    );
  }

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div
                    className='
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    '
                >
                    <Logo />
                    <UserMenu />
                </div>
            </Container>
        </div>
    </div>
  );
}

export default Navigation;