<template>
    <div>
        <h2 class="title is-2">Reset Password</h2>
        <hr>
        <div class="message is-success" v-show="passwordReset">
            <div class="message-body">
                <h3>
                    <strong> {{ passwordReset }}</strong>
                </h3>
            </div>
        </div>

        <div class="message is-danger" v-show="form.getErrors().length > 0">
            <div class="message-body">
                <ul>
                    <li class="padding-left-10" v-for="err in form.getErrors()" v-text="err"></li>

                </ul>
            </div>
        </div>
        
        <form method="post" @submit.prevent="onSubmit">
            <div class="control">

                <label class="label">Password</label>
                <p class="control has-icon has-icon-left">
                    <input class="input" type="password" name="password" v-model="form.password">
                    <span class="icon is-small"><i class="fa fa-key"></i></span>
                </p>
                
                <label class="label">Confirm Password</label>
                <p class="control has-icon has-icon-left">
                    <input class="input" type="password" name="confirmPassword" v-model="form.confirmPassword"> 
                    <span class="icon is-small"><i class="fa fa-key"></i></span>
                </p>

                <p class="control">
                    <button type="submit" class="button is-primary">Reset Password</button>
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
                    password: '',
                    confirmPassword: ''
                }),
                user: auth.user,
                passwordReset: undefined
            }
        },
        mounted(){
            auth.checkAuth();
            if (this.user.authenticated) {
                this.$router.push('/');
            }
        },
        methods: {
            onSubmit(){
                this.passwordReset = undefined;
                this.form.errors.clear();

                auth.reset({
                    token: this.$route.params.token,
                    password: this.form.password,
                    confirmPassword: this.form.confirmPassword,
                }, (err, data) => {
                    if (err) {
                        this.form.errors.record(err.message);
                    } else {
                        this.passwordReset = data.message;
                        this.form.reset();
                    }
                });
            }
        }
    }
</script>