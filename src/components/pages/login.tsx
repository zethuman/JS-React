import React, { ReactElement, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { User } from '../../modules/user';


interface Props{
    initUser: User[];
    onUserChange: (newUser: User) => void;
}


export default function Login(props: Props): ReactElement{

    // const handleIs = (newIs: string) => {
    //     props.onIsChange(newIs);
    // }

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
                // handleIs('welcome')
            }
        })
    }

    return(
        <form className='mar'>
            <input type="text" placeholder='Email' className= 'item-add-form d-flex' onChange={e => setEmail(e.target.value)}/>
            <br/>
            <input type="text" placeholder='Password' className= 'item-add-form d-flex' onChange={e => setPassword(e.target.value)}/>
            <br/>
            <Link to={'/welcome'}><button className="btn btn-outline-secondary mar-top" onClick={onSubmit}>Login</button></Link>
            <Link to={'/'}><button className="btn btn-outline-secondary mar-top mar-left" >Cancel</button></Link>
        </form>
    )
}
