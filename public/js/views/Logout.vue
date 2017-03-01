<template>

</template>
<script>
    import auth from '../helpers/vue-auth';
    import axios from 'axios';
    export default {
        mounted() {
            auth.logout();
            auth.checkAuth();
            if (!auth.user.authenticated) {
                this.$router.push('/login');
            } else {
                axios.post('/api/v1/auth/logout', null, {
                    headers: {
                        'Authorization': auth.getAuthHeader()
                    }
                }).then((data) => {
                    auth.checkAuth();
                    this.$router.push('/');
                }).catch((err) => {

                });
            }

        }
    }
</script>