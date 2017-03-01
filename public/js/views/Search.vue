<script src="../app.js"></script>
<template>
    <div>
        <h2 class="title is-2">Search results for: <strong><i>{{ $route.params.tag}}</i></strong></h2>
        <hr>

        <summary-cards :items="items"></summary-cards>
    </div>
</template>

<script>
    import SummaryCards from './SummaryCards.vue';
    import Awesomplete from 'awesomplete';
    export default {
        data() {
            return {
                items: []
            }
        },
        components: {
            SummaryCards
        },
        mounted() {
            this.getSummary();
        },
        methods: {
            getSummary() {
                axios.get('http://localhost:3000/api/v1/portfolio/tag/' + this.$route.params.tag)
                    .then((res) => {
                        this.items = [];
                        console.log(res);
                        if (res.data.results.length > 0) {
                            const results = res.data.results;
                            results.forEach((item) => {
                                const newItem = {
                                    cover: 'uploads/' + (item.cover || 'default-pic.png'),
                                    title: item.title,
                                    desc: item.description
                                };
                                this.items.push(newItem);
                            });
                            window.scrollTo(0, 0);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        // Handle error
                    });

                console.log(this.items);
            }
        }
    }
</script>