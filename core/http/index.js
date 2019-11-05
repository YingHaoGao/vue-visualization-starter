import Vue from 'vue';
import axios from 'axios';
import {
  API_HOST,
  API_BASE_URL,
  API_REQUEST_TIMEOUT,
} from '@/config';
import '@/interceptor/request';
import '@/interceptor/response';

axios.defaults.baseURL = API_HOST + API_BASE_URL;
axios.defaults.timeout = API_REQUEST_TIMEOUT;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

Vue.prototype.$http = axios;
export default axios;
