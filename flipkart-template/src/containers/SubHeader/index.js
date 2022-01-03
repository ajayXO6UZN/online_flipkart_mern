import React from 'react';
import top from "../../images/top.png";
import grocery from "../../images/grocery.png";
import mobiles from "../../images/mobiles.png";
import fashion from "../../images/fashion.png";
import electronics from "../../images/elecronics.png";
import home from "../../images/home.jpg";
import appliances from "../../images/appliances.png";
import travel from "../../images/travel.png";
import toys from "../../images/toys.png";
import { NavLink } from "react-router-dom";

const menus = [
    { offer: "Top Offers", img: top },
    { offer: "Grocery", img: grocery },
    { offer: "Mobiles", img: mobiles },
    { offer: "Fashion", img: fashion },
    { offer: "Electronics", img: electronics },
    { offer: "Home", img: home },
    { offer: "Appliances", img: appliances },
    { offer: "Travel", img: travel },
    { offer: "Beauty, Toys, & More", img: toys },
]

const SubHeader = () => {

    return (
        <>
            <div className="breadcrumb-part1">
                <div className="breadcrumb-container flex-demo box-shadow">
                    <div className="bread-container">
                    {menus.map((item,index)=>(
                        <div className='bread-images'>
                            <NavLink to={`/offer-store`}>
                                <div class='handle-img'>
                                    <img src={item.img} style={{ width: '64px', height: '64px' }} alt="bread-images" />
                                </div>
                                <div class='offers'>{item.offer}</div>
                            </NavLink>
                        </div>
                    ))}                     
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubHeader