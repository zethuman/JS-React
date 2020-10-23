import React, { useEffect, useRef, useState } from 'react';
import { createContext } from 'react';
import './App.css';
import NavBar from '../nav-bar/nav-bar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../pages/home';
import Products from '../pages/products';
import SignUp from '../pages/sign-up';
import Login from '../pages/login';
import { User } from '../../modules/user';
import Categories from '../pages/categories';
import CategoriesDetail from '../categories-detail/categories-detail';
import ProductDetails from '../products-detail/product-details';
import {Context} from '../contexts/context';


const initUsers: User[] = []

export default function App() {

  const onChange = (user: User) => {
    setUser([...users, user]);
  }

  const onLoggedIn = () =>{
    setIsLoggedIn(true)
  }

  const onLoggedOut = () => {
    setIsLoggedIn(false);
  }

  const onUserChange = (newUser: User) => {
    setActiveUser(newUser);
  }

  const [users, setUser] = useState(initUsers);
  const [activeUser, setActiveUser] = useState({name: '', email: '', password: ''});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*Context*/
  

  return (
    <>
      <Context.Provider value={activeUser['name']}>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} onLoggedOut={onLoggedOut} initUser={activeUser}/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route exact path='/categories' component={Categories} />
          <Route exact path='/categories/:category_id' component={CategoriesDetail} />
          <Route exact path='/products'  component={Products} />
          <Route exact path='/products/:product_id' component={ProductDetails} />
          <Route exact path='/categories/products/:product_id' component={ProductDetails} />
          <Route path='/sign-up' render={(props) => (<SignUp {...props} onChange = {onChange} />)} />
          <Route path='/login' render={(props) => (<Login {...props} initUser={users}  onUserChange={onUserChange} onLoggedIn={onLoggedIn}/>)}  />
        </Switch>
      </Router>
      </Context.Provider>
      {/* <div>
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
      </div> */}
    </>
  );
}

