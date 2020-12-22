import gsap from "gsap";
import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { ContextUsername } from "../contexts/context-username";
import Dropdown from "../dropdown/dropdown";
import ModalLogin from "../modals/modal-login";
import ModalSubmit from "../modals/modal-submit";
import Search from "../search/search";
import UploadImage from "../upload/upload-image";
import classes from './nav-bar.module.css';


function Navbar(): ReactElement {
  const [products, setProducts] = useState<any[]>([]);
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState('');
  const [isOpenSubmit, setIsOpenSubmit] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  // const isLogged = useSelector((state: any) => state.logged);
  const isLogged = sessionStorage.getItem('isLogged' || '{}');
  const username = useContext(ContextUsername);

  const headRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("products");
      console.log(result.data);
      setProducts([...result.data]);
    }

    fetchData();
  }, []);


  useEffect(() => {
    gsap.from(headRef.current, {
      duration: 1,
      autoAlpha: 0,
      ease: "none",
      delay: 0.1,
    });
  }, [headRef]);

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleClickSubmitLogin = () => {
    setIsOpenSubmit(true);
    setIsOpenLogin(true)
  }

  const memoSearch = useMemo(() => {
    return <Search products={products} term={term} ></Search>
  }, [search]
  )

  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.navbar_container} ref={headRef}>
          <Link to="/" className={classes.navbar_logo} onClick={closeMobileMenu}>
            WC
              <i className={`fab fa-typo3 ${classes.logo_icon} ${classes.fa_typo3}`} />
          </Link>
          <div className={classes.menu_icon} onClick={handleClick}>
            <i className={click ? `${classes.fa_times} fas fa-times` : `${classes.fa_bars} fas fa-bars`} />
          </div>
          <div className={classes.search_bar}>
            <input
              className={classes.search_input}
              type="lol"
              placeholder="Search..."
              onChange={(e) => setTerm(e.target.value)}
              onKeyUp={(e) => { if (e.key === 'Enter') { setSearch(term) } }}
            />
          </div>

          <ul className={click ? `${classes.nav_menu} ${classes.active}` : classes.nav_menu}>
            <li className={classes.nav_item}>
              <Link to="/" className={classes.nav_links} onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className={`${classes.nav_item} ${classes.nav_links}`} >
              <button onClick={() => handleClickSubmitLogin()} className={classes.submit_btn}>
                Submit photo
              </button>
              <div style={{ zIndex: 1 }} className={classes.modal}>
                {isLogged === "true" ?
                  <ModalSubmit open={isOpenSubmit} onClose={() => setIsOpenSubmit(false)}>
                    <div className={classes.info_intro}>
                      <h2 className={classes.h2_info}> Submit to WC</h2>
                    </div>
                    <dl className={classes.dl_info}>
                      <UploadImage onClose={() => setIsOpenSubmit(false)} />
                    </dl>
                  </ModalSubmit > :
                  <ModalLogin open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
                    <dl className={classes.dl_info}>
                      <div className={classes.login_modal}>
                        <span className={`${classes.span_modal} ${classes.text}`}>Please,</span>
                        <Link to="/login" className={classes.text_link} onClick={() => setIsOpenLogin(false)}>
                          Log in
                        </Link>
                        <span className={`${classes.span_modal} ${classes.text}`}>first to submit</span>
                      </div>
                    </dl>
                  </ModalLogin>
                }
              </div>
            </li>
            <li className={classes.nav_item}>
              <Link
                to="/categories"
                className={classes.nav_links}
                onClick={closeMobileMenu}
              >
                Categories
              </Link>
            </li>
            <li className={classes.nav_item}>
              <Link
                to="/products"
                className={classes.nav_links}
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li className={classes.nav_item}>
              <Link
                to="/popular"
                className={classes.nav_links}
                onClick={closeMobileMenu}
              >
                Popular
              </Link>
            </li>
            {isLogged === 'true' ? (
              <li className={`${classes.nav_item} ${classes.log1}`} ref={headRef} onClick={() => setIsOpenProfile(!isOpenProfile)}>
                <i className={`fas fa-user ${classes.nav_links}`}>
                  <h5 className={classes.name} ref={headRef}>
                    {username}
                  </h5>
                </i>
                {isOpenProfile && (<Dropdown />)}
              </li>
            ) : (
                <li className={classes.nav_item}>
                  <Link
                    to="/login"
                    className={classes.nav_links}
                    onClick={closeMobileMenu}
                  >
                    Log in
                </Link>
                </li>
              )}
          </ul>
        </div>
        {/* <div><Search products={products} term={term} /></div> */}
        <div>{memoSearch}</div>
      </nav>
    </>
  );
}

export default Navbar;
