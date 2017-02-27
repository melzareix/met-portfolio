<template>
    <div>
        <h2 class="title is-2">Signup</h2>
        <hr>

        <div class="message is-danger" v-show="form.getErrors().length > 0">
            <div class="message-body">
                <h3>
                    <strong>Please Correct the following errors :-</strong>
                </h3>
                <ul>
                    <li class="padding-left-10" v-for="err in form.getErrors()" v-text="err"></li>

                </ul>
            </div>
        </div>

        <div class="message is-success" v-show="signedUp">
            <div class="message-body">
                <h3>
                    <strong> Signup Successful</strong>
                </h3>
            </div>
        </div>

        <form method="post" @submit.prevent="onSubmit" enctype="multipart/form-data">
            <div class="control">
                <label class="label">First Name*</label>
                <p class="control">
                    <input class="input" type="text" name="firstName" placeholder="Slim" v-model="form.firstName">
                </p>

                <label class="label">Last Name*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" name="lastName" placeholder="Abdelnader" v-model="form.lastName">
                </p>

                <label class="label">Profile Picture</label>
                <p class="control has-icon has-icon-right">
                    <input type="file" name="profilePic" accept="image/*" @change="fileChanged">
                </p>

                <label class="label">Email*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" name="email" placeholder="balabizo@student.guc.edu.eg"
                           v-model="form.email">
                </p>

                <label class="label">Password*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" name="password" type="password" v-model="form.password">
                </p>

                <label class="label">Confirm Password*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" name="confirmPassword" type="password" v-model="form.confirmPassword">
                </p>

                <label class="label">GUC ID*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="XX-XXXX" name="gucId" v-model="form.gucId">
                </p>

                <label class="label">Bio*</label>
                <p class="control">
                    <textarea class="textarea" maxlength="300" placeholder="Describe Yourself and your work ..."
                              name="bio" v-model="form.bio"></textarea>
                    <span class="help">{{ 300 - form.bio.length }} Characters left</span>
                </p>

                <p class="control">
                    <button type="submit" class="button is-primary">Submit</button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
    import auth from '../helpers/vue-auth';
    import Form from '../helpers/vue-form';

    export default{
        data() {
            return {
                form: new Form({
                    firstName: '',
                    lastName: '',
                    gucId: '',
                    bio: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    profilePic: ''
                }),
                signedUp: false,
                user: auth.user
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
                this.signedUp = false;
                let data = new FormData();

                data.append('firstName', this.form.firstName);
                data.append('lastName', this.form.lastName);
                data.append('gucId', this.form.gucId);
                data.append('bio', this.form.bio);
                data.append('email', this.form.email);
                data.append('password', this.form.password);
                data.append('confirmPassword', this.form.confirmPassword);
                data.append('profilePic', this.form.profilePic);

                this.form.errors.clear();
                auth.signup(data, (err, data) => {
                    if (err) {
                        this.form.errors.record(err.message);
                        window.scrollTo(0, 0);
                    } else {
                        this.signedUp = true;
                        this.form.reset();
                        window.scrollTo(0, 0);
                        setTimeout(() => {
                            this.$router.push('/login')
                        }, 1000);
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