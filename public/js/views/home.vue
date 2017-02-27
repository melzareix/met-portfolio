<template>
    <div>
        <form class="control has-addons has-addons-centered" method="get">
            <input type="text" class="input search-txt" placeholder="Search by keyword ...">
            <a class="button is-outlined is-success">Search</a>
        </form>

        <hr>

        <summary-cards :items="items"></summary-cards>

        <nav class="pagination is-centered">
            <ul class="pagination-list">
                <li v-for="i in Math.ceil(count/10)">
                    <a class="pagination-link is-warning" :class="{ 'is-current': (i === offset) }" @click="changePage">{{
                        i }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import SummaryCards from './SummaryCards.vue';
    export default {
        data() {
            return {
                items: [],
                count: 0,
                offset: 1
            }
        },
        components: {
            SummaryCards
        },
        mounted(){
            this.getSummary();
        },
        methods: {
            getSummary(){
                axios.get('http://localhost:3000/api/v1/portfolio/summary/' + this.offset)
                    .then((res) => {
                        this.items = [];
                        const data = res.data;
                        if (data.results.length > 0) {
                            const results = data.results;
                            this.count = data.count;
                            results.forEach((item) => {
                                const newItem = {
                                    profilePic: 'uploads/' + item.profilePic,
                                    title: item.firstName + ' ' + item.lastName,
                                    desc: item.bio,
                                    works: item.portfolio.map(function (i) {
                                        return {title: i.title, id: i._id};
                                    })
                                };
                                this.items.push(newItem);
                                window.scrollTo(0, 0);
                            })
                        }
                    })
                    .catch((err) => {
                        // Handle error
                    });
            },
            changePage(e){
                this.offset = parseInt(e.target.innerHTML);
                this.getSummary();
            }
        }
    }
</script>