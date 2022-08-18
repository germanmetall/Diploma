<template>
	<div class="page">
  		<landingHeader></landingHeader>

		<main class="main">
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[0]"></span>
					<img class="article__img" v-if="imgs[0]" :src="imgs[0].data.attributes.url"/>
				</article>
			</section>
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[1]"></span>
					<img class="article__img" v-if="imgs[1]" :src="imgs[1].data.attributes.url"/>
				</article>
			</section>
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[2]"></span>
					<img class="article__img" v-if="imgs[2]" :src="imgs[2].data.attributes.url"/>
				</article>
			</section>
		</main>
	</div>

	<Spinner v-if="loading"></Spinner>
</template>

<script>
import landingHeader from "../components/landingHeader.vue";
import Spinner from "../components/Spinner.vue";
let md = require('markdown-it')({
	html: true
});

export default {
  	name: 'landingHome',
	components: {
		landingHeader,
		Spinner
	},
	data: function() {
		return {
			texts: undefined,
			imgs: [],
			loading: undefined
		};
	},
	mounted: async function() {
		setTimeout(()=>{
			if(this.loading === undefined) this.loading = true;
		}, 1000);
		let resp = await this.$options.landingAPI.data().Text.get();
		let body = await resp.json();
		this.loading = false;
		this.texts = [
			body.data.attributes["Main_1"],
			body.data.attributes["Main_2"],
			body.data.attributes["Main_3"],
		];
		if(body.data.attributes["Medias"]) this.imgs = body.data.attributes["Medias"];
		this.texts = this.texts.map(el => md.render(el));
	}
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.main{
	max-width: 900px;
	margin: 0 auto;
}

.screen{
	width: 100%;
	height: 40vh;
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
	gap: 192px;
	&__text{
		font-size: 1.5rem;
		padding: 24px;
	}
	&__img{
		max-width: 300px;
		max-height: 300px;
		object-fit: cover;
	}
}
</style>