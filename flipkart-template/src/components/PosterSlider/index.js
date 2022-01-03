import React from 'react';
import CountdownTimer from "../CountdownTimer";
import ProductSlider from "../Crousal/ProductSlider";
import {  BlueButton } from "../MaterialUI";

const PosterSlider = (props) => {
    return (
        <>
            <div className='deals_of_day'>
                <div className='deals_border'>
                    <div className='countdown-timer'>
                        <div style={{display: 'flex'}}>
                        <div className="deals">{props.deals}</div>
                        {props.countDown ? <div ><CountdownTimer /></div> :<div ></div> }
                        </div>
                        
                        <div><BlueButton></BlueButton></div>
                    </div>
                </div>
                <div className='handle_pro_slider'>
                    <ProductSlider product_data={props.product_data} arrow_slider_right={props.arrow_right} arrow_slider_left={props.arrow_left} />
                </div>
            </div>
        </>
    );
}

export default PosterSlider