import React, { ReactElement, useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css';
import '../app/App.css'
import { User } from '../../modules/user';
import gsap from 'gsap'
import { ContextIsLoggedIn } from '../contexts/context-is-logged-in';
import { ContextUsername } from '../contexts/context-username';

interface Props{
  initUser: User;
  onLoggedOut: any;
}

function Navbar({onLoggedOut}: Props): ReactElement {

  const isLoggedIn = useContext(ContextIsLoggedIn);
  const username = useContext(ContextUsername);

  const headRef = useRef(null);

  useEffect(() => {
      gsap.from(headRef.current, {duration: 1, autoAlpha: 0, ease: 'none', delay: 0.1})
  }, [headRef])

    const [click, setClick] = useState(false);
  
    const handleClick = () => setClick(!click);
    const handleLogOut = () => { 
      onLoggedOut = false;
      sessionStorage.removeItem('isLoggedIn')
      sessionStorage.removeItem('username')
      console.log('logout')
      window.location.reload();
    }
      const closeMobileMenu = () => setClick(false);
  
    
   
    return (
      <>
        <nav className='navbar' >
          <div className='navbar-container' ref={headRef}>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              WC
              <i className='fab fa-typo3' />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'} >
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
              {isLoggedIn === 'true' ? (
                  <li className='nav-item log1' ref={headRef}>
                  <Link
                      to='/'
                      className='nav-links'
                      onClick={handleLogOut}
                    >
                          <i className="fas fa-user log1"></i>
                          <br/>
                          <h5 className="name log1" ref={headRef}>{username}</h5> 
                          <h5 className="name log2" ref={headRef}>Log Out</h5>
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
