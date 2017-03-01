<script src="../app.js"></script>
<template>
    <div>
        <form class="control has-addons has-addons-centered" method="get" @submit.prevent="searchSubmitted">
            <input type="text" class="input search-txt" placeholder="Search by keyword ..." v-model="query" @awesomplete-select="suggestionChanged">
            <button class="button is-outlined is-success" type="submit">Search</button>
        </form>
        <hr>

        <summary-cards :items="items"></summary-cards>

        <nav class="pagination is-centered">
            <ul class="pagination-list">
                <li v-for="i in Math.ceil(count/8)">
                    <a class="pagination-link is-warning" :class="{ 'is-current': (i === offset) }" @click="changePage">{{
                        i }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import SummaryCards from './SummaryCards.vue';
    import Awesomplete from 'awesomplete';
    export default {
        data() {
            return {
                items: [],
                count: 0,
                offset: 1,
                search: undefined,
                query: '',
            }
        },
        components: {
            SummaryCards
        },
        mounted() {
            this.getSummary();
            this.getTags();
        },
        methods: {
            suggestionChanged(e) {
                this.query = e.text.value;
            },
            searchSubmitted() {
                this.$router.push('/search/' + this.query);
            },
            getSummary() {
                axios.get(MET_BASE_URI() + 'portfolio/summary/' + this.offset)
                    .then((res) => {
                        this.items = [];
                        const data = res.data;
                        if (data.results.length > 0) {
                            const results = data.results;
                            this.count = data.count;
                            results.forEach((item) => {
                                const newItem = {
                                    cover: 'uploads/' + item.profilePic,
                                    title: item.firstName + ' ' + item.lastName,
                                    desc: item.bio,
                                    type: 'profile',
                                    id: item.email.split("@")[0].toLowerCase(),
                                    isSummary: true,
                                    works: item.portfolio.map(function (i) {
                                        return {
                                            title: i.title,
                                            id: i._id
                                        };
                                    })
                                };
                                this.items.push(newItem);
                            });
                            window.scrollTo(0, 0);
                        }
                    })
                    .catch((err) => {
                        // Handle error
                    });
            },
            getTags() {
                axios.get(MET_BASE_URI() + 'portfolio/tags').then((res) => {
                    this.search = new Awesomplete(document.querySelector('.search-txt'), {
                        list: res.data.results,
                        minChars: 1
                    });
                    this.search.evaluate();
                }).catch((err) => {
                    // TODO: Handle Errors
                });
            },
            changePage(e) {
                this.offset = parseInt(e.target.innerHTML);
                this.getSummary();
            }
        }
    }
</script>

<style src="awesomplete/awesomplete.css"></style>