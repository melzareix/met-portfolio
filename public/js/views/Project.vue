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
                <div v-if="isOwner">
                    <hr>
                    <router-link :to="'/project/edit/' + item._id" class="button is-info">Edit</router-link>
                    <a href="#" class="button is-danger" @click.prevent="delItem"> Delete</a>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '../helpers/vue-auth.js';
    export default {
        data() {
            return {
                item: '',
                user: auth.user,
                isOwner: false
            }
        },

        mounted() {
            axios.get(MET_BASE_URI() + 'portfolio/view/' + this.$route.params.id)
                .then((res) => {
                    this.item = res.data;
                    this.item.coverImage = '/uploads/' + (this.item.coverImage || 'upload_image.svg');
                    this.isOwner = (this.user.userID() === this.item._creator);
                }).catch((err) => {
                this.$router.push('/404');
            });
        },
        methods: {
            delItem(){
                var self = this;
                this.$swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this Work Item!",
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    type: "warning",
                    html: false
                }).then(() => {
                    axios
                        .post(MET_BASE_URI() + 'portfolio/delete/', {
                            id: this.$route.params.id
                        }, {
                            headers: {
                                'Authorization': auth.getAuthHeader()
                            }
                        }).then((res) => {
                        self.$swal('Item Deleted', '', 'success')
                            .then(() => {
                                this.$router.push('/');
                            });
                    });
                });
            }
        }
    }
</script>