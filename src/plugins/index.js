import Vue from 'vue';
import store from 'core/store';
import './elementui';
import Permission from './permission';
import Log from './log';
import Perf from './perf';
import Auth from './auth';
import { LOG, PERMISSION } from '../config';

Vue.use(Permission, store, PERMISSION);
Vue.use(Log, LOG);
Vue.use(Perf);
Vue.use(Auth, {});
