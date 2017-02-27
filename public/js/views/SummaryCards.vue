<template>
    <div>
        <div class="is-full" v-show="noItems">
            <img src=""/>
            <h1 class="smiley-face has-text-centered">:(</h1><br >

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
                        <li v-for="work in item.works"><a href="#">{{ work.title }}</a></li>
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
        components: {Card},
        data(){
            return {
                items: [],
                noItems: false
            }
        },
        mounted() {
            axios.get('http://localhost:3000/api/v1/portfolio/summary/1')
                .then((res) => {
                    const data = res.data;
                    if (data.results.length > 0) {
                        const results = data.results;
                        results.forEach((item) => {
                            const newItem = {
                                profilePic: 'uploads/' + item.profilePic,
                                title: item.firstName + ' ' + item.lastName,
                                desc: item.bio,
                                works: item.portfolio.map(function (i) {
                                    return {title: i.title};
                                })
                            };
                            this.items.push(newItem);
                        })
                    } else {
                        this.noItems = true;
                    }
                })
                .catch((err) => {

                });
        }
    }
</script>