import React, { useState } from 'react';
import Header from '../../components/Header';
import './style.css';
import assured from "../../images/assured.png";
import info from "../../images/info.svg";
import location from "../../images/location.svg";
import big from "../../images/big.jpeg";
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeCartItem } from '../../actions/cart.action';
import { NavLink } from 'react-router-dom';

const ViewCart = () => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const { getCarts, numofcart } = useSelector(state => state.cart);

    var totalPrice = 0, discount, discountPrice = 0, totalComparePrice = 0;
    //console.log(getCarts[0] && getCarts[0].cartItems)
    {
        getCarts[0] && getCarts[0].cartItems.map((item, index) => {
            discount = item.product.comparePrice - item.product.price
            discountPrice = discountPrice + discount
            totalPrice = totalPrice + item.product.price
            totalComparePrice = totalComparePrice + item.product.comparePrice
        })
    }

    const cartIncCount = (_id, quantityData) => {
        console.log(_id)

        dispatch(addToCartAction(_id, quantityData + 1))

    }
    const cartDecCount = (_id, quantityData) => {
        console.log(_id)
        if(quantityData == 0){
            dispatch(addToCartAction(_id, 0))
        }else{
            dispatch(addToCartAction(_id, quantityData - 1))
        }
       

    }

    const handleRemoveCartItem = (payload) => {
       // console.log(product_id)
       const data={
            payload
        }
        // setCount(quantityData+1)
        dispatch(removeCartItem(data))

    }

    return (
        <>

            <Header />
            <div className='root_cart_width' style={{ 'margin-bottom': '16px' }} >
                <div className='cart_container'>
                    <div className='root_cart'>
                        <div className='root_my_cart'>
                            <div className='my_cart'>
                                <h3>My Cart ({numofcart})</h3>
                            </div>
                            <div className='deliver_to'>
                                <img src={location} alt='not available' />
                                <span className='del_to'>Deliver to</span>
                                <div style={{ margin: '10px 12px' }}>
                                    <span className='del_pincode'>Enter delivery pincode</span>
                                    <span className='del_check'>Check</span>
                                </div>
                            </div>
                        </div>
                        {getCarts[0] && getCarts[0].cartItems.map((item, index) => (
                            <>

                                <div className='add_to_cart_pro'>
                                    <div className='bread_pro'>
                                        <div className='pro_img' style={{ height: '112px', width: '112px' }}>
                                            <img src={item.product.images && item.product.images[0].url} alt='not avilable' />
                                        </div>
                                        <div className='product_info'>
                                            <div className='product_details_root'>
                                                <div className='pro_heading'>
                                                    <h1 className='heading1'>{item.product.name}</h1>
                                                </div>
                                                <div style={{ display: 'flex', 'margin-top': '8pX' }}>
                                                    <div>

                                                        <span className='rating_rewies'>Seller:{item.product.brand}</span>
                                                    </div>
                                                    <span><img src={assured} style={{ height: '15px', margin: '3px 0 0 10px' }} alt='not avalable' /></span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', 'padding-top': '12px' }}>
                                                <div >
                                                    <span className='exact_money'>₹{item.product.price}</span>
                                                    <span className='extra_money'>₹{item.product.comparePrice}</span>
                                                    <span className='percent_off'>{Math.round((item.product.comparePrice - item.product.price) / item.product.comparePrice * 100)}% off</span>
                                                </div>
                                                <div className='info_btn'><img src={info} alt='' /></div>
                                            </div>
                                        </div>
                                        <div className='root_delivery'>
                                            <div className='del_date'>
                                                Delivery by Sun Sep 26 |

                                                <span className='del_free'> Free</span>
                                                <span className='paise'>₹40</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='increase_pro' style={{ 'padding-top': '10px' }}>
                                    <div className='inc_by_quant'>
                                                            <button onClick={() => cartDecCount(item.product._id, item.quantity)} className='negative'>-</button>
                                                            <div className='inc_box'>
                                                                <input type='text' value={item.quantity} className='quat_box'></input>
                                                            </div>
                                                            <button onClick={() => cartIncCount(item.product._id, item.quantity)} className='positive'>+</button>
                                                        </div>
                                        <div className='save_for_later'>
                                            <span  className='save_later'>Save For Later</span>
                                            <span onClick={() => handleRemoveCartItem(item.product._id)} className='save_later'>Remove</span>
                                        </div>
                                    </div>

                                </div>
                            </>
                        ))}

                        <div className='place_order'>
                            <NavLink to={'/checkout'}>
                                <button style={{ cursor: 'pointer' }}>PLACE ORDER</button>
                            </NavLink>

                        </div>
                    </div>
                    <div className='price_details'>
                        <div className='pad_price'>
                            <div className='price_det'>PRICE DETAILS</div>
                            <div className='discount'>
                                <div className='flex_between margin_detail'>
                                    <span className='price_item'>Price ({numofcart} item)</span>
                                    <span>₹{totalComparePrice}</span>
                                </div>
                                <div className='flex_between margin_detail'>
                                    <span className='price_item'>Discount</span>
                                    <span className='green_pro'>− ₹{discountPrice}</span>
                                </div>
                                <div className='flex_between margin_detail'>
                                    <span className='price_item'>Delivery Charges</span>
                                    <span className='green_pro'>FREE</span>
                                </div>
                            </div>
                            <div className='flex_between margin_detail' style={{ padding: '0 24px' }}>
                                <span className='price_item'>Total Amount</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className='green_pro killer' >You will save ₹{discountPrice} on this order</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewCart