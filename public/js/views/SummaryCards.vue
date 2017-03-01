<template>
    <div>
        <div class="is-full" v-show="items.length == 0">
            <img src="" />
            <h1 class="smiley-face has-text-centered">:(</h1><br>

            <h2 class="title is-2 has-text-centered	">We are sorry no Items are available at the moment.</h2>
            <h2 class="subtitle is-3 has-text-centered">Try again later.</h2>
        </div>

        <div class="columns is-multiline" style="margin-bottom: 0">
            <card v-for="item in items" :cover="item.cover">
                <p slot="title">{{item.title}}</p>
                <div slot="desc">
                    <p class="subtitle">{{ item.desc }}</p>

                    <p class="work-item-detail" v-show="item.liveDemo">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                        <a class="subtitle work-link" :href="item.liveDemo">VISIT PROJECT</a>
                    </p>

                    <p class="work-item-detail" v-show="item.githubRepo">
                        <i class="fa fa-github" aria-hidden="true"></i>
                        <a class="subtitle work-link" :href="item.githubRepo">GITHUB REPO</a>
                    </p>
                </div>

                <div class="menu" slot="top-work" v-show="item.isSummary">
                    <p class="menu-label">
                        Top Work
                    </p>
                    <ul class="menu-list">
                        <li v-for="work in item.works">
                            <router-link :to="'/project/'  + work.id">{{ work.title }}</router-link>
                        </li>
                    </ul>
                </div>

                <div slot="footer" v-show="item.isSearch">
                    <span class="card-footer-item" style="border:none"></span>
                    <div class="tags has-text-centered">
                        <a v-for="tag in item.tags" class="tag is-dark" :href="'/search/' + tag.name">{{tag.name}}</a>
                    </div>

                </div>
            </card>
        </div>
    </div>
</template>

<script>
    import Card from '../components/Card.vue';
    export default {
        props: ['items'],
        components: {
            Card
        }
    }
</script>

<style>
    .tag:hover {
        background: #0a0a0a;
    }
    
    .fa-github {
        font-size: 1.5rem;
    }
    
    .fa-eye {
        font-size: 1.5rem;
    }
    
    .work-link {
        font-size: 1rem;
    }
    
    .work-item-detail:not(:last-child) {
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
    }
</style>