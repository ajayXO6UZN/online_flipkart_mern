import React, { useState, useEffect, Fragment } from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import Header from '../../../components/Header';
import './productList.css';
import Footer from "../../../components/Footer";
import { IoIosArrowForward, IoIosStar, IoMdCart, IoMdHeart } from "react-icons/io";
import images from '../../../images/apple.jpeg'
import star from '../../../images/star.svg'
import assured from '../../../images/assured.png'
import info from '../../../images/info.svg'
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug, searchBar } from '../../../actions/productAction';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NotFound from '../../../components/Notfound/Notfound';
import { NavLink } from 'react-router-dom';
import getParams from '../../../utils/getParams';
import Loader from '../../Loader/Loader';

const useStyles = makeStyles({
    root: {
        width: 190,
    },
});

function valuetext(value) {
    return `${value}°C`;
}

const ProductList = (props) => {

    const dispatch = useDispatch();
    const { products, searchAllProducts, loading } = useSelector(state => state.getPageProduct);
    const brandData = useSelector(state => state.getPageProduct.brandData);

    const [state, setState] = React.useState({
        //checkedB: true,
    });

    const [checked, setChecked] = React.useState([]);
    const [checkedRating, setCheckedRating] = React.useState(0);

    const [navState, changeNavState] = useState({

        activeObject1: 'Popularity',

        objects: [{ data: 'Popularity' }, { data: 'Price -- Low to High' }, { data: 'Price -- High to Low' }, { data: 'Newest First' }]
    });


    const classes = useStyles();
    const [price, setValue] = React.useState([0, 35000]);

    // console.log(price)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const handleCheckedChange = (value) => {

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        console.log(currentIndex)
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {

            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    };




    const handleChangeCheckout = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    function toggleNavActive(index) {

        changeNavState({ ...navState, activeObject: navState.objects[index], activeObject1: null })
    }



    function toggleNavActiveStyle(index) {

        if (navState.objects[index] === navState.activeObject) {
            return 'handle_nav';
        } else if (navState.activeObject1 == navState.objects[index].data) {
            return 'handle_nav';
        } else {
            return 'handle_static';
        }
    }


    function handleCheckedRating(num) {
        if (checkedRating == num) {
            setCheckedRating(0)
        } else {
            setCheckedRating(num)
        }

    }

    const params = getParams(props.location.keyword);
    const stringData = checked.map((value) => (`&brand[in]=${value}`)).join('');
    const para = getParams(props.location.search);
    useEffect(() => {
        const { match, location } = props;
        const deal = location.pathname.split('/')[2];

        dispatch(getProductsBySlug(match.params.slug, deal, price, checkedRating, stringData));
        dispatch(searchBar(params.keyword, price, checkedRating, stringData))
    }, [price, stringData, checkedRating,]);

    return (
        <>
            <Header />
            <BreadCrumb />

            <div className='filter_product'>
                <div className='filter_1'>
                    <div className='filter_2_shadow'>
                        <section className='filter_border_3'>
                            <div className='filter_font_4'>Filters</div>
                        </section>
                        <div className='filter_common'>
                            <div className='filter_category'>CATEGORIES</div>
                            <div className='manange_icon'><ArrowBackIosIcon style={{ width: '12px', position: 'absolute', left: '-7px', top: '5px' }} /> Mobiles & Accessories</div>
                            <div className='manange_icon'>Mobiles</div>

                        </div>
                        <div style={{ position: 'relative' }} className='filter_price filter_common'>
                            <div style={{ marginBottom: '16px' }} className='filter_category'>PRICE</div>

                            <div style={{ position: 'absolute', top: '36px' }} className="_1nneZ0">
                                <div className="_2TbXIJ" style={{ height: '16.6667px', width: '21.0056px' }}>

                                </div>
                                <div className="_2TbXIJ" style={{ height: '20.8333px', width: '21.0056px' }}>

                                </div><div className="_2TbXIJ" style={{ height: '16.6667px', width: '21.0056px' }}>

                                </div><div className="_2TbXIJ" style={{ height: '16.6667px', width: '21.0056px' }}></div>
                                <div className="_2TbXIJ" style={{ height: '16.6667px', width: '21.0056px' }}></div>
                                <div className="_2TbXIJ" style={{ height: '20.8333px', width: '21.0056px' }}></div>
                                <div className="_2TbXIJ" style={{ height: '25px', width: '21.0056px' }}></div>
                                <div className="_2TbXIJ" style={{ height: '25px', width: '21.0056px' }}></div>
                                <div className="_2TbXIJ" style={{ height: '8.33333px', width: '21.0056px' }}>

                                </div>
                            </div>
                            <div className={classes.root}>

                                <Slider
                                    value={price}
                                    onChangeCommitted={handleChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={valuetext}
                                    max={100}

                                />

                            </div>
                        </div>
                        <div className='filter_price filter_common'>
                            <div className='filter_category'>BRAND</div>
                            {brandData && brandData.map((item) => (
                                <FormControlLabel key={item}
                                    control={
                                        <Checkbox
                                            checked={checked.includes(item) === false ? false : true}
                                            onChange={() => handleCheckedChange(item)}

                                            //  name={item}
                                            color="primary"
                                        />
                                    }
                                    label={item}
                                />
                            ))}
                        </div>
                        <div className='filter_price filter_common'>
                            <div className='filter_category'>CUSTOMER RATINGS</div>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedRating == 4 ? true : false}
                                        onChange={() => handleCheckedRating(4)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="4★ & above"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedRating == 3 ? true : false}
                                        onChange={() => handleCheckedRating(3)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="3★ & above"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedRating == 2 ? true : false}
                                        onChange={() => handleCheckedRating(2)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="2★ & above"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedRating == 1 ? true : false}
                                        onChange={() => handleCheckedRating(1)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="1★ & above"
                            />
                        </div>
                    </div>
                </div>
                <div className='product_1'>
                    <div className='product_2'>
                        {/* home > category > subCategory > productName */}
                        <div className="breed">
                            <ul>
                                <li>
                                    <a href="#">Home</a>
                                    <IoIosArrowForward />
                                </li>
                                <li>
                                    <a href="#">Mobiles</a>
                                    <IoIosArrowForward />
                                </li>
                                <li>
                                    <a href="#">Samsung</a>
                                    <IoIosArrowForward />
                                </li>
                                <li>
                                    <a href="#">I dont</a>
                                </li>
                            </ul>
                        </div>
                        <div className='latest'>Latest from MI : <a href='#'>Redmi Go</a></div>
                        <h1 className='product_0'>Mi Mobiles</h1>
                        <span className='product_00'>(Showing 1 – 24 products of 295 products)</span>
                        <div className='bottom_nav'>
                            <span className='sort_by' >Sort By</span>
                            {navState.objects.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => toggleNavActive(index)}
                                    className={toggleNavActiveStyle(index)}
                                >{item.data}</div>
                            ))}
                        </div>
                        {products && products.length == 0 && searchAllProducts && searchAllProducts.length == 0 &&
                            <NotFound />
                        }

                        {loading ? (
                            <Loader />
                        ) : (
                            <Fragment>


                                {products && products.map((item, index) => (
                                    <>

                                        <Divider />
                                        <NavLink className='single_poster' to={`/${item.slug}/${item._id}/p`}>
                                            <div className='multipleProducts'>

                                                <div style={{ position: 'relative' }} className='handleImage'>
                                                    <div className='wid_hei_img'>
                                                        <img src={item.images[0] && item.images[0].url} className='full_img' alt='image not shown' />
                                                    </div>

                                                    <div style={{ top: '0px', right: '24px' }} className='heart_img'>
                                                        <div className=''>
                                                            <IoMdHeart style={{ fill: '#c2c2c2' }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mid_text'>
                                                    <div className='product_details_root'>
                                                        <div className='pro_head'>
                                                            <h1 className='heading_product'>{item.name}</h1>
                                                        </div>
                                                        <div style={{ display: 'flex', margin: '4px 0px' }}>
                                                            <div style={{ display: '-webkit-box' }}>
                                                                <span style={{ fontSize: '16px' }} className='rating_star'>4.5<img src={star} alt='not available' /></span>
                                                                <span style={{ fontSize: '16px' }} className='rating_rewies'>13 Ratings & 0 Reviews</span>
                                                            </div>
                                                            <span><img src={assured} style={{ height: '21px', margin: '3px 0 0 10px' }} alt='not avalable' /></span>
                                                        </div>
                                                        <div style={{ fontSize: '17px' }} className='extra_offer'>Extra ₹{item.comparePrice - item.price} off</div>
                                                    </div>

                                                </div>
                                                <div className='lastText'>
                                                    <div style={{ display: 'flex', 'padding-top': '48px' }}>
                                                        <div >
                                                            <span style={{ fontSize: '26px' }} className='exact_money'>₹{item.price}</span>
                                                            <span className='extra_money'>₹{item.comparePrice}</span>
                                                            <span className='percent_off'>{Math.round((item.comparePrice - item.price) / item.comparePrice * 100)}% off</span>
                                                        </div>
                                                        <div style={{ margin: '11px 0 0 8px' }} className='info_btn'><img src={info} alt='' /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <Divider />

                                    </>
                                ))}
                                {para.type == 'search' && searchAllProducts && searchAllProducts.map((item, index) => (
                                    <>
                                        <Divider />
                                        <NavLink className='single_poster' to={`/${item.slug}/${item._id}/p`}>
                                            <div className='multipleProducts'>

                                                <div style={{ position: 'relative' }} className='handleImage'>
                                                    <div className='wid_hei_img'>
                                                        <img src={images} className='full_img' alt='image not shown' />
                                                    </div>

                                                    <div style={{ top: '0px', right: '24px' }} className='heart_img'>
                                                        <div className=''>
                                                            <IoMdHeart style={{ fill: '#c2c2c2' }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mid_text'>
                                                    <div className='product_details_root'>
                                                        <div className='pro_head'>
                                                            <h1 className='heading_product'>{item.name}</h1>
                                                        </div>
                                                        <div style={{ display: 'flex', margin: '4px 0px' }}>
                                                            <div style={{ display: '-webkit-box' }}>
                                                                <span style={{ fontSize: '16px' }} className='rating_star'>4.5<img src={star} alt='not available' /></span>
                                                                <span style={{ fontSize: '16px' }} className='rating_rewies'>13 Ratings & 0 Reviews</span>
                                                            </div>
                                                            <span><img src={assured} style={{ height: '21px', margin: '3px 0 0 10px' }} alt='not avalable' /></span>
                                                        </div>
                                                        <div style={{ fontSize: '17px' }} className='extra_offer'>Extra ₹{item.comparePrice - item.price} off</div>
                                                    </div>

                                                </div>
                                                <div className='lastText'>
                                                    <div style={{ display: 'flex', 'padding-top': '48px' }}>
                                                        <div >
                                                            <span style={{ fontSize: '26px' }} className='exact_money'>₹{item.price}</span>
                                                            <span className='extra_money'>₹{item.comparePrice}</span>
                                                            <span className='percent_off'>{Math.round((item.comparePrice - item.price) / item.comparePrice * 100)}% off</span>
                                                        </div>
                                                        <div style={{ margin: '11px 0 0 8px' }} className='info_btn'><img src={info} alt='' /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <Divider />

                                    </>
                                ))}
                            </Fragment>
                        )}
                    </div>


                </div>
            </div>
        </>
    );
}

export default ProductList