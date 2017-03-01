import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import AddWork from '../views/AddWork.vue';
import NotFound from '../views/NotFound.vue';
import Logout from '../views/Logout.vue';
import Search from '../views/Search.vue';


export default new VueRouter({
    routes: [{
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
        },
        {
            path: '/portfolio/add',
            component: AddWork
        },
        {
            path: '/search/:tag',
            component: Search
        },
        {
            path: '/logout',
            component: Logout
        },
        {
            path: '/404',
            component: NotFound
        },
        {
            path: '/*',
            redirect: '/404'
        }
    ],
    linkActiveClass: 'is-active'

});