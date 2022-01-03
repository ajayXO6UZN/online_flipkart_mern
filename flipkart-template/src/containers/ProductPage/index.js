import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import Header from '../../components/Header';
import './style.css';
import star from "../../images/star2.svg";
import assured from "../../images/assured.png";
import info from "../../images/info.svg";
import { IoMdHeart, IoIosCart, IoIosFlash, IoIosArrowForward } from "react-icons/io";
import ReactImageMagnify from 'react-image-magnify';
import images from './images';
import { getProductDetailsById, newReview } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { NavLink, useHistory } from 'react-router-dom';
import LoginPage from '../LoginPage';
import { addToCartAction } from '../../actions/cart.action';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import getParams from '../../utils/getParams';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
    },
    textArea: {
        width: 200,
    }
});



const ProductPage = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const productData = useSelector((state) => state.getPageProduct.productDetails);
    const { isAuthenticated } = useSelector((state) => state.user);
    const [selectedImage, setSelectedImage] = useState();
    const { getCarts } = useSelector(state => state.cart);
    const params = getParams(props.location.search);

    useEffect(() => {
        const { productId } = props.match.params;
        console.log(productId);
        const payload = {
            params: {
                productId,
            },
        };
        dispatch(getProductDetailsById(payload));


    }, [getCarts]);

console.log(productData.images && productData.images[0].url)
    const [cartValue, setCart] = React.useState(false);
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [login, setLogin] = useState(false);

    const handleClickOpen = () => {

        if (isAuthenticated) {
            setOpen(true)
        } else {
            setLogin(true);
            document.documentElement.style.setProperty('--modal_opacity-modal', `flex`);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    console.log(login)
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", props.match.params.productId);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    const addToCart = () => {
        // console.log(props.match.params.productId)
        dispatch(addToCartAction(props.match.params.productId));
    }
    const goToCart = () => {
        // console.log(props.match.params.productId)
        history.push('/viewcart')
    }
    var cartData;
    const cartHandle = () => {
        const hellllo = getCarts[0] && getCarts[0].cartItems.map((item, i) => (
            item.product._id == props.match.params.productId && true
        ))
        console.log(hellllo)
        cartData = hellllo;
    }

    cartHandle();
    console.log('plppppppppppppppppppppppppp')
    //console.log(yash && yash.includes(true))

    return (
        <>
            <Header />
            <BreadCrumb />
            {/* {productData && productData.map((item,index)=>(
                console.log(item)
            ))} */}
            <div className='root_img_gallary'>
                <div className='image_gallary'>
                    <div className='gallary' >
                        <div className='product_img_part_IMP' >
                            <div className='product_img_part1'>
                                <ul>
                                   
                                {productData.images &&
                                        productData.images.map((img, index) => (
                                            <li className='list_main_img_height_width'>
                                                <div className='relative_img'>
                                                    <img
                                                        src={img.url}
                                                        key={index}
                                                        className='object_fit_img'
                                                        alt='image not shown'
                                                        onMouseOver={() => setSelectedImage(img.url)}
                                                    />
                                                </div>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                        <div className='comp_img' >
                            <div className='wid_hei_img' style={{ width: '220px', height: '513px' }} >

                                <ReactImageMagnify  {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: selectedImage ? selectedImage : productData.images && productData.images[0].url,
                                        sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw',
                                    },
                                    largeImage: {
                                        src: selectedImage ? selectedImage : productData.images && productData.images[0].url,
                                        width: 500,
                                        height: 1200,
                                        
                                    },
                                    enlargedImageContainerDimensions: {
                                        width: '350%',
                                        height: '120%',
                                    },
                                    enlargedImageContainerStyle: {
                                        position: 'absolute',
                                        top: '-18px',
                                        left: '357px',
                                        'box-shadow': '0 4px 20px 2px rgb(0 0 0 / 20%)',
                                        'transform-origin': ' 50% 50%',
                                        border: '1px solid #e0e0e0',
                                        'border-radius': '4px',
                                        'z-index': '1',
                                        background: '#ffffffff'
                                    },
                                    isHintEnabled: true
                                }} />
                                {/* <img src={selectedImage} className='full_img' alt='image not shown' /> */}
                            </div>
                        </div>
                        <div className='heart_img'>
                            <div className=''>
                                <IoMdHeart style={{ fill: '#c2c2c2' }} />
                            </div>
                        </div>
                    </div>
                    <div className='mar_padd'>
                        <div className='padding-btn'>
                            <ul className='padding-btn'>
                                <li style={{ width: '50%' }}>

                                    {/* {cartItems.map((item, i) => (
                                        item._id == props.match.params.productId ?
                                           'go to cart' :
                                          'add to cart'
                                    ))} */}
                                    {
                                        cartData && cartData.includes(true) ?
                                            <button onClick={goToCart} className='addToCart' >
                                                <IoIosCart className='svg_css' />

                                                GO TO CART
                                            </button>
                                            :
                                            <button onClick={addToCart} className='addToCart' >
                                                <IoIosCart className='svg_css' />

                                                ADD TO CART
                                            </button>
                                    }

                                </li>
                                <li style={{ width: '50%' }}>
                                    <button onClick={()=>{history.push('/checkout')}} className='addToCart' style={{ background: '#fb641b' }}>
                                        <IoIosFlash className='svg_css' />
                                        BUY NOW
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='root_product'>

                    <div style={{ marginBottom: '8px' }} className='path_info' >
                        <ul className='root_path'>
                            <li>
                                <NavLink to='/' className='a_path'>Home</NavLink>
                                <span><IoIosArrowForward className='arrow_css' /></span>
                            </li>
                            <li>
                                <a href='#' className='a_path'>Mobiles</a>
                                <span><IoIosArrowForward className='arrow_css' /></span>
                            </li>
                            <li><a href='#' className='a_path'>Samsung Mobiles</a></li>
                        </ul>
                    </div>
                    <div className='product_details_root'>
                        <div style={{ marginBottom: '7px' }} className=''>
                            <h1 style={{ fontSize: '17px', color: '#212121', fontWeight: '500' }} className=''>{productData.name}</h1>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', width: '214px' }}>
                                <span className='rating_star_main'>{productData.ratings}<img src={star} alt='not available' /></span>
                                <span className='rating_rewies'>{productData.reviews && productData.reviews.length} Ratings & {productData.reviews && productData.reviews.length} Reviews</span>
                            </div>
                            <span><img src={assured} style={{ height: '21px', margin: '3px 0 0 10px' }} alt='not avalable' /></span>
                        </div>
                        <div className='extra_offer'>Extra ₹{productData.comparePrice - productData.price} off</div>
                    </div>
                    <div style={{ display: 'flex', 'padding-top': '12px' }}>
                        <div >
                            <span style={{ fontSize: '28px' }} className='exact_money'>₹{productData.price}</span>
                            <span className='extra_money'>₹{productData.comparePrice}</span>
                            <span className='percent_off'>{Math.round((productData.comparePrice - productData.price) / productData.comparePrice * 100)}% off</span>
                        </div>
                        <div className='info_btn'><img src={info} alt='' /></div>
                    </div>
                    <div style={{ display: 'flex', paddingRight: '12px', fontWeight: '500', color: '#878787', margin: '29px 0 29px 0' }}>
                        <div style={{ marginRight: '60px' }}>Description</div>
                        <div>
                            {productData.description}
                        </div>
                    </div>
                    <div className='rating'>
                        <div className='rating_review'>
                            <div style={{ marginBottom: '20px' }} className='rate_heading'>
                                <h6>Ratings & Reviews</h6>
                                <div className='rating_product'>
                                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                        Submit Review
                                    </Button>
                                    <Dialog
                                        fullScreen={fullScreen}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle id="responsive-dialog-title">{"Submit Review"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                <div className={classes.root}>
                                                    <Rating
                                                        name="hover-feedback"
                                                        value={rating}
                                                        precision={0.5}
                                                        onChange={(event, newValue) => {
                                                            setRating(newValue);
                                                        }}
                                                        // onChange={(e) => setRating(e.target.value)}
                                                        onChangeActive={(event, newHover) => {
                                                            setHover(newHover);
                                                        }}
                                                    />
                                                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                                                </div>
                                                <TextareaAutosize className={classes.textArea}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    aria-label="minimum height"
                                                    minRows={9}
                                                    placeholder="Minimum 3 rows"
                                                />
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={reviewSubmitHandler} color="primary" autoFocus>
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                            <div className='rating_details'>
                                <div className='avg_rating'>
                                    <div className='rate_num'>

                                        <span className='rate_star_big'>{productData.ratings && productData.ratings}  <img src={star} alt='not available' /></span>
                                    </div>
                                    <div style={{ color: 'rgb(112, 8, 8)' }}> <span>{productData.reviews && productData.reviews.length} Ratings &</span>
                                        <span>{productData.reviews && productData.reviews.length} Reviews</span></div>
                                </div>
                                <div className='customer_felt'>
                                    What our customers felt:
                                </div>
                                {productData.reviews && productData.reviews.map((item, i) => (
                                    <div className='complete_review'>
                                        <div style={{ marginBottom: '9px' }}>
                                            <span className='rating_star_main'>{item.rating}<img src={star} alt='not available' /></span>
                                            <span className='set_review'>{item.comment}</span>
                                        </div>
                                        <div className='relative_img2'>
                                            <img
                                                src={info}

                                                className='fit_img'
                                                alt='image not shown'

                                            />
                                        </div>
                                        <div style={{ justifyContent: 'space-between', display: 'flex', }}>
                                            <div className='handle_name'>{item.name} <span className='ago_han'>26days ago</span></div>
                                            <div className='handle_name2'>
                                                <ThumbUpAltIcon style={{ width: '20px', height: '21px' }} /> <span style={{ left: '23px' }} className='like_no'>1</span>
                                                <ThumbDownIcon style={{ width: '20px', height: '21px', marginLeft: '32px' }} /> <span style={{ left: '23px' }}>2</span>
                                            </div>
                                        </div>
                                        <div style={{ position: 'relative' }} className='handle_name'><CheckCircleIcon style={{ width: '17px' }} /><span style={{ position: 'absolute', top: '5px' }} className='ago_han'>Certified Buyer, Vellore</span></div>

                                    </div>

                                ))}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {login &&

                <LoginPage />}
        </>
    );
}

export default ProductPage
