<template>
    <div>
        <h2 class="title is-2">Forgot Password</h2>
        <hr>
        <div class="message is-success" v-show="emailSent">
            <div class="message-body">
                <h3>
                    <strong> {{ emailSent }}</strong>
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

                <label class="label">Email</label>
                <p class="control has-icon has-icon-left">
                    <input class="input" type="text" name="email" placeholder="balabizo@student.guc.edu.eg"
                           v-model="form.email">
                                               <span class="icon is-small"><i class="fa fa-envelope"></i></span>
                </p>

                <p class="control">
                    <button type="submit" class="button is-primary">Send Reset Link</button>
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
                    email: ''
                }),
                user: auth.user,
                emailSent: undefined
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
                this.emailSent = undefined;
                this.form.errors.clear();

                auth.forgot({
                    email: this.form.email
                }, (err, data) => {
                    if (err) {
                        this.form.errors.record(err.message);
                    } else {
                        this.emailSent = data.message;
                        this.form.reset();
                    }
                });
            }
        }
    }
</script>