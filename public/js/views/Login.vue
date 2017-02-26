<template>
    <div>
        <h2 class="title is-2">Login</h2>
        <hr>

        <div class="message is-danger" v-show="formErrors.length > 0">
            <div class="message-body">
                <ul>
                    <li class="padding-left-10" v-for="err in formErrors" v-text="err"></li>

                </ul>
            </div>
        </div>

        <div class="message is-success" v-show="loggedIn">
            <div class="message-body">
                <h3>
                    <strong> Login Successful</strong>
                </h3>
            </div>
        </div>
        <form method="post" @submit.prevent="onSubmit">
            <div class="control">

                <label class="label">Email</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" name="email" placeholder="balabizo@student.guc.edu.eg"
                           v-model="email">
                </p>

                <label class="label">Password</label>
                <p class="control">
                    <input class="input" name="password" type="password" v-model="password">
                    <a href="#" class="help is-dark">Forgot password ?</a>
                </p>


                <p class="control">
                    <button type="submit" class="button is-primary">Submit</button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
    import auth from '../helpers/vue-auth.js';
    export default{
        data() {
            return {
                email: '',
                password: '',
                formErrors: [],
                loggedIn: false,
                user: auth.user
            }
        },
        mounted(){
            auth.checkAuth();
            if (this.user.authenticated) {
                this.$router.push('/');
            }
        }
        ,
        methods: {
            onSubmit(){
                this.formErrors = [];
                this.loggedIn = false;

                auth.login({
                    email: this.email,
                    password: this.password
                }, (err, data) => {
                    if (err) {
                        this.formErrors = err.message;
                    } else {
                        this.loggedIn = true;
                        setTimeout(() => {
                            this.$router.push('/')
                        }, 500);
                    }
                });
            },
            fileChanged(e){
                const files = e.target.files || e.dataTransfer.files;
                if (files.length > 0) {
                    this.profilePic = files[0];
                }

            }
        }
    }
</script>