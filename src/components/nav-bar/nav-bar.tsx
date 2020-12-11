import gsap from "gsap";
import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "../app/App.css";
import { ContextUsername } from "../contexts/context-username";
import { Logged } from "../reducers/LoggedReducer";
import Search from "../search/search";
import "./nav-bar.css";

function Navbar(): ReactElement {
  const [products, setProducts] = useState<any[]>([]);
  const [term, setTerm] = useState("");

  const isLogged = useSelector((state: any) => state.logged);
  const username = useContext(ContextUsername);
  const dispatch = useDispatch();

  const headRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("products");
      console.log(result.data);
      setProducts([...result.data]);
    }

    fetchData();
  }, []);

  const results = products
    .filter((val) => {
      if (val.text.toLowerCase().includes(term.toLowerCase())) {
        return val.text;
      }
    })
    .map((val, key) => {
      return val.text;
    });

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
  const handleLogOut = () => {
    dispatch({ type: Logged.SIGN_OUT });
    console.log("logout");
  };
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container" ref={headRef}>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            WC
            <i className="fab fa-typo3 logo_icon" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <div className="search_bar">
            <input
              className="search_input"
              type="lol"
              placeholder="Search..."
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="nav-links" onClick={closeMobileMenu}>
                Upload
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/categories"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            {isLogged === true ? (
              <li className="nav-item log1" ref={headRef}>
                <Link to="/" className="nav-links" onClick={handleLogOut}>
                  <i className="fas fa-user log1"></i>
                  <br />
                  <h5 className="name log1" ref={headRef}>
                    {username}
                  </h5>
                  <h5 className="name log2" ref={headRef}>
                    Log Out
                  </h5>
                </Link>
              </li>
            ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Log in
                </Link>
                </li>
              )}
          </ul>
        </div>
        <div><Search products={products} term={term} /></div>
      </nav>
    </>
  );
}

export default Navbar;
