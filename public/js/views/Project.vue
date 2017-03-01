<script src="../app.js"></script>
<template>
    <div class="columns is-multiline">
        <div class="column is-6 ">
            <img src="/uploads/dummy/projects/z.png" alt="Cover">
            <br/>
        </div>
        <div class="column is-6 content">
            <h1>Bulma</h1>
            <hr>
            <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur maxime distinctio officia cumque, dolorem
                eum, quam nihil quod magnam eligendi numquam deleniti odit exercitationem minus amet veritatis. Nisi, eius!
                Ipsum?
            </p>

            <hr>
            <div>
                <p>
                    <i class="fa fa-eye" aria-hidden="true"></i>
                    <a class="subtitle work-link" href="#">VISIT PROJECT</a>
                </p>

                <p>
                    <i class="fa fa-github" aria-hidden="true"></i>
                    <a class="subtitle work-link" href="#">GITHUB REPO</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                item: undefined
            }
        },

        mounted() {}
    }
</script>