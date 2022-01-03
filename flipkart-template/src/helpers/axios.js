import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
axios.defaults.withCredentials = true

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
   
    baseURL: api,
    // withCredentials: true 
    // headers: {
    //     'Authorization': token ? `Bearer ${token}` : ''
    // }

});



export default axiosInstance;