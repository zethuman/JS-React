import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { User } from '../../modules/user';
import axios from "../api/axios";
import { ContextUsername } from '../contexts/context-username';
import ErrorBoundary from '../error-page/ErrorBoundary';
// import PageNotFound from '../error-page/pageNotFound';
// import ErrorBoundary from '../error-page/ErrorBoundary';
// import PageNotFound from '../error-page/pageNotFound';
import NavBar from '../nav-bar/nav-bar';
import Home from '../pages/home';
// import Categories from '../pages/categories';
// import Home from '../pages/home';
import Login from '../pages/login';
import Popular from '../pages/popular';
// import Products from '../pages/products';
import SignUp from '../pages/sign-up';
// import ProductDetails from '../products-detail/product-details';
// import Profile from '../profile/profile';
// import UploadImage from '../upload/upload-image';


//lazy loading 
const Categories = lazy(() => import("../pages/categories"));
const CategoriesDetail = lazy(() => import("../categories-detail/categories-detail"));
const Products = lazy(() => import("../pages/products"));
const ProductDetails = lazy(() => import("../products-detail/product-details"));
const UploadImage = lazy(() => import("../upload/upload-image"));
const PageNotFound = lazy(() => import("../error-page/pageNotFound"))
const Profile = lazy(() => import('../profile/profile'))

const initUsers: User[] = []

export default function App() {

  const [users, setUsers] = useState(initUsers);
  // const [username, setUsername] = useState<any[]>([]);
  const [activeUserId, setActiveUserId] = useState(0);

  const onUserChange = (newUser: User) => {
    setActiveUserId(newUser.id);
  }

  const fetchData = useCallback(() => {
    axios.get('users').then(result => { console.log([...result.data]); setUsers([...result.data]) });
    // console.log(users);
    // setUsers([...result.data]);
  }, [users]
  )


  useEffect(() => {
    fetchData();
  }, []);


  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  const { id, name } = user;

  return (
    <>
      {/* <ContextIsLoggedIn.Provider value={sessionStorage.getItem('isLogged') || '{}'}> */}
      <ContextUsername.Provider value={name}>
        <Router>
          <NavBar />
          {/* <ErrorBoundary> */}
          <Suspense fallback={<h2>Loading ... </h2>}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/profile' >
                <Profile id={id} />
              </Route>
              <Route exact path='/categories'  >
                <Categories fetchUrl="categories" />
              </Route>
              <Route exact path='/upload' component={UploadImage} />
              <Route exact path='/products' >
                <Products fetchUrl="products" />
              </Route>
              <Route exact path='/popular' >
                <Popular />
              </Route>
              <ErrorBoundary>
                <Route path='/categories/:category_id' >
                  <CategoriesDetail fetchUrl="products" />
                </Route>
                {/* </ErrorBoundary> */}
                {/* <ErrorBoundary> */}
                <Route path='/products/:id' > <ProductDetails /> </Route>
                {/* <ErrorBoundary> */}
                <Route path='/categories/products/:id'>
                  <ProductDetails />
                </Route>

                {/* </ErrorBoundary> */}
                <Route exact path='/sign-up' render={(props) => (<SignUp />)} />
                <Route exact path='/login' render={(props) => (<Login {...props} initUser={users} onUserChange={onUserChange} />)} />
                <Route exact path="*" component={PageNotFound} />
              </ErrorBoundary>
            </Switch>
          </Suspense>
          {/* </ErrorBoundary> */}
        </Router>

      </ContextUsername.Provider >
      {/* </ContextIsLoggedIn.Provider> */}
    </>
  );

}
