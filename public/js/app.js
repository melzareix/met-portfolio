import Vue from 'vue';
import Card from './components/Card.vue';
import Navbar from './components/Navbar.vue';
import summaryCard from './components/SummaryCards.vue';

new Vue({
    el: '#root',
    data: {
        name: ''
    },
    components: {Navbar, Card, 'summary-cards': summaryCard}
});