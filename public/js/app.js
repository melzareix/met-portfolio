import Vue from 'vue';
import Card from './components/Card.vue';
import Navbar from './components/Navbar.vue';
import summaryCard from './components/SummaryCards.vue';
import Home from './views/home.vue';

new Vue({
    el: '#root',
    data: {
        name: ''
    },
    components: {
        Navbar,
        Home
    }
});