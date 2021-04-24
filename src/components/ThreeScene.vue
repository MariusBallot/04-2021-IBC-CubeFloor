<template>
    <div class="threeScene">
        <div class="threeScene_cta">
            <h1>Click Anywhere</h1>
        </div>
        <div class="container" ref="container"></div>
    </div>
</template>

<script>
import MainThreeScene from "@/classes/MainThreeScene";

export default {
    name: "ThreeScene",
    props: {
        msg: String,
    },
    mounted() {
        MainThreeScene.init(this.$refs.container);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

.threeScene {
    &_cta {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Poppins', sans-serif;
        color: white;
        text-shadow: black 5px 5px 10px;
    }
}
</style>
