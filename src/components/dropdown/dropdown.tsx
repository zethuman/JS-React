import gsap from "gsap";
import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logged } from "../reducers/LoggedReducer";
import classes from './dropdown.module.css';

interface Props {

}

export default function Dropdown({ }: Props): ReactElement {

    const headRef = useRef(null);
    const dispatch = useDispatch();

    const handleLogOut = useCallback(() => {
        dispatch({ type: Logged.SIGN_OUT });
        console.log("logout");
    }, [dispatch]
    );

    useEffect(() => {
        gsap.from(headRef.current, {
            duration: 1,
            autoAlpha: 0,
            ease: "none",
            delay: 0.1,
        });
    }, [headRef]);


    return (
        <div className={classes.dropdown} >
            <Link to="/profile" className={classes.menu_item}>
                <h5 className={classes.name} ref={headRef}>
                    Profile
                </h5>
            </Link>
            <div className={classes.menu_item} onClick={handleLogOut}>
                <h5 className={classes.name} ref={headRef}>
                    Log Out
            </h5>
            </div>
        </div>
    )
}
