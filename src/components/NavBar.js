import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container"> 
            <Link className="navbar-brand" to="/">Home</Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link active" to="/blogs">Blogs</Link>
                </li>
            </ul>
            </div>
        </nav>

    );
};

export default NavBar;