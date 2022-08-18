<template>
    <div class="popup" ref="popup">
        <span class="heading heading--medium popup__heading">Очікуйте завантаження інформації</span>
        <img class="popup__spinner" src="@/assets/spinner.svg"/>
    </div>
</template>
<script>
export default {
    name: "Spinner",
    mounted(){
        this.$refs.popup.style.opacity = 1;
    }
}
</script>
<style lang="scss" scoped>
.popup{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 150px;
    left: calc(50vw - 250px);
    width: 500px;
    opacity: 0;
    transition: 1s;
    background-color: #ffffffb0;
    border-radius: 28px 28px 12px 12px;
}
</style>