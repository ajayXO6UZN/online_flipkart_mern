import {
    ALL_PRODUCT_SLIDER_REQUEST,
    ALL_PRODUCT_SLIDER_SUCCESS,
    ALL_PRODUCT_SLIDER_FAIL
  } from "../constants/sliderConstants";


// export const newProductReducer = (state = { product: {} }, action) => {
//     switch (action.type) {
//       case NEW_PRODUCT_REQUEST:
//         return {
//           ...state,
//           loading: true,
//         };
//       case NEW_PRODUCT_SUCCESS:
//         return {
//           loading: false,
//           success: action.payload.success,
//           product: action.payload.product,
//         };
//       case NEW_PRODUCT_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
//       case NEW_PRODUCT_RESET:
//         return {
//           ...state,                                                                 
//           success: false, 
//         };
//       case CLEAR_ERRORS:
//         return {
//           ...state,
//           error: null,
//         };
//       default:
//         return state;
//     }
//   };
  

  
export const dealSliderReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_SLIDER_REQUEST:
    
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SLIDER_SUCCESS:
      return {
        loading: false,
      //  products: action.payload.products,
      products: action.payload,
      //  productsCount: action.payload.productsCount,
        //resultPerPage: action.payload.resultPerPage,
       // filteredProductsCount: action.payload.filteredProductsCount,
      };

   
    case ALL_PRODUCT_SLIDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


// export const productReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_PRODUCT_REQUEST:
//     case UPDATE_PRODUCT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };

//     case UPDATE_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     case DELETE_PRODUCT_FAIL:
//     case UPDATE_PRODUCT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_PRODUCT_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case UPDATE_PRODUCT_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };


