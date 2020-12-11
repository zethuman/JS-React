import gsap from "gsap";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import { User } from "../../modules/user";
import { Logged } from "../reducers/LoggedReducer";
import "./login.css";

interface Props {
  initUser: User[];
  onUserChange: (newUser: User) => void;
}

export default function Login(props: Props): ReactElement {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const headRef = useRef(null);
  const textRef = useRef(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    gsap.from(headRef.current, {
      duration: 1,
      autoAlpha: 0,
      ease: "none",
      delay: 0.1,
    });
  }, [headRef]);

  useEffect(() => {
    gsap.from(textRef.current, { duration: 1, autoAlpha: 0, ease: "none" });
  }, [textRef]);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleUserChange = (newUser: User) => {
    props.onUserChange(newUser);
  };

  const validatePassword = (pass: string) => {
    if (validator.isEmpty(pass)) {
      setError("empty_password");
      return false;
    } else {
      if (pass.length >= 6) {
        return true;
      } else {
        setError("incorrect_password");
        return false;
      }
    }
  };

  const validateEmail = (email: string) => {
    if (validator.isEmpty(email)) {
      setError("empty_email");
      return false;
    } else if (validator.isEmail(email) === false) {
      setError("incorrect_email");
    } else {
      return true;
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    let passwordValid = validatePassword(password) ? password : " ";
    let emailValid = validateEmail(email) ? email : " ";
    const newUser = {
      email: emailValid,
      password: passwordValid,
      isLogged: true,
    };

    props.initUser.find((user) => {
      if (user.email === newUser.email && user.password === newUser.password) {
        history.push("/");
        console.log("Logged in");
        handleUserChange(user);
        dispatch({ type: Logged.SIGN_IN });
        sessionStorage.setItem("username", user.name);
        setError("success");
        return true;
      } else {
        setError("not_found");
      }
    });
  };

  return (
    <div ref={headRef}>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>
            Application
            <br /> Login Page{" "}
          </h2>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                  required
                />
                <span className="error">
                  <p>
                    {error === "empty_email" ? "Email can't be empty" : null}
                  </p>
                </span>
                <span className="error">
                  <p>
                    {error === "incorrect_email"
                      ? "Email must contain @ like example@example.com"
                      : null}
                  </p>
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="error">
                  <p>
                    {error === "empty_password"
                      ? "Password can't be empty"
                      : null}
                  </p>
                </span>
                <span className="error">
                  <p>
                    {error === "incorrect_password"
                      ? "Password must contain more than 6 symbols"
                      : null}
                  </p>
                </span>
                <span className="success">
                  <p>
                    {error === "success"
                      ? "You are successfully Logged In, go to "
                      : null}
                    {error === "success" ? (
                      <Link to={"/"}>
                        <span className="success"> Home page</span>
                      </Link>
                    ) : null}
                  </p>
                </span>
                <span className="notfound">
                  <p>
                    {error === "not_found"
                      ? "Your email or password is incorrect. Please try again "
                      : null}
                  </p>
                </span>
              </div>
              <button type="submit" className="btn-black" onClick={onSubmit}>
                Login
              </button>
              <Link to={"/"}>
                <button className="btn-secondary">Cancel</button>
              </Link>
              <br />
              <br />
              <h5>Don't have an account?</h5>
              <br />
              <Link to={"/sign-up"}>
                <div>
                  <button className="btn-black">Sign Up</button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
