import React from 'react';
import Header from '../../components/Header';
import SubHeader from '../SubHeader';
import PosterSlider from "../../components/PosterSlider";
import jo from "../../images/jo.jpg";
import Slider from '../../components/Crousal/Slider';
import images from '../../components/Header/images'
import { BlueButton } from "../../components/MaterialUI";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {

    const { products, loading } = useSelector(state => state.allSlider);


    return (
        <>
            <Header />
            <SubHeader />
            <div style={{ padding: '8px' }}>
                <div style={{ padding: '0px 0px 10px 0px' }}></div>
                <Slider slides={images} autoPlay={3} />
            </div>


            {

                products && products.map((data, index) => (
                    data.deal_type != 'day' ?
                  
                    data.pro.length > 0 &&  
                        <div className='trending_poster'>
                            <PosterSlider deals={data.deal_name} product_data={data.pro} />
                        </div>
                        :
                        <div className='deals_with_poster'>
                            <PosterSlider deals={data.deal_name} product_data={data.pro} countDown='true' arrow_right='245' arrow_left='0' />
                            <div className='poster'>
                                <img src={jo} style={{ 'max-width': '100%', 'max-height': '100%','height': '346px', 'width': '238px' }} alt="bread-images" />
                            </div>

                        </div>
                ))

            }


            <Footer />
        </>
    );
}

export default HomePage;

