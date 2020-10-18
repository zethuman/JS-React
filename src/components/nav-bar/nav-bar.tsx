import React, { ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css';
import '../app/App.css'

function Navbar(): ReactElement {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    window.addEventListener('resize', showButton);

    useEffect(()=>{
        showButton()
    }, [])
  
    return (
      <>
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              TRVL
              <i className='fab fa-typo3' />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/services'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/services'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
              </li>
              <button className='nav-item'>
              <Link
                  to='/login'
                  className='btn'
                  onClick={closeMobileMenu}
                >
                  Log in
                </Link>
              </button>
              <button className='nav-item'>
              <Link
                  to='/sign-up'
                  className='btn'
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </button>
            </ul>
            {/* {button && <Button buttonStyle='btn--outline' buttonSize=' '>Log in</Button>} */}
            {/* {button && <Button buttonStyle='btn--outline' buttonSize=' '>SIGN UP</Button>} */}
          </div>
        </nav>
      </>
    );
  }
  
  export default Navbar;
