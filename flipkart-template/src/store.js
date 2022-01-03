import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  newProductReducer,
  productsReducer,
  productReducer,
  pageDetailReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  dealSliderReducer
} from "./reducers/sliderReducer";

import {
  cartReducer
} from "./reducers/cartReducer";

import {
  getAllCategoryReducer
} from "./reducers/categoryReducer";

import {
  userReducer,
  allUsersReducer,
  profileReducer
} from "./reducers/userReducer";

const reducer = combineReducers({

  newProduct: newProductReducer,
  products: productsReducer,
  product: productReducer,
  allSlider: dealSliderReducer,
  allCategories: getAllCategoryReducer,
  getPageProduct:pageDetailReducer,
  newReview:newReviewReducer,
  productReviews:productReviewsReducer,
  review:reviewReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  cart:cartReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
