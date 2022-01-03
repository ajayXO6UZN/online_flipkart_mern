import axios from "../helpers/axios";
import {
  SEARCH_REQUEST_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  GET_PRODUCT_PAGE_REQUEST,
  GET_PRODUCT_PAGE_SUCCESS,
  GET_PRODUCT_PAGE_FAILURE,
  GET_PRODUCTS_BY_SLUG,
  GET_PRODUCT_DETAILS_BY_ID_REQUEST,
  GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
  GET_PRODUCT_DETAILS_BY_ID_FAILURE,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  NEW_ADDRESS_REQUEST,
  NEW_ADDRESS_SUCCESS,
  NEW_ADDRESS_FAIL,
  SEARCH_FAIL,
  SEARCH_REQUEST
} from "../constants/productConstants";
import { getCartItems } from "./cart.action";

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    console.log(productData)
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/products`,
      productData,
      config
    );
    console.log(data)
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,

    });
  }
};

// Get All Products For Admin
export const getAllProduct = () => async (dispatch) => {
  // try {
  //   dispatch({ type: ALL_PRODUCT_REQUEST });

  //   const { data } = await axios.get("/api/getAllProducts");

  //   dispatch({
  //     type: ALL_PRODUCT_SUCCESS,
  //     payload: data.products,
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: ALL_PRODUCT_FAIL,
  //     payload: error.response.data.message,
  //   });
  // }
};

export const getProductPage = (payload) => {
  return async dispatch => {
    try {
      const { cid, type } = payload.params;
      const res = await axios.get(`/api/page/${cid}/${type}`);
      dispatch({ type: GET_PRODUCT_PAGE_REQUEST });
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: GET_PRODUCT_PAGE_SUCCESS,
          payload: { page }
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: GET_PRODUCT_PAGE_FAILURE,
          payload: { error }
        });
      }
    } catch (error) {
      console.log(error)
    }

  }
}


// Update Product
export const updateProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/updateProduct`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      //  payload: error.response.data.message,
    });
  }
};

// export const deleteProductById = (payload) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.delete(`product/deleteProductById`, {
//         data: { payload },
//       });
//       dispatch({ type: DELETE_PRODUCT_REQUEST });
//       if (res.status === 202) {
//         dispatch({ type: DELETE_PRODUCT_SUCCESS });
//         dispatch(getProducts());
//       } else {
//         const { error } = res.data;
//         dispatch({
//           type: DELETE_PRODUCT_FAIL,
//           payload: {
//             error,
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// Delete Product
export const deleteProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    console.log(payload)
    const { data } = await axios.delete(`/api/deleteProduct`, {
      data: { payload },
    });

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductsBySlug = (slug, deal = null, price = [0, 25000], checkedRating = 0, stringData, currentPage = 0) => {
  return async dispatch => {
    console.log(deal)
    var res
    if (deal) {
      res = await axios.get(`/api/products/${slug}?deal_type=${deal}`);

    } else {
      res = await axios.get(`/api/products/${slug}?deal_type=${deal}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${checkedRating}&${stringData}&page=${currentPage}`);

    }
    console.log(res)
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTS_BY_SLUG,
        payload: res.data
      });
    } else {
      // dispatch({
      //     type: 
      // })
    }
  }
}


export const searchBar =
  (keyword = "", price = [0, 25000], checkedRating = 0, stringData = '', currentPage = 0) =>
    async dispatch => {
      try {
        dispatch({ type: SEARCH_REQUEST });
        console.log(price)
        console.log(`api/getAllProducts?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${checkedRating}&${stringData}&page=${currentPage}`)
        let link = `api/getAllProducts?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${checkedRating}&${stringData}&page=${currentPage}`;
        const res = await axios.get(link);


        dispatch({
          type: SEARCH_REQUEST_SUCCESS,
          payload: res.data
        });

      } catch (error) {
        dispatch({
          type: SEARCH_FAIL,
          //   payload: error.response.data.message,
        });
      }
    }


export const getProductDetailsById = (payload) => {
  return async dispatch => {
    dispatch({ type: GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axios.get(`/api/product/${productId}`);
      console.log(res);
      dispatch({
        type: GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product }
      });

    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error }
      });
    }

  }
}

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log(reviewData);
    const { data, status } = await axios.put(`/api/review`, reviewData, config);
    if (status == 200) {
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    }

  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Create address
export const addUserAddress = (shipping_address) => async (dispatch) => {
  const data = {
    shipping_address
  }
  try {
    console.log(data)

    dispatch({ type: NEW_ADDRESS_REQUEST });

    const res = await axios.post(
      `/api/addorupdateuser`,
      data,
    );
    console.log(res.status)
    if (res.status == 200) {
      dispatch(getCartItems());
      dispatch({
        type: NEW_ADDRESS_SUCCESS,
        payload: res,
      });
    }

  } catch (error) {
    dispatch({
      type: NEW_ADDRESS_FAIL,
      // payload: error.response.data.message,

    });
  }
};