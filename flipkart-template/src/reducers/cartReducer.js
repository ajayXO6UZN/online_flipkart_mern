import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    GET_CART_ITEM_REQUEST,
    GET_CART_ITEM_SUCCESS,
    GET_ALL_CART_FAILURE
} from "../constants/cartConstants";

const initState = {
    orderItems:[],
    getCarts: [],
    cartWithoutPopulate:[],
    address:{},
    error: null,
    loading: false,
    success: false,
    numofcart: 0
  };

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CART_ITEM_SUCCESS:
            return {
                loading: false,
                // success: action.payload.success,
                orderItems: action.payload.orderItems,
                getCarts: action.payload.getCarts,
                cartWithoutPopulate:action.payload.cartWithoutPopulate,
                address: action.payload.address,
                success: action.payload.success,
                numofcart: action.payload.numofcart,
            };
        case GET_ALL_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }

    return state;
}
