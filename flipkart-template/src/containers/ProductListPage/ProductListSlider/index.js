import React,{useEffect} from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import Header from '../../../components/Header';
import './style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions/productAction';

const ProductListSlider = (props) => {

    const page = {
        title:'ajay sahu',
        banners:[
            'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
            'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
            'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
            'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80'
          ],
    };

    const dispatch = useDispatch();

    useEffect(() => {
      const { match } = props;
      console.log(match.params.slug)
      dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <>
            <Header />
            <BreadCrumb />
            <div style={{ margin: '0 10px' }}>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => {}}
            >
                {
                    page.banners && page.banners.map((banner, index) => 
                        <a 
                            key={index}
                            style={{ display: 'block' }}
                           // href={banner.navigateTo}
                        >
                            <img src={banner} alt="" />
                        </a>
                    )
                }
            </Carousel>

        </div>
        </>
    );
}

export default ProductListSlider