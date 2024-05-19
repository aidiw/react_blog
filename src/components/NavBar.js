import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice';

const NavBar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul className="navbar-nav" style={{flexDirection: 'row'}}>

          <li className="nav-item me-2">
              <button 
                className='text-primary btn btn-link text-decoration-none'
                onClick={()=>{
                  if(isLoggedIn){
                    dispatch(logout());
                  }else {
                    dispatch(login());
                  }
                }}
              >
                {isLoggedIn? 'Logout' : 'Login'}
              </button>
          </li>
          {isLoggedIn ? <li className="nav-item me-2">
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
          </li> : null}
          <li className="nav-item">
            <NavLink className="nav-link" to="/blogs">
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
