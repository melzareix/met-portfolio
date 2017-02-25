<template>
    <div>
        <h2 class="title is-2">Signup</h2>
        <hr>

        <div class="message is-danger" v-show="formErrors.length > 0">
            <div class="message-body">
                <h3>
                    <strong>Please Correct the following errors :-</strong>
                </h3>
                <ul>
                    <li class="padding-left-10" v-for="err in formErrors" v-text="err"></li>

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

        <form method="post" @submit.prevent="onSubmit">
            <div class="control">
                <label class="label">First Name*</label>
                <p class="control">
                    <input class="input" type="text" name="firstName" placeholder="Slim" v-model="firstName">
                </p>

                <label class="label">Last Name*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" name="lastName" placeholder="Abdelnader" v-model="lastName">
                </p>

                <label class="label">Profile Picture</label>
                <p class="control has-icon has-icon-right">
                    <input type="file" name="profilePic" accept="image/*" @change="fileChanged">
                </p>

                <label class="label">Email*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" name="email" placeholder="balabizo@student.guc.edu.eg"
                           v-model="email">
                </p>

                <label class="label">Password*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" name="password" type="password" v-model="password">
                </p>

                <label class="label">Confirm Password*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" name="confirmPassword" type="password" v-model="confirmPassword">
                </p>

                <label class="label">GUC ID*</label>
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="XX-XXXX" name="gucId" v-model="gucId">
                </p>

                <label class="label">Bio*</label>
                <p class="control">
                    <textarea class="textarea" name="bio" v-model="bio"></textarea>
                </p>

                <p class="control">
                    <button type="submit" class="button is-primary">Submit</button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        data() {
            return {
                firstName: '',
                lastName: '',
                gucId: '',
                bio: '',
                email: '',
                password: '',
                confirmPassword: '',
                profilePic: '',
                hasErrors: false,
                formErrors: [],
                signedUp: false
            }
        },
        methods: {
            onSubmit(){
                this.formErrors = [];
                this.signedUp = false;
                axios.post('/api/v1/auth/signup', {
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "gucId": this.gucId,
                    "bio": this.bio,
                    "email": this.email,
                    "password": this.password,
                    "confirmPassword": this.confirmPassword
                }).then((res) => {
                    this.signedUp = true;
                }).catch((res) => {
                    res.response.data.message.forEach((err) => {
                        this.formErrors.push(err);
                    });
                })

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