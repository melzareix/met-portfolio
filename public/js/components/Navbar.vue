<!--suppress HtmlUnknownTarget -->
<template>
    <nav class="nav">
        <div class="nav-left">
            <a class="nav-item" href="/"><img :src="logo" :width="width" alt="logo"></a>
        </div>
        <ul class="nav-right">
            <li v-show="1 == 1">
                <router-link to="/signup" class="nav-item nav-link">
                    Signup
                </router-link>
            </li>

            <li>
                <router-link to="/login" class="nav-item nav-link">
                    Login
                </router-link>
            </li>
        </ul>

    </nav>
</template>

<script>
    import auth from '../helpers/vue-auth';
    export default {
        name: 'navbar',
        props: ['logo', 'width'],
        data() {
            return {
                user: auth.user
            }
        }
    }
</script>

<style>
    .nav ul {
        padding: 10px;
    }

    .nav a {
        font-weight: bold;
        font-size: 1.2em;
    }

    .nav a:hover {
        text-decoration: underline;
    }
</style>