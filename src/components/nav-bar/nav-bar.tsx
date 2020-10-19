import React, { ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css';
import '../app/App.css'
import { User } from '../../modules/user';

interface Props{
  isLoggedIn: boolean;
  initUser: User;
}

function Navbar({isLoggedIn, initUser}: Props): ReactElement {
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
              WC
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
                  to='/categories'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Categories
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/products'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
              </li>
              {isLoggedIn ? (
                  <li className='nav-item'>
                  <Link
                      to='/'
                      className='nav-links'
                      onClick={closeMobileMenu}
                    >
                     <i className="fas fa-user"></i>
                     <h5>{initUser['name']}</h5> 
                    </Link>
                  </li>
              ): (<li className='nav-item'>
              <Link
                  to='/login'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Log in
                </Link>
              </li>)}
            </ul>
            {/* {button && <Button buttonStyle='btn--outline' buttonSize=' '>Log in</Button>} */}
            {/* {button && <Button buttonStyle='btn--outline' buttonSize=' '>SIGN UP</Button>} */}
          </div>
        </nav>
      </>
    );
  }
  
  export default Navbar;
