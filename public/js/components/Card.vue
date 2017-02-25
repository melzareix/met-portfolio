<!--suppress HtmlUnknownTarget -->
<template>
    <div class="column is-one-quarter">
        <div class="card">
            <div class="card-image">
                <figure class="image">
                    <img :src="cover" alt="Card Item">
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <p class="title">
                        <slot name="title"></slot>
                    </p>
                    <slot name="desc"></slot>
                    <slot name="top-work"></slot>
                </div>

                <div class="card-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['cover']
    }
</script>

<style>
    .card-title a {
        color: inherit;
        text-decoration: none;
    }
</style>