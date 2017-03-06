import Vue from 'vue';
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import AddWork from './views/AddWork.vue';
import router from './routes/routes';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueSweetAlert from 'vue-sweetalert';

Vue.use(VueRouter);
Vue.use(VueSweetAlert);

window.Vue = Vue;
window.Event = new Vue();
window.axios = axios;
window.MET_BASE_URI = function () {
    return 'http://ec2-52-43-110-148.us-west-2.compute.amazonaws.com/api/v1/';
};

new Vue({
    el: '#root',
    data: {
        name: ''
    },
    router,
    components: {
        Navbar,
        Home,
        'signup-form': Signup,
        'login-form': Login,
        'add-work': AddWork,
    }
});