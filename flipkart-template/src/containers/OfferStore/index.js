import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import Header from '../../components/Header';
import './style.css';
import Footer from "../../components/Footer";
import PosterSlider from "../../components/PosterSlider";
import { useDispatch, useSelector } from 'react-redux';
import jo from "../../images/jo.jpg";
import NotFound from '../../components/Notfound/Notfound';

const OfferStore = () => {
    const { products, loading } = useSelector(state => state.allSlider);

    return (
        <>
            <Header />
            <BreadCrumb />

            <NotFound />

            {

                products ? products.map((data, index) => (
                    data.pro.length > 0 &&
                    <div className='trending_poster'>
                        <PosterSlider deals={data.deal_name} product_data={data.pro} />
                    </div>

                ))
                    :
                    <NotFound />
            }


            <Footer />
        </>
    );
}

export default OfferStore