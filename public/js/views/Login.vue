<template>
    <div>
        <h2 class="title is-2">Login</h2>
        <hr>

        <div class="message is-danger" v-show="form.getErrors().length > 0">
            <div class="message-body">
                <ul>
                    <li class="padding-left-10" v-for="err in form.getErrors()" v-text="err"></li>

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
                           v-model="form.email">
                </p>

                <label class="label">Password</label>
                <p class="control">
                    <input class="input" name="password" type="password" v-model="form.password">
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
    import Form from '../helpers/vue-form.js';

    export default{
        data() {
            return {
                form: new Form({
                    email: '',
                    password: '',
                }),
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
                this.loggedIn = false;
                this.form.errors.clear();

                auth.login({
                    email: this.form.email,
                    password: this.form.password
                }, (err, data) => {
                    if (err) {
                        this.form.errors.record(err.message);
                    } else {
                        this.loggedIn = true;
                        this.form.reset();
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