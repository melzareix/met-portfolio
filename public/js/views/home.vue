<template>
    <div>
        <form class="control has-addons has-addons-centered" method="get" @submit.prevent="searchSubmitted">
            <input type="text" class="input search-txt" placeholder="Search by keyword ..." v-model="query"
                   @awesomplete-select="suggestionChanged">
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

<style>
    [hidden] {
        display: none;
    }

    .visually-hidden {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }

    div.awesomplete {
        display: inline-block;
        position: relative;
    }

    div.awesomplete > input {
        display: block;
    }

    div.awesomplete > ul {
        position: absolute;
        left: 0;
        z-index: 1;
        min-width: 100%;
        box-sizing: border-box;
        list-style: none;
        padding: 0;
        border-radius: .3em;
        margin: .2em 0 0;
        background: hsla(0, 0%, 100%, .9);
        background: linear-gradient(to bottom right, white, hsla(0, 0%, 100%, .8));
        border: 1px solid rgba(0, 0, 0, .3);
        box-shadow: .05em .2em .6em rgba(0, 0, 0, .2);
        text-shadow: none;
    }

    div.awesomplete > ul[hidden],
    div.awesomplete > ul:empty {
        display: none;
    }

    @supports (transform: scale(0)) {
        div.awesomplete > ul {
            transition: .3s cubic-bezier(.4, .2, .5, 1.4);
            transform-origin: 1.43em -.43em;
        }

        div.awesomplete > ul[hidden],
        div.awesomplete > ul:empty {
            opacity: 0;
            transform: scale(0);
            display: block;
            transition-timing-function: ease;
        }
    }

    div.awesomplete > ul > li {
        position: relative;
        padding: .2em .5em;
        cursor: pointer;
    }

    div.awesomplete mark {
        background: hsl(65, 100%, 50%);
    }

    div.awesomplete li:hover mark {
        background: hsl(68, 100%, 41%);
    }

    div.awesomplete li[aria-selected="true"] mark {
        background: hsl(86, 100%, 21%);
        color: inherit;
    }

    .awesomplete > ul:before {
        display: none;
    }

    .awesomplete > ul > li[aria-selected="true"] {
        background: #00f3cf;
        color: white;
    }

    .awesomplete > ul > li:hover {
        background: rgba(0, 209, 178, 1.0);
        color: white;
    }
</style>