<template>
    <div class="columns is-multiline">
        <div class="column is-6 ">
            <img :src="item.coverImage" alt="Cover">
            <br/>
        </div>
        <div class="column is-6 content">
            <h1>{{ item.title }}</h1>
            <hr>
            <p class="subtitle">{{ item.description }}</p>

            <hr>
            <div>
                <p v-if="item.liveDemo">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                    <a class="subtitle work-link" :href="item.liveDemo">VISIT PROJECT</a>
                </p>

                <p v-if="item.githubRepo">
                    <i class="fa fa-github" aria-hidden="true"></i>
                    <a class="subtitle work-link" :href="item.githubRepo">GITHUB REPO</a>
                </p>

                <div class="tags">
                    <router-link v-for="tag in item.tags" class="tag is-dark" :to="'/search/' + tag.name">{{tag.name}}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                item: ''
            }
        },

        mounted() {
            axios.get(MET_BASE_URI() + 'portfolio/view/' + this.$route.params.id)
                .then((res) => {
                    this.item = res.data;
                    this.item.coverImage = '/uploads/' + (this.item.coverImage || 'upload_image.svg');
                }).catch((err) => {
                this.$router.push('/404');
            });
        }
    }
</script>