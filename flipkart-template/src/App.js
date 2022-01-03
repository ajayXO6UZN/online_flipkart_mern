import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './containers/HomePage';
import OfferStore from './containers/OfferStore';
import ProductPage from './containers/ProductPage';
import ViewCart from './containers/ViewCart';
import LoginPage from './containers/LoginPage';
import Checkout from './containers/Checkout';
import MultipleSelect from './containers/MultipleSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from './actions/productAction';
import { getAllSlider } from './actions/sliderAction';
import { getAllCategory } from './actions/category.action';
import ProductList from './containers/ProductListPage/ProductList';
import ProductStore from './containers/ProductListPage/ProductStore';
import ProductListSlider from './containers/ProductListPage/ProductListSlider';
import ProductListPage from './containers/ProductListPage';
import { loadUser } from './actions/userAction';
import { getCartItems } from './actions/cart.action';
import Payment from './containers/Payment/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from './helpers/axios';
import store from "./store";
import Search from './containers/Search/Search';


function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllProduct());
    dispatch(getAllSlider());
    dispatch(getAllCategory());
    dispatch(getCartItems());
  

  }, []);

  return (
    <>
      <Router>

    
      
          <Switch>
         
        
            <Route path='/' exact component={HomePage} />
            <Route path='/offer-store'  component={OfferStore} />
            <Route  path="/:productSlug/:productId/p"  component={ProductPage} />
            <Route path='/viewcart'  component={ViewCart} />

            <Route path='/loginpage'  component={LoginPage} />
            <Route path='/checkout'  component={Checkout} />
            <Route path='/select'  component={MultipleSelect} />

            {/* <Route path='/productlist'  component={ProductList} />
            <Route path='/productstore'  component={ProductStore} />
            <Route path='/listslider'  component={ProductListSlider} /> */}

            <Route path="/:slug" component={ProductListPage} />
            <Route path="/search" component={ProductListPage} />
            
            <Route  path="/:slug/:deal"  component={ProductListPage} />
          </Switch>
      </Router>

    </>
  );
}

export default App;
