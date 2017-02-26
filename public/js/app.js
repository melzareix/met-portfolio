import Vue from 'vue';
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import router from './routes/routes';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

new Vue({
    el: '#root',
    data: {
        name: ''
    },
    router
    ,
    components: {
        Navbar,
        Home,
        'signup-form': Signup,
        'login-form': Login
    }
});

