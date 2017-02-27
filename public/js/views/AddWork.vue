<template>
    <div>
        <h2 class="title is-2">Add Work</h2>
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

        <div class="message is-success" v-show="workAdded">
            <div class="message-body">
                <h3>
                    <strong> Work Added !</strong>
                </h3>
            </div>
        </div>

        <form method="post" @submit.prevent="onSubmit" enctype="multipart/form-data">
            <div class="control">
                <label class="label">Title*</label>
                <p class="control">
                    <input class="input" type="text" name="title" placeholder="I reinvented the wheel .."
                           v-model="form.title">
                </p>

                <label class="label">Live Demo</label>
                <p class="control">
                    <input class="input" type="text" name="link" placeholder="https://laracasts.com"
                           v-model="form.link">
                </p>

                <label class="label">Repo Link</label>
                <p class="control">
                    <input class="input" type="text" name="repo"
                           placeholder="https://github.com/melzareix/met-portfolio" v-model="form.repo">
                </p>

                <label class="label">Cover Image</label>
                <p class="control has-icon has-icon-right">
                    <input type="file" name="cover" accept="image/*" @change="fileChanged">
                </p>

                <label class="label">Description*</label>
                <p class="control">
                    <textarea class="textarea" maxlength="300" placeholder="I'm donna and I'm awesome ..." name="bio"
                              v-model="form.description"></textarea>
                    <span class="help">{{ 300 - form.description.length }} Characters left</span>
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
    import auth from '../helpers/vue-auth.js';
    import Form from '../helpers/vue-form.js';

    export default {
        data() {
            return {
                form: new Form({
                    title: '',
                    description: '',
                    link: '',
                    repo: '',
                    cover: ''
                }),
                workAdded: false,
                user: auth.user
            }
        },
        mounted(){
            auth.checkAuth();
            if (!this.user.authenticated) {
                this.$router.push('/');
            }
        },
        methods: {
            onSubmit() {
                let data = new FormData();
                this.workAdded = false;

                data.append('title', this.form.title);
                data.append('description', this.form.description);
                data.append('link', this.form.link);
                data.append('repo', this.form.repo);
                data.append('cover', this.form.cover);

                this.form.errors.clear();

                axios.post('http://localhost:3000/api/v1/portfolio/add', data, {
                    headers: {
                        'Authorization': auth.getAuthHeader()
                    }
                }).then((res) => {
                    this.workAdded = true;
                    setTimeout(() => {
                        this.$router.push('/'); // Change later
                    }, 1000);
                }).catch((err) => {
                    this.form.errors.record(err.response.data.message);
                    window.scrollTo(0, 0);
                })
            },
            fileChanged(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (files.length > 0) {
                    this.form.cover = files[0];
                }

            }
        }
    }
</script>