import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { User } from '../../modules/user';
import axios from "../api/axios";
import CategoriesDetail from '../categories-detail/categories-detail';
import { ContextIsLoggedIn } from '../contexts/context-is-logged-in';
import { ContextUsername } from '../contexts/context-username';
import NavBar from '../nav-bar/nav-bar';
import Categories from '../pages/categories';
import Home from '../pages/home';
import Login from '../pages/login';
import Products from '../pages/products';
import SignUp from '../pages/sign-up';
import ProductDetails from '../products-detail/product-details';
import UploadImage from '../upload/upload-image';
import './App.css';


const initUsers: User[] = []

export default function App() {

  const [users, setUsers] = useState(initUsers);
  // const [username, setUsername] = useState<any[]>([]);
  const [activeUser, setActiveUser] = useState({ email: '', password: '' });

  const onUserChange = (newUser: User) => {
    setActiveUser(newUser);
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('users');
      console.log(users);
      setUsers([...result.data]);
      console.log(result.data)
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await axios.get(`users/email_like${activeUser['email']}`);
  //     // console.log(result.data.name);
  //     setUsername([result.data]);
  //     console.log(result.data)
  //   }

  //   fetchData();
  // }, []);

  //   const cursor = document.querySelector('.cursor')
  //   document.addEventListener('mousemove', e => {
  //   cursor?.setAttribute("style", "top: "+(e.pageY - 18)+"px; left: "+(e.pageX -18)+"px; ")
  // })


  return (
    <>
      <ContextIsLoggedIn.Provider value={sessionStorage.getItem('isLogged') || '{}'}>
        <ContextUsername.Provider value={sessionStorage.getItem('username') || '{}'}>
          <Router>
            <NavBar />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route exact path='/categories'  >
                <Categories fetchUrl="categories" />
              </Route>
              <Route exact path='/upload' component={UploadImage} />
              <Route exact path='/categories/:category_id' >
                <CategoriesDetail fetchUrl="products" />
              </Route>
              <Route exact path='/products' >
                <Products fetchUrl="products" />
              </Route>
              <Route exact path='/products/:product_id'  >
                <ProductDetails fetchUrl="products" />
              </Route>
              <Route exact path='/categories/products/:product_id'>
                <ProductDetails fetchUrl="products" />
              </Route>
              <Route exact path='/sign-up' render={(props) => (<SignUp />)} />
              <Route exact path='/login' render={(props) => (<Login {...props} initUser={users} onUserChange={onUserChange} />)} />
            </Switch>
          </Router>
        </ContextUsername.Provider >
      </ContextIsLoggedIn.Provider>
      {/* <div className="cursor"></div> */}
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
      {users.map((user, index) => (
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
