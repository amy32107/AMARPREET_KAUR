import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets'; // Make sure assets is properly imported and available
import { Link as ScrollLink } from 'react-scroll';
import { StoreContext } from '../../context/storecontext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { cartItems, token, setToken } = useContext(StoreContext);

  const cartHasItems = Object.values(cartItems).some(quantity => quantity > 0);
   const navigate = useNavigate();
  const isHomePage = window.location.pathname === '/';
  const logout = () => {
    localStorage.removeItem("token");  // Remove token from localStorage
    setToken("");  // Clear token from context/state
    navigate("/");  // Navigate to home page or login page
  };
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>
      <ul className="navbar-menu">
        {isHomePage ? (
          <ScrollLink to="home" smooth={true} duration={500} className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
            home
          </ScrollLink>
        ) : (
          <Link to="/" className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
            home
          </Link>
        )}
        <ScrollLink to="explore-menu" smooth={true} duration={500} className={menu === "explore-menu" ? "active" : ""} onClick={() => setMenu("explore-menu")}>
          menu
        </ScrollLink>
        <ScrollLink to="app-download" smooth={true} duration={500} className={menu === "app-download" ? "active" : ""} onClick={() => setMenu("app-download")}>
          mobile-app
        </ScrollLink>
        <ScrollLink to="footer" smooth={true} duration={500} className={menu === "footer" ? "active" : ""} onClick={() => setMenu("footer")}>
          contact us
        </ScrollLink>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
          {cartHasItems && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
