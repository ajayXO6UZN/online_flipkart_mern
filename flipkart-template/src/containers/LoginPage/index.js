import React,{useState} from 'react';
import './style.css';
import loginImage from "../../images/login-image.png";
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { IoIosClose } from "react-icons/io";
import {login} from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
        '& .super-app-theme--header': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
    },
    ajay: {

        width: '100%'
    },
    forgot: {
        'font-weight': '500',
        'font-size': '15px',
        cursor: 'pointer',
        color: '#2874f0'
    }
    ,
});

const LoginPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userEmail, setEmail] = useState('');
    const [userPass, setPassword] = useState('');

    const handleLoginSubmit = () => {
        dispatch(login(userEmail, userPass));
        document.documentElement.style.setProperty('--modal_opacity-modal',`none`)
    };

    const handleCloseBtn = () => {
        document.documentElement.style.setProperty('--modal_opacity-modal',`none`)
    }

    return (
        <>
            <div className='login_modal'>
                <div className='modal_opacity'>
                    <div className='outline_pro'>
                        <button className='off_btn' onClick={handleCloseBtn}><IoIosClose /></button>
                        <div className='modal_start'>
                            <div className='modal_row'>
                                <div className='login_sidebar'>
                                    <div className='padd'>
                                        <p>Login</p>
                                        <span>Get access to your Orders, Wishlist and Recommendations</span>
                                        <img src={loginImage} alt='not available' />
                                    </div>
                                </div>
                                <div className='login_input_field' style={{ width: '60%' }}>
                                    <div className='login_padd' style={{ height: '100%' }}>

                                        <div className='input_email'>
                                            <TextField id="standard-basic" 
                                            className={classes.ajay} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            label="Enter Email/Mobile number" 
                                            variant="standard" />
                                        </div>
                                        <div className='input_kg'>
                                            <TextField id="standard-basic"
                                             className={classes.ajay} 
                                             label="Enter Email/Mobile number" 
                                             onChange={(e) => setPassword(e.target.value)}
                                             variant="standard"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><a href="#" className={classes.forgot}>Forgot?</a></InputAdornment>,
                                                }}
                                            />
                                        </div>

                                        <div className='input_policy'>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</div>
                                        <div className='input_btn'>
                                            <button className='btn_css btn_imp' onClick={handleLoginSubmit}>Login</button>
                                        </div>
                                        <div className='otp' style={{ 'margin-top': '16px' }}>
                                            <div className='or'>OR</div>
                                            <button className='btn_imp btn_otp_imp'>Request OTP</button>
                                        </div>
                                        <div className='input_account'>
                                            <a href='#'>New to Flipkart? Create an account</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage