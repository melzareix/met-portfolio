<!--suppress HtmlUnknownTarget -->
<template>
    <nav class="nav">
        <div class="nav-left">
            <a class="nav-item" href="#"><img :src="logo" :width="width" alt="logo"></a>
        </div>
        <ul class="nav-right nav-menu is-active">
            <slot></slot>
        </ul>

    </nav>
</template>

<script>
    export default{
        name: 'navbar',
        props: ['logo', 'width']
    }
</script>

<style>
    .nav ul {
        padding: 10px;
    }

    .nav a {
        font-weight: bold;
        font-size: 1.2em;
        color: #5CB85C;
    }

    .nav a:hover {
        text-decoration: underline;
    }
</style>