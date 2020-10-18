import React, { useState } from 'react';
import './App.css';
import NavBar from '../nav-bar/nav-bar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/home';
import Services from '../pages/servies';
import Products from '../pages/products';
import SignUp from '../pages/sign-up';
import Login from '../pages/login';
import { User } from '../../modules/user';
import Welcome from '../pages/welcome';

const initUsers: User[] = [];

function App() {

  const onChange = (user: User) => {
    setUser([...users, user]);
  }

  const onUserChange = (newUser: User) => {
    setActiveUser(newUser);
  }

  const [users, setUser] = useState(initUsers);
  const [activeUser, setActiveUser] = useState({  name: '', email: '', password: ''});

  return (
    <>
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' exact component={Services} />
          <Route path='/products' exact component={Products} />
          <Route path='/sign-up' render={(props) => (<SignUp {...props} onChange = {onChange} />)} />
          <Route path='/login' render={(props) => (<Login {...props} initUser={users}  onUserChange={onUserChange}/>)}  />
          <Route path='/welcome' render={(props) => (<Welcome {...props} initUser={activeUser}/>)} />
        </Switch>
      </Router>
      <div>
      Users in database:
      {users.map((user, index) => (
                      <li className="list__item" key={index}>
                          <div>{ user.name }</div>
                          <div>{ user.email }</div>
                          <div>{ user.password }</div>
                      </li>
                  ))}
      <br/>
      Users in logged in:
      {initUsers.map((user, index) => (
                      <li className="list__item" key={index}>
                          <div>{ user.name }</div>
                          <div>{ user.email }</div>
                          <div>{ user.password }</div>
                      </li>
                  ))}
      </div>
    </>
  );
}

export default App;
