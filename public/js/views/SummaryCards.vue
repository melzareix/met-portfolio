<template>
    <div>
        <div class="is-full" v-show="items.length == 0">
            <img src=""/>
            <h1 class="smiley-face has-text-centered">:(</h1><br>

            <h2 class="title is-2 has-text-centered	">We are sorry no portfolios are available at the moment.</h2>
            <h2 class="subtitle is-3 has-text-centered">Try again later.</h2>
        </div>

        <div class="columns is-multiline" style="margin-bottom: 0">
            <card v-for="item in items" :cover="item.profilePic">
                <p slot="title">{{item.title}}</p>
                <p slot="desc" class="subtitle"> {{ item.desc }} </p>
                <div class="menu" slot="top-work">
                    <p class="menu-label">
                        Top Work
                    </p>
                    <ul class="menu-list">
                        <li v-for="work in item.works">
                            <router-link :to="'/project/'  + work.id">{{ work.title }}</router-link>
                        </li>
                    </ul>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
    import Card from '../components/Card.vue';
    import axios from 'axios';
    export default{
        props: ['items'],
        components: {Card}
    }
</script>