import {
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAILURE
} from "../constants/categoryConstants";

export const getAllCategoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_CATEGORIES_SUCCESS:
            return {
                loading: false,
                // success: action.payload.success,
                categories: action.payload.categories,
            };
        case GET_ALL_CATEGORIES_FAILURE:
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
