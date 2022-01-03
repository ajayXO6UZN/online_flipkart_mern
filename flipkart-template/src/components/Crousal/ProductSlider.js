import React, { useState } from "react";
import a from "../../images/a.png";
import Arrow from './Arrow';
import SliderContent from './SliderContent';
import { Link, NavLink } from 'react-router-dom';

const getWidth = () => window.innerWidth

const ProductSlider = (props) => {
    let left_arr, right_arr;
    let ajay = props.arrow_slider_left;
    if (ajay) {
        left_arr = ajay;
    } else {
        left_arr = 0;
    }
    let anuj = props.arrow_slider_right;
    if (anuj) {
        right_arr = anuj;
    } else {
        right_arr = 0;
    }

    console.log(getWidth());
    const [state, setState] = useState({
        activeSlide: 0,
        translate: 0,
        transition: 0.45
    })

    const { translate, transition } = state

    const nextSlide = () => {

        setState({
            ...state,

            translate: 197,
            transition: 0.45
        })
    }

    const prevSlide = () => {


        setState({
            ...state,
            translate: -197,
            transition: 0.10
        })
    }
    // console.log(props.product_data)
    return (
        <>

            <div className='Product_Slider'>
                <SliderContent
                    translate={translate}
                    transition={transition}
                    width={'1560px'}

                >
                    <div className='poster_item'>
                        {
                            props.product_data && props.product_data.map((item, index) => (
                                <div className='poster_anchor'>
                                    <NavLink className='single_poster' to={`/${item.category.slug}/${item.deal_type._id}/?type=deals`}>
                                        <div className='poster_img'>
                                            <img src={item.images && item.images[0].url} alt="omg" />
                                        </div>
                                        <div className='poster_heading'>{item.name}</div>
                                        <div className='poster_price'>From {item.price}</div>
                                        <div className='poster_brand'>{item.brand}</div>
                                    </NavLink>
                                </div>
                            ))
                        }


                    </div>
                </SliderContent>
                <Arrow direction="left" handleClick={prevSlide} left={left_arr} />
                <Arrow direction="right" handleClick={nextSlide} right={right_arr} />

            </div>

        </>
    );
}

export default ProductSlider