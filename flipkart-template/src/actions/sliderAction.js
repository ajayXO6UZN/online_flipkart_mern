import axios from "../helpers/axios";
import {
  ALL_PRODUCT_SLIDER_REQUEST,
  ALL_PRODUCT_SLIDER_SUCCESS,
  ALL_PRODUCT_SLIDER_FAIL,
 
} from "../constants/sliderConstants";

// Create Product
// export const createSlider = (productData) => async (dispatch) => {
//   try {
//     console.log(productData)
//     dispatch({ type: NEW_PRODUCT_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.post(
//       `/api/products`,
//       productData,
//       config
//     );

//     dispatch({
//       type: NEW_PRODUCT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_PRODUCT_FAIL,
//       payload: error.response.data.message,

//     });
//   }
// };


// // Create Bulk Product
// export const createBulkProduct = (productData) => async (dispatch) => {
//   try {
//     console.log(productData)
//     dispatch({ type: NEW_BULK_PRODUCT_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.post(
//       `/api/addBulkProduct`,
//       productData,
//       config
//     );

//     dispatch({
//       type: NEW_BULK_PRODUCT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_BULK_PRODUCT_FAIL,
//     //  payload: error.response.data.message,

//     });
//   }
// };




// Get All Products For Admin
export const getAllSlider = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_SLIDER_REQUEST });

    const { data } = await axios.get("/api/getalldeals");

    dispatch({
      type: ALL_PRODUCT_SLIDER_SUCCESS,
      payload: data,

    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_SLIDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Update Product
// export const updateProduct = (productData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PRODUCT_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.post(
//       `/api/updateProduct`,
//       productData,
//       config
//     );

//     dispatch({
//       type: UPDATE_PRODUCT_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PRODUCT_FAIL,
//       //  payload: error.response.data.message,
//     });
//   }
// };

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
// export const deleteProduct = (payload) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_PRODUCT_REQUEST });
// console.log(payload)
//     const { data } = await axios.delete(`/api/deleteProduct`,{
//       data: { payload },
//     });

//     dispatch({
//       type: DELETE_PRODUCT_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };