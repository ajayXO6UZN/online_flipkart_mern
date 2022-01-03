import axios from "../helpers/axios";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CART_ITEM_REQUEST,
  GET_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE
} from "../constants/cartConstants";

export const addToCartAction = (productId,quantityData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const payload = {
     cartItems:{ product:productId,quantity:quantityData}
    }
  
      //console.log(payload);
      const res = await axios.post(`/api/addtocart`, payload);
     console.log(res)
     if(res.status === 200){
      dispatch(getCartItems());
     }
      dispatch({
        type: ADD_TO_CART_SUCCESS,
      //  payload: { cartItems },
      });
    }
};

export const getCartItems = (productId) => {
  return async (dispatch) => {
    dispatch({ type: GET_CART_ITEM_REQUEST });
    
     
      const res = await axios.get(`/api/getcartitems`);
    console.log("hello baba" + res)
        const {success,orderItems,getCarts,cartWithoutPopulate,address,numofcart} = res.data;
        dispatch({
          type: GET_CART_ITEM_SUCCESS,
          payload: { 
            success,
            orderItems,
            getCarts,
            cartWithoutPopulate,
            address,
            numofcart },
        });
      
   
    }
};

export const removeCartItem = (payload) => {
  console.log(payload)
  return async (dispatch) => {
    try {
      dispatch({ type: REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post(`/api/removecartitems`, payload );
      if (res.status === 202) {
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: REMOVE_CART_ITEM_FAILURE,
         // payload: { error },
        });
      }
    } catch (error) {
    //  console.log(error);
    }
  };
};