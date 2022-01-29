<template>
	<div class="page">
  		<Header></Header>

		<main class="main">
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[0]"></span>
					<img class="article__img" src="" alt=""/>
				</article>
			</section>
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[1]"></span>
					<img class="article__img" src="" alt=""/>
				</article>
			</section>
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[2]"></span>
					<img class="article__img" src="" alt=""/>
				</article>
			</section>
		</main>
	</div>
</template>

<script>
import Header from "../components/Header.vue";
let md = require('markdown-it')({
	html: true
});

export default {
  	name: 'Home',
	components: {
		Header
	},
	data: function() {
		return {
			texts: undefined
		};
	},
	mounted: async function() {
		let resp = await this.$options.API.data().Text.get();
		let body = await resp.json();
		this.texts = [
			body.data.attributes["Main_1"],
			body.data.attributes["Main_2"],
			body.data.attributes["Main_3"],
		];
		this.texts = this.texts.map(el => md.render(el));
	}
}
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";
@import "../../../variables.scss";

.main{
	max-width: unset;
}

.screen{
	width: 100%;
	height: 60vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	&:nth-of-type(2n){
		.article{
			flex-direction: row-reverse;
		}
	}
}

.article{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	&__text{
		font-size: 1.5rem;
	}
	&__img{
		width: 200px;
		height: 400px; //temp
	}
}
</style>