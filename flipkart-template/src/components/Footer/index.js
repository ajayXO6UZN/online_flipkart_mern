import React from 'react';
import c1 from "../../images/c1.svg";
import suitcase from '../../images/suitcase.svg';
import helper from '../../images/helper.svg';
import gift from '../../images/gift.svg';
import star from '../../images/star.svg';


const Footer = () => {
    return (
        <>
            <footer className='main_footer'>
            <div className=''>
                <div className='footer'>
                    <div className='footer_col'>
                        <div className='footer_header'>ABOUT</div>
                        <a href='#' className='footer_anchor'>About Us</a>
                        <a href='#' className='footer_anchor'>Careers</a>
                        <a href='#' className='footer_anchor'>Flipkart Stories</a>
                        <a href='#' className='footer_anchor'>Press</a>
                        <a href='#' className='footer_anchor'>Flipkart</a>
                        <a href='#' className='footer_anchor'>Wholesale</a>
                        <a href='#' className='footer_anchor'>Corporate</a>
                        <a href='#' className='footer_anchor'>Information</a>
                    </div>
                    <div className='footer_col'>
                        <div className='footer_header'>Help</div>
                        <a href='#' className='footer_anchor'>Payments</a>
                        <a href='#' className='footer_anchor'>Sipping</a>
                        <a href='#' className='footer_anchor'>Cancellation & returns</a>
                        <a href='#' className='footer_anchor'>FAQ</a>
                        <a href='#' className='footer_anchor'>Report</a>
                        <a href='#' className='footer_anchor'>Infringement</a>
                    </div>
                    <div className='footer_header'>
                        <div className='footer_header'>Policy</div>
                        <a href='#' className='footer_anchor'>Payments</a>
                        <a href='#' className='footer_anchor'>Sipping</a>
                        <a href='#' className='footer_anchor'>Cancellation & returns</a>
                        <a href='#' className='footer_anchor'>FAQ</a>
                        <a href='#' className='footer_anchor'>Report</a>
                    </div>
                    <div className='footer_col'>
                        <div className='footer_header'>Policy</div>
                        <a href='#' className='footer_anchor'>Payments</a>
                        <a href='#' className='footer_anchor'>Sipping</a>
                        <a href='#' className='footer_anchor'>Cancellation & returns</a>

                    </div>
                    <div class="footer_col address">
                        <div class="footer_border">
                            <div class="footer_header">
                                <span>Mail Us:</span>
                            </div>
                            <div class="footer_para">
                                <div class="_1LJS6T">
                                    <div class="_2NKhZn _1U1qnR">
                                        <p>Flipkart Internet Private Limited, </p>
                                        <p> Buildings Alyssa, Begonia &amp; </p>
                                        <p> Clove Embassy Tech Village, </p>
                                        <p> Outer Ring Road, Devarabeesanahalli Village, </p>
                                        <p> Bengaluru, 560103, </p>
                                        <p> Karnataka, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer_col address">
                        <div class="except_footer_border">
                            <div class="footer_header">
                                <span>Registered Office Address:</span>
                            </div>
                            <div class="footer_para">
                                <div class="_1LJS6T">
                                    <div class="_2NKhZn _1U1qnR">
                                        <p>Flipkart Internet Private Limited, </p>
                                        <p> Buildings Alyssa, Begonia &amp; </p>
                                        <p> Clove Embassy Tech Village, </p>
                                        <p> Outer Ring Road, Devarabeesanahalli Village, </p>
                                        <p> Bengaluru, 560103, </p>
                                        <p> Karnataka, India </p>
                                        <p> CIN : U51109KA2012PTC066107 </p>
                                        <p> Telephone: <a href="tel:18002029898">1800 202 9898</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='last_border'>
                    <div className=''>
                        <img src={suitcase} alt='omg' />
                        <a href='' >
                            <span className='footer_span'>Sell on Flipkart</span>
                        </a>
                    </div>
                    <div className=''>
                        <img src={star} alt='omg' />
                        <a href='' >
                            <span className='footer_span'>Advertise</span>
                        </a>
                    </div>
                    <div className=''>
                        <img src={gift} alt='omg' />
                        <a href='' >
                            <span className='footer_span'>Gift Cards</span>
                        </a>
                    </div>
                    <div className=''>
                        <img src={helper} alt='omg' />
                        <a href='' >
                            <span className='footer_span'>Help Centers</span>
                        </a>
                    </div>
                    <span class="footer_span">© 2007 2021 <span>Flipkart.com</span></span>
                    <img src={c1} className='bank_cards_img' ></img>
                </div>
            </div>
            </footer>
        </>
    );
}

export default Footer