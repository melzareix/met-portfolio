<template>
    <div class="columns is-multiline" style="margin-bottom: 0">
        <div class="is-full" v-show="noItems">
            <h1 class="title is-1">Fuck You</h1>
        </div>
        <card v-for="item in items" :cover="item.cover">
            <p slot="title">{{item.title}}</p>
            <p slot="desc" class="subtitle"> {{item.desc}} </p>
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
</template>

<script>
    import Card from './Card.vue';
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
                                cover: item._creator.profilePic,
                                title: item._creator.firstName + ' ' + item._creator.lastName,
                                desc: item.description,
                                works: item.works.map(function (i) {
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