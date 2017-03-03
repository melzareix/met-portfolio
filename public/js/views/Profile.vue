<template>
    <div v-show="user.firstName">
        <h2 class="title">Personal Information</h2>
        <hr>
        <div class="bio columns">
            <div class="column is-3">
                <img :src="'/uploads/' + user.profilePic" alt="Profile Picture"/>
            </div>
            <div class="column is-6 content is-medium">
                <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
                <p>
                    {{ user.bio }}
                </p>
            </div>
        </div>

        <hr>

        <div>
            <h2 class="title">Portfolio</h2>
            <summary-cards :items="items"></summary-cards>
            <br>
        </div>
    </div>
</template>

<script>
    import SummaryCards from './SummaryCards.vue';
    export default {
        data() {
            return {
                user: '',
                items: []
            }
        },
        components: {
            SummaryCards
        },

        mounted() {
            axios.get(MET_BASE_URI() + 'portfolio/profile/' + this.$route.params.id)
                .then((res) => {
                    console.log(res);
                    this.user = res.data;
                    res.data.portfolio.forEach((item) => {
                        this.items.push({
                            cover: '/uploads/' + (item.coverImage || 'upload_image.svg'),
                            id: item._id,
                            type: 'project',
                            title: item.title,
                            desc: item.description,
                            liveDemo: item.liveDemo,
                            githubRepo: item.githubRepo,
                            tags: item.tags,
                            isSearch: true
                        });
                    })
                }).catch((err) => {
                this.$router.push('/404');
            });
        }
    }
</script>