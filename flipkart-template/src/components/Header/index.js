import React, { useEffect, useState, useRef } from "react";
import { searchBar } from "../../actions/productAction";
import './style.css';
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import { DropdownMenu, BlueButton } from "../MaterialUI";
import { FaUserCircle, FaHeart, FaGifts, FaRegCreditCard, FaBell, FaShoppingCart } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { GrOrderedList } from "react-icons/gr";
import { BsFillArchiveFill, BsFillQuestionSquareFill, BsGraphUp, BsDownload } from "react-icons/bs";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import LoginPage from "../../containers/LoginPage";

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const Auto = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const promise = useSelector(state => state.getPageProduct);

    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
    console.log(search)


    const runSearch = (path) => {
        history.push(path)
    }

    useEffect(() => {
        dispatch(searchBar(search));
        const listener = event => {
            if (event.code === "Enter" || event.code === "ArrowDown") {
                console.log("Enter key was pressed. Run your function.");
                event.preventDefault();
                runSearch(`/search?keyword=${search}type=search`)
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };

    }, [search]);

    useEffect(() => {
        const pokemon = [];
        var name

        promise && promise.search.map((item, i) => (
            name = item.name,
            pokemon.push({ name })
        ))

        setOptions(pokemon);
    }, [promise]);
    console.log(options)
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });
    console.log(options)
    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };

    const updatePokeDex = poke => {

        setSearch(poke);
        setDisplay(false);
    };

 

    return (

        <div ref={wrapperRef} className="searchFlipkart">
            <div style={{ display: 'flex' }} className="searchInputContainer">
                <div>
                    <div style={{ display: 'flex' }}>
                        <input
                            id="auto"
                            onClick={() => setDisplay(!display)}

                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            className="searchInput"
                            placeholder={"search for products, brands and more"}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch
                                style={{
                                    color: "#2874f0",
                                }}
                            />
                        </div>
                    </div>
                    {display && (
                        <div className="autoContainer">
                            {options
                                .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
                                .map((value, i) => {
                                    return (
                                        <div
                                            onClick={() => updatePokeDex(value.name)}
                                            className="option"
                                            key={i}

                                            tabIndex="0"
                                        >
                                            <span>
                                                <NavLink to={`/search?keyword=${search}&type=search`}>{value.name}</NavLink>
                                            </span>

                                        </div>
                                    );
                                })}
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

const Header = () => {

    const cart = useSelector(state => state.cart);
    const [login, setLogin] = useState(false);

    const handleClickOpen = () => {

        setLogin(true);
        //  document.documentElement.style.setProperty('--modal_opacity-modal', `flex`);

    };
    return (
        <>
            <div className="header">
                <div className="sub-header">
                    <div className="logo">
                        <a>
                            <img src={flipkartLogo} className="logoimage" alt="logo" style={{ display: 'block' }} />
                        </a>
                        <a class="explore">
                            Explore
                            <span className="plus">Plus</span>
                            <img src={goldenStar} style={{ width: '10px' }} className="goldenStar" alt="logo" />
                        </a>
                    </div>
                    {/* search component */}
                    <Auto />

                    {/* search component ends here */}
                    <DropdownMenu
                        menu={
                            <a
                                className="login-btn"
                            >
                                Login
                            </a>
                        }
                        menus={[
                            { label: "My Profile", href: "", icon: <FaUserCircle className="user-icon" /> },
                            { label: "Flipkart Plus Zone", href: "", icon: <IoAddOutline className="user-icon" /> },
                            {
                                label: "Orders",
                                href: `/account/orders`,
                                icon: <GrOrderedList className="user-icon" />,

                            },
                            { label: "Wishlist", href: "", icon: <FaHeart className="user-icon" /> },
                            { label: "Rewards", href: "", icon: <FaGifts className="user-icon" /> },
                            { label: "Gift Cards", href: "", icon: <FaRegCreditCard className="user-icon" /> },
                        ]}
                        firstMenu={
                            <div className="dropdown-content">
                                <div className="drop-main-header">
                                    <div className="dropdown-header">
                                        <div className="customer">New customer?</div>
                                        <div className="drop-signup" onClick={handleClickOpen}>Signup</div>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>More</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            { label: "Notification Preference", href: "", icon: <FaBell className="user-icon" /> },
                            { label: "Sell on flipkart", href: "", icon: <BsFillArchiveFill className="user-icon" /> },
                            { label: "24x7 Customer Care", href: "", icon: <BsFillQuestionSquareFill className="user-icon" /> },
                            { label: "Advertise", href: "", icon: <BsGraphUp className="user-icon" /> },
                            { label: "Download App", href: "", icon: <BsDownload className="user-icon" /> },
                        ]}
                    />
                    <div className='shopping-cart2'>
                        <NavLink to={'/viewcart'}>

                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={cart.numofcart} color="secondary">
                                    <ShoppingCartIcon className='cartIcon' />
                                </StyledBadge>
                            </IconButton>

                            <span className='cart-text' style={{ color: 'white' }}>Cart</span>
                        </NavLink>
                    </div>
                </div>

            </div>
            {/* NAVBAR COMPLETED */}

            {login &&

                <LoginPage />}

        </>
    );
}

export default Header;