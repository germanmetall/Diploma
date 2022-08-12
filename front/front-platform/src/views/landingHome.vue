<template>
	<div class="page">
  		<landingHeader></landingHeader>

		<main class="main">
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[0]"></span>
					<img class="article__img" src="https://dovidka.biz.ua/wp-content/uploads/2021/06/mif-pro-afinu-skorocheno.jpg" alt=""/>
				</article>
			</section>
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[1]"></span>
					<img class="article__img" src="https://www.dlit.dp.ua/wp-content/uploads/2021/04/%D0%93%D1%80%D0%B8%D0%B3%D0%BE%D1%80%D1%94%D0%B2-%D0%A1.%D0%91.png" alt=""/>
				</article>
			</section>
			<section class="screen" v-if="texts">
				<article class="article">
					<span class="article__text" v-html="texts[2]"></span>
					<img class="article__img" src="https://image.shutterstock.com/image-vector/graduation-hat-diploma-isolated-on-260nw-1933030322.jpg" alt=""/>
				</article>
			</section>
		</main>
	</div>
</template>

<script>
import landingHeader from "../components/landingHeader.vue";
let md = require('markdown-it')({
	html: true
});

export default {
  	name: 'landingHome',
	components: {
		landingHeader
	},
	data: function() {
		return {
			texts: undefined
		};
	},
	mounted: async function() {
		let resp = await this.$options.landingAPI.data().Text.get();
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