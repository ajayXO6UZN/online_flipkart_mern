import React, { useEffect } from 'react';
import { getProductsBySlug } from '../../../actions/productAction';
import BreadCrumb from '../../../components/BreadCrumb';
import Header from '../../../components/Header';
import PosterSlider from '../../../components/PosterSlider';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/Footer';


const ProductStore = (props) => {

    const dispatch = useDispatch();

    const slugData = useSelector(state => state.getPageProduct.productsByPrice);

    useEffect(() => {
        const { match } = props;
        console.log(match.params.slug)
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <>
            <Header />
            <BreadCrumb />
            {Object.keys(slugData).map((key, index) => {
                return (
                    slugData[key].length > 0 &&
                    <div className='trending_poster'>
                        <PosterSlider deals={key} product_data={slugData[key]} />
                    </div>
                );
            })}
            <Footer />
        </>
    );
}

export default ProductStore