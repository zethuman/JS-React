import React, { useEffect, useRef, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { User } from '../../modules/user';
import './login.css';
import gsap from 'gsap'

interface Props{
    onChange: (user: User) => void;
}


export default function Registration(props: Props){

    const headRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {duration: 1, autoAlpha: 0, ease: 'none', delay: 0.1})
    }, [headRef])

    useEffect(() => {
        gsap.from(textRef.current, {duration: 1, autoAlpha: 0, ease: 'none'})
    }, [textRef])

    const inputText = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputText.current?.focus()
    }, [])

    const onChange = (user: User) => {
        props.onChange(user)
    }

    const validateName = (name: string) => {
        if(name == ' '){
            alert("Name can't be empty!")
            return false;
        }else {
            return true;
        }
    }

    const validatePassword = (pass: string) => {
        if(pass == ''){
            alert("Password can't be empty!");
            return false;
        }
        else{
            if(pass.length >= 6){
                return true;
            }
            else {
                alert('At least 6 symbols in password! ')
                return false;
            }
        }
    }

    const validateEmail = (email: string) => {
        if(email == ''){
            alert("Email can't be empty");
            return false;
        }
        else {
            let em =  /[@]/;
            if(email.match(em)){
                return true;
            }
            else {
                alert('Email must contain @ ')
                return false;
            }
        }
    }


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e: any) => {
        e.preventDefault();
        let passwordValid = validatePassword(password)? password: ' ';
        let emailValid = validateEmail(email) ? email: ' ';
        let nameValid = validateName(name) ? name: ' ';
        const newUser = {
            name: nameValid,
            email: emailValid, 
            password: passwordValid
        }
        console.log(newUser);
        onChange(newUser);
        sessionStorage.setItem('username', nameValid)
    }

    return(
        <div ref={headRef}>
            <div className="sidenav">
                <div className="login-main-text" ref={textRef}>
                    <h2>Application<br/> Signup Page </h2>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder='Name' className= 'form-control' ref={inputText} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" placeholder='Email' className= 'form-control' onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="text" placeholder='Password' className= 'form-control' onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <button className="btn btn-black" onClick = {onSubmit}>Sign Up</button>
                            <Link to={'/'}><button className="btn btn-secondary" >Cancel</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        // <form className='mar'>
        //     <input type="text" placeholder='Name' className= 'item-add-form d-flex' onChange={e => setName(e.target.value)}/>
        //     <br/>
        //     <input type="text" placeholder='Email' className= 'item-add-form d-flex' onChange={e => setEmail(e.target.value)}/>
        //     <br/>
        //     <input type="text" placeholder='Password' className= 'item-add-form d-flex' onChange={e => setPassword(e.target.value)}/>
        //     <br/>
        //     <button className="btn btn-outline-secondary mar-top" onClick = {onSubmit}>Sign Up</button>
        //     <Link to={'/'}><button className="btn btn-outline-secondary mar-top mar-left" >Cancel</button></Link>
        // </form>
    )
}