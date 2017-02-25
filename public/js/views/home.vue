<template>
    <div>
        <form class="control has-addons has-addons-centered" method="get">
            <input type="text" class="input search-txt" placeholder="Search by keyword ...">
            <a class="button is-outlined is-success">Search</a>
        </form>

        <hr>

        <summary-cards></summary-cards>
    </div>
</template>

<script>
    import SummaryCards from '../components/SummaryCards.vue';
    export default {
        components: {
            SummaryCards
        }
    }
</script>