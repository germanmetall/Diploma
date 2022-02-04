<template>
	<header class="header">
		<nav class="nav">
            <router-link class="nav__item heading heading--big" to="/">Главная</router-link>
            <router-link class="nav__item heading heading--big" to="/courses">Мои курсы</router-link>
            <router-link class="nav__item heading heading--big" to="/profile">
              	<img src="" class="nav__avatar"/>
            </router-link>
        </nav>
	</header>
</template>

<script>
export default {
  	name: 'Header',
    mounted: function(){
		let currTitle = this.$route.meta.title;
		let elems = document.querySelectorAll(".nav__item");
		let newArr = Array.from(elems).filter(el => {
			return el.innerText == currTitle
		});
		if(newArr[0]) newArr[0].classList.add("active");
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.header{
	position: relative;
	z-index: 2;
	top: 0;
	left: 0;
	width: 80vw;
	height: 100px;
	margin: 0 auto;
	filter: drop-shadow(0 4px 2px map-get($colors, "shadow1"));
	transition: map-get($transitions, "ultra");
	&:hover{
		filter: drop-shadow(0 4px 2px map-get($colors, "shadow2"));
	}
}
.nav{
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0 auto;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;

	background: map-get($colors, "bg1");
	border-radius: 0 0 48px 48px;
	&__item{
		text-decoration: unset;
		color: map-get($colors, "black");
		transition: map-get($transitions, "fast");
	}
}
.active{
	font-size: 3.75rem;
	text-shadow: 0 0 4px map-get($colors, "shadow2");
}
</style>