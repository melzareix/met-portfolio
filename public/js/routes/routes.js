import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/signup',
            component: Signup
        },
        {
            path: '/login',
            component: Login
        }
    ],
    linkActiveClass: 'is-active'

});