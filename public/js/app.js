import Vue from 'vue';
import Card from './components/Card.vue';
import Navbar from './components/Navbar.vue';

new Vue({
    el: '#root',
    data: {
        name: ''
    },
    components: {Navbar, Card}
});