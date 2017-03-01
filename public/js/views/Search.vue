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
                items: [],
            }
        },
        components: {
            SummaryCards
        },
        mounted() {
            this.getTags();
        },
        methods: {
            getTags() {
                axios.get(MET_BASE_URI() + 'portfolio/tag/' + this.$route.params.tag)
                    .then((res) => {
                        this.items = [];
                        console.log(res);
                        if (res.data.results.length > 0) {
                            const results = res.data.results;
                            results.forEach((item) => {
                                const newItem = {
                                    cover: '/uploads/' + (item.coverImage || 'upload_image.svg'),
                                    id: item._id,
                                    type: 'project',
                                    title: item.title,
                                    desc: item.description,
                                    liveDemo: item.liveDemo,
                                    githubRepo: item.githubRepo,
                                    tags: item.tags,
                                    isSearch: true
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