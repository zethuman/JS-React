import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { User } from '../../modules/user';
import './login.css';


interface Props{
    initUser: User[];
    onUserChange: (newUser: User) => void;
    onLoggedIn: (isLoggedIn: boolean) => void;
}


export default function Login(props: Props): ReactElement{

    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    // const handleIs = (newIs: string) => {
    //     props.onIsChange(newIs);
    // }
    const onLoggedIn= (isLoggedIn: boolean) => {
        props.onLoggedIn(true);
    }

    const handleUserChange = (newUser: User) => {
        props.onUserChange(newUser);
    }

    const validatePassword = (pass: string) => {
        if(pass == ''){
            alert("Password can't be empty!")
            return false;
        }
        else{
           return true;
        }
    }

    const validateEmail = (email: string) => {
        if(email == ''){
            alert("Email can't be empty")
            return false;
        }
        else {
            return true;
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const onSubmit = () => {
        let passwordValid = validatePassword(password)? password: ' ';
        let emailValid = validateEmail(email) ? email: ' ';
        const newUser = {
            email: emailValid,
            password: passwordValid
        }
        console.log("Logged in")
        props.initUser.forEach(oldUser=>{
            if(oldUser['email'] == newUser['email'] && oldUser['password'] == newUser['password']){
                console.log('I found');
                handleUserChange(oldUser);
                // handleIs('welcome');
                onLoggedIn(true);
            }
            else{
                alert("User not found");
            }
        })
    }

    return(
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>Application<br/> Login Page </h2>
                    <p>Login or Sign Up from here to access.</p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" placeholder='Email' className= 'form-control' onChange={e => setEmail(e.target.value)} ref={emailRef}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="text" placeholder='Password' className= 'form-control' onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <Link to={'/'}><button className="btn btn-black" onClick={onSubmit}>Login</button></Link>
                            <Link to={'/'}><button className="btn btn-secondary" >Cancel</button></Link>
                            <br/>
                            <br/>
                            <h5>Don't have an account?</h5>
                            <br/>
                            <Link to={'/sign-up'}><div>
                                <button className="btn btn-black">Sign Up</button>
                                </div></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}