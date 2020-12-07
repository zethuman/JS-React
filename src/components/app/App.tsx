import React, { useState } from 'react';
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
import { ContextIsLoggedIn } from '../contexts/context-is-logged-in';
import { ContextUsername } from '../contexts/context-username';


const initUsers: User[] = []

export default function App() {

  const onChange = (user: User) => {
    setUser([...users, user]);
  }

  const onUserChange = (newUser: User) => {
    setActiveUser(newUser);
  }

  const [users, setUser] = useState(initUsers);
  const [activeUser, setActiveUser] = useState({name: '', email: '', password: ''});

  /*Context*/
  

  return (
    <>
      <ContextIsLoggedIn.Provider value={sessionStorage.getItem('isLoggedIn') || '{}'}>
        <ContextUsername.Provider value={sessionStorage.getItem('username') || '{}'}>
          <Router>
            <NavBar initUser={activeUser}/>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route exact path='/categories' component={Categories} />
              <Route exact path='/categories/:category_id' component={CategoriesDetail} />
              <Route exact path='/products' component={Products} />
              <Route exact path='/products/:product_id' component={ProductDetails} />
              <Route exact path='/categories/products/:product_id' component={ProductDetails} />
              <Route exact path='/sign-up' render={(props) => (<SignUp {...props} onChange = {onChange} />)} />
              <Route exact path='/login' render={(props) => (<Login {...props} initUser={users}  onUserChange={onUserChange} />)}  />
            </Switch>
          </Router>
          </ContextUsername.Provider>
        </ContextIsLoggedIn.Provider>
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

