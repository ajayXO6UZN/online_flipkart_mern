import axios from "../helpers/axios";
import {
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAILURE
} from "../constants/categoryConstants";

// Get All category
export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`/api/getCategory`);

        if (res.status === 200) {
            const { categoryList } = res.data;


            dispatch({
                type: GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: GET_ALL_CATEGORIES_FAILURE,
                payload: res.data.error
            });
        }

    }
}