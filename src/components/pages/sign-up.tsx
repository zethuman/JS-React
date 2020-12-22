import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import axios from "../api/axios";
import classes from "./login.module.css";

export default function Registration() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const headRef = useRef(null);
  const textRef = useRef(null);

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

  const inputText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputText.current?.focus();
  }, []);

  const validateName = (name: string) => {
    if (validator.isEmpty(name)) {
      setError("empty_name");
      return false;
    } else {
      return true;
    }
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
    } else {
      if (validator.isEmail(email)) {
        return true;
      } else {
        setError("incorrect_email");
        return false;
      }
    }
  };

  async function onSubmit() {
    let passwordValid = validatePassword(password) ? password : "notpassword";
    let emailValid = validateEmail(email) ? email : "notemail";
    let nameValid = validateName(name) ? name : "notname";
    const newUser = {
      name: nameValid,
      email: emailValid,
      password: passwordValid,
    };
    console.log(newUser);
    if (
      passwordValid === "notpassword" ||
      emailValid === "notemail" ||
      nameValid === "notname"
    ) {
      console.log("Error");
    } else if (
      passwordValid !== "notpassword" &&
      emailValid !== "notemail" &&
      nameValid !== "notname"
    ) {
      const result = await axios.post("users", newUser).then((resp) => {
        console.log(resp.data);
        history.push("/login");
      });
      // console.log(result);
      setError("success");
      sessionStorage.setItem("username", nameValid);
    }
  }

  return (
    <div ref={headRef}>
      <div className={classes.sidenav}>
        <div className={classes.login_main_text} ref={textRef}>
          <h2>
            Application
            <br /> Signup Page{" "}
          </h2>
        </div>
      </div>
      <div className={classes.main}>
        <div className="col-md-6 col-sm-12">
          <div className={classes.login_form}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control input-requirements"
                  ref={inputText}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className={classes.error}>
                  <p>{error === "empty_name" ? "Name can't be empty" : null}</p>
                </span>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="error">
                  <p>
                    {error === "empty_email" ? "Email can't be empty" : null}
                  </p>
                </span>
                <span className={classes.error}>
                  <p>
                    {error === "incorrect_email"
                      ? "Email must contain @ like example@example.com"
                      : null}
                  </p>
                </span>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className={classes.error}>
                  <p>
                    {error === "empty_password"
                      ? "Password can't be empty"
                      : null}
                  </p>
                </span>
                <span className={classes.error}>
                  <p>
                    {error === "incorrect_password"
                      ? "Password must contain more than 6 symbols"
                      : null}
                  </p>
                </span>
                <span className={classes.success}>
                  <p>
                    {error === "success"
                      ? "You are successfully Signed Up go to "
                      : null}
                    {error === "success" ? (
                      <Link to={"/login"}>
                        <span className={classes.success}>Login page</span>
                      </Link>
                    ) : null}
                  </p>
                </span>
              </div>
              <button type="submit" className={classes.btn_black} onClick={onSubmit}>
                Sign Up
              </button>
              <Link to={"/"}>
                <button className={classes.btn_secondary}>Cancel</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
