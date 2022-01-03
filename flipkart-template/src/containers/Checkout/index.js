import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import './style.css';
import TextField from '@mui/material/TextField';
import { FaTruck, FaRegBell, FaRegStar } from "react-icons/fa";
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeCartItem } from '../../actions/cart.action';
import assured from "../../images/assured.png";
import info from "../../images/info.svg";
import location from "../../images/location.svg";
import big from "../../images/big.jpeg";
import { addUserAddress } from '../../actions/productAction';
import { getCartItems } from '../../actions/cart.action';
import Payment from '../Payment/Payment';
import axios from '../../helpers/axios';
import store from '../../store';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { login } from '../../actions/userAction';
import DoneIcon from '@material-ui/icons/Done';

const initialValue = {
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternatephone: '',
}

const useStyles = makeStyles({
    ajay2: {

        width: '100%',
    },
    mult: {

        width: '67%',
    },
    address_field: {
        width: '33%',

    }
});
const Checkout = () => {
    const classes = useStyles();
    const [userAddress, setAddress] = useState(initialValue);

    const [userEmail, setEmail] = useState('');
    const [userPass, setPassword] = useState('');

    const [stripeApiKey, setStripeApiKey] = useState("");

    const [t_price, setTotalPrice] = useState();

    const { getCarts,orderItems, address, numofcart } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        setAddress(address);
    }, [address]);
    
    async function getStripeApiKey() {
        const { data } = await axios.get("/api/stripeapikey");

        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        getStripeApiKey();
    }, []);



    const user = useSelector(state => state.user);
    const addressSuccess = useSelector(state => state.newProduct);
    const successAdd = addressSuccess.success && addressSuccess.success.data.success;
    var totalPrice = 0, discount, discountPrice = 0, totalComparePrice = 0;

    {
        getCarts[0] && getCarts[0].cartItems.map((item, index) => {
            discount = item.product.comparePrice - item.product.price
            discountPrice = discountPrice + discount
            totalPrice = totalPrice + item.product.price
            totalComparePrice = totalComparePrice + item.product.comparePrice
        })
    }

    const { name, phone, pincode, locality, address2, city, state, landmark, alternatephone } = userAddress;
    console.log(userAddress)
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
    const onValueChange = (e) => {
        console.log(e.target.value);
        setAddress({ ...userAddress, [e.target.name]: e.target.value })
    }

    const handleAddUserAddress = async () => {
        dispatch(addUserAddress(userAddress));
      
    }
    const handleDisplay = () => {
        console.log(successAdd)

        if (user.isAuthenticated && successAdd) {
            return 'ckeckout_r_none'
        } else if (user.isAuthenticated) {
            return 'ckeckout_r'
        } else {
            return 'ckeckout_r_none'
        }
    }

    const orderSummery = () =>{
       if(successAdd && t_price){
        return 'ckeckout_r_none'
       }
       else if (successAdd) {
            return 'ckeckout_r'
        } else if (user.isAuthenticated) {
            return 'ckeckout_r_none'
        } else {
            return 'ckeckout_r'
        }
    }

    const proceedToPayment = () => {
        const data = {
            totalPrice,
        };
        setTotalPrice(totalPrice)
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    };
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const handleLoginSubmit = () => {
        dispatch(login(userEmail, userPass));
       
    };

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
            <div className='handleAll'>
                <div>
                    <div className='checkout'>
                        <div className='checkout_padd'>
                            <div className='login_or_signup'>
                                <h3 className={user.isAuthenticated ? 'h3_style_auth' : 'h3_style'}>
                                    <span className='small_box'>1</span>
                                    <span className='next_style'>{user.isAuthenticated ? 'Login ' : 'Login or Signup'} {user.isAuthenticated && <DoneIcon style={{width:'18px'}} className='MuiSvgIcon-root' />}</span><br />
                                    {user.isAuthenticated && <span className='h3_auth'>{user.user && user.user.email}</span>}
                                   
                                </h3>
                                <div className={user.isAuthenticated ? 'ckeckout_r_none' : 'ckeckout_r'}>
                                    <div className='check_padd'>
                                        <div className='check_input'>
                                        <TextField id="standard-basic"
                                                className={classes.ajay2}
                                                label="Enter Email/Mobile number"
                                                variant="standard"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <TextField id="standard-basic"
                                                className={classes.ajay2}
                                                label="Enter Password"
                                                variant="standard"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                       
                                            <div className='input_policy' style={{ 'margin-top': '22px' }}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</div>
                                            <div className='input_btn'>
                                                <button onClick={handleLoginSubmit} className='btn_css btn_imp'>Continue</button>
                                            </div>
                                        </div>
                                        <div className='advantages'>
                                            <div className='advantages_padd'>
                                                <span style={{ 'font-size': '14px' }}>Advantages of our secure login</span>
                                                <ul>
                                                    <li className='li_style2'>
                                                        <FaTruck className='svg_styles' />
                                                        <span className='easy_track'>Easily Track Orders, Hassle free Returns</span>
                                                    </li>
                                                    <li className='li_style2'>
                                                        <FaRegBell className='svg_styles' />
                                                        <span className='easy_track'>Get Relevant Alerts and Recommendation</span>
                                                    </li>
                                                    <li className='li_style2'>
                                                        <FaRegStar className='svg_styles' />
                                                        <span className='easy_track'>Wishlist, Reviews, Ratings and more.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* DELIVERY ADDRESS */}
                    <div className='checkout'>
                        <div className='checkout_padd'>
                            <div className='login_or_signup'>
                                <h3 className={user.isAuthenticated && successAdd ? 'h3_style_auth' : 'h3_style'}>
                                    <span className='small_box'>2</span>
                                    <span className='next_style'>DELIVERY ADDRESS{user.isAuthenticated && successAdd && <DoneIcon style={{width:'18px'}} className='MuiSvgIcon-root' />}</span><br />
                                    
                                    {user.isAuthenticated && successAdd && <span style={{textTransform:'capitalize',fontSize:"13px"}} className='h3_auth'><span style={{color:"#212121",fontWeight:500,textTransform:'capitalize'}}>{address && address.name}</span>{address && `, ${address.address}, ${address.city}, ${address.state}- `}<span style={{color:"#212121",fontWeight:500,textTransform:'capitalize'}}>{address && address.pincode}</span></span>}
                                </h3>
                                <div className={handleDisplay()}>
                                    <div className='check_padd'>
                                        <div style={{ width: "100%" }} >
                                            <div>{console.log(name)}
                                                <TextField name='name'
                                                    value={name}
                                                    onChange={(e) => onValueChange(e)}
                                                    style={{ margin: '5px 5px 5px 5px' }}
                                                    id="outlined-basic" label="Name"
                                                    className={classes.address_field}

                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="outlined" />
                                                <TextField name='phone'
                                                    onChange={(e) => onValueChange(e)}
                                                    style={{ margin: '5px 5px 5px 5px' }}
                                                    id="outlined-basic" className={classes.address_field}
                                                    placeholder={address.phone || 'phone'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={phone}
                                                    label="10-digit mobile number"
                                                    variant="outlined"
                                                />
                                            </div>
                                            <div>
                                                <TextField
                                                    name='pincode' onChange={(e) => onValueChange(e)}
                                                    style={{ margin: '5px 5px 5px 5px' }} id="outlined-basic"
                                                    className={classes.address_field}
                                                    label="Pincode" variant="outlined"
                                                    placeholder={address.pincode || 'Pincode'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={pincode}
                                                />
                                                <TextField
                                                    defaultValue={address.locality}
                                                    name='locality' onChange={(e) => onValueChange(e)}
                                                    style={{ margin: '5px 5px 5px 5px' }} id="outlined-basic"
                                                    className={classes.address_field} label="Locality"
                                                    variant="outlined"
                                                    placeholder={address.locality || 'Locality'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={locality}

                                                />
                                            </div>
                                            <div>
                                                <TextField name='address'
                                                    className={classes.mult}
                                                    id="outlined-multiline-static"
                                                    label="Address(Area and Street)"
                                                    multiline
                                                    style={{ margin: '5px 5px 5px 5px' }}
                                                    rows={4}
                                                    placeholder={address.address || 'Address'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={address2}
                                                    onChange={(e) => onValueChange(e)}
                                                    variant="outlined"
                                                />
                                            </div>
                                            <div>
                                                <TextField name='city'
                                                    onChange={(e) => onValueChange(e)}
                                                    style={{ margin: '5px 5px 5px 5px' }} id="outlined-basic"
                                                    className={classes.address_field} label="City/District/Town"
                                                    variant="outlined"
                                                    placeholder={address.city || 'city'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={city}
                                                />
                                                <TextField
                                                    name='state' onChange={(e) => onValueChange(e)}
                                                    style={{ margin: '5px 5px 5px 5px' }} id="outlined-basic"
                                                    className={classes.address_field} label="State"
                                                    variant="outlined"
                                                    placeholder={address.state || 'state'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={state}
                                                />
                                            </div>
                                            <div>
                                                <TextField
                                                    name='landmark' onChange={(e) => onValueChange(e)}
                                                    style={{ margin: '5px 5px 5px 5px' }}
                                                    id="outlined-basic" className={classes.address_field}
                                                    label="Landmark(Optional)"
                                                    variant="outlined"
                                                    placeholder={address.landmark || 'Landmark'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={landmark}
                                                />
                                                <TextField
                                                    name='alternatephone' onChange={(e) => onValueChange(e)}
                                                    style={{ margin: '5px 5px 5px 5px' }} id="outlined-basic"
                                                    className={classes.address_field}
                                                    label="Alternate Phone(Optional)"
                                                    variant="outlined"
                                                    placeholder={address.alternatephone || 'Alternate'}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={alternatephone}
                                                />

                                            </div>
                                            <div style={{ marginTop: '10px' }}>
                                                <div className='input_btn' style={{ display: 'inline' }}>
                                                    <button onClick={() => handleAddUserAddress()} className='btn_css btn_imp2'>SAVE AND DELIVER HERE</button>
                                                </div>
                                                <button className='btn_css btn_can'>Cancel</button>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    {/* SUMMERY PAGE */}
                    <div className='checkout'>
                        <div className='checkout_padd'>
                            <div className='login_or_signup'>
                            <h3 className={t_price ? 'h3_style_auth' : 'h3_style'}>
                                    <span className='small_box'>3</span>
                                    <span className='next_style'>ORDER SUMMERY{t_price && <DoneIcon style={{width:'18px'}} className='MuiSvgIcon-root' />}</span><br />
                                     <span style={{textTransform:'capitalize',fontSize:"14px",marginLeft:"62px"}} className='h3_auth'>{t_price && orderItems.length} Items</span>
                                  
                                </h3>
                                <div className={orderSummery()}>
                                    <div >
                                        {getCarts[0] && getCarts[0].cartItems.map((item, index) => (
                                            <>

                                                <div className='add_to_cart_pro'>
                                                    <div className='bread_pro'>
                                                        <div className='pro_img' style={{ height: '112px', width: '112px' }}>
                                                            <img src={big} alt='not avilable' />
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
                                                            <span className='save_later'>Save For Later</span>
                                                            <span onClick={() => handleRemoveCartItem(item.product._id)} className='save_later'>Remove</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </>
                                        ))}
                                        {/* ORDER CONFIRMATION EMAIL */}

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    {/* ORDER EMAIL CONFIRMATION */}
                    <div className={orderSummery()}>

                        <div className='checkout_padd'>
                            <div className='login_or_signup'>

                                <h3 className='inc_height' >

                                    <span className='next_style2'>Order confirmation email will be sent to
                                        <span style={{ fontWeight: "500" }}>  xo6uzn99699@gmail.com</span>

                                    </span>
                                    <div className='input_btn' style={{ display: 'inline' }}>
                                        <button onClick={() => proceedToPayment()} className='btn_css btn_imp2'>PROCEED TO PAYMENT</button>
                                    </div>
                                </h3>
                            </div>
                        </div>
                    </div>
                    {/* PAYMENT OPTIONS */}
                 
                        <div className='checkout'>
                            <div className='checkout_padd'>
                                <div className='login_or_signup'>

                                    <h3 className='h3_style'>
                                        <span className='small_box'>4</span>
                                        <span className='next_style'>PAYMENT OPTIONS</span>
                                    </h3>
                                    {t_price && stripeApiKey && (
                                        <Elements stripe={loadStripe(stripeApiKey)}>
                                            <Payment />
                                        </Elements>
                                    )}
                                   
                                </div>
                            </div>
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
                                <span className='green_pro'> ₹{discountPrice}</span>
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
        </>
    );
}

export default Checkout