<template>
	<div class="page">
  		<landingHeader></landingHeader>
		<main class="main">
			<section class="FAQ" v-if="questions">
				<article class="question" v-for="(question, counter) of questions" :key="question" @click="toggleQuestion(counter)">
					<span class="heading heading--medium">{{question.attributes.Question}}</span>
					<div class="question__answer" v-html="question.attributes.Answer"></div>
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
  	name: 'FAQ',
	components: {
		landingHeader,
		Spinner
	},
	methods: {
		toggleQuestion(counter){
			document.querySelectorAll(".question__answer").forEach((el,c) => {
				if(!el.style.maxHeight && c==counter){
					el.style.maxHeight = el.scrollHeight + "px";
				}
				else{
					el.style.maxHeight = null;
				}
			})
		}
	},
	data: function(){
		return {
			questions: undefined,
			loading: undefined
		}
	},
	mounted: async function() {
		setTimeout(()=>{
			if(this.loading === undefined) this.loading = true;
		}, 1000);
		let resp = await this.$options.landingAPI.data().FAQ.get();
		let body = await resp.json();
		this.questions = body.data;
		this.loading = false;
		this.questions.map(el => {
			el.attributes["Answer"] = md.render(el.attributes["Answer"]);
		});
	}
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.FAQ{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.question{
	@include card();
	@include cardHover();
	cursor: pointer;
	width: 60%;
	padding: 24px;
	background: map-get($colors, "bg1");

	&__answer{
		max-height: 0;
  		overflow:hidden;
		transition: map-get($transitions, "medium");
		font-size: 1.25rem;
	}
}
@media screen and (max-width: 600px){
	.main{
		padding-top: 96px;
		.question{
			width: 96%;
			padding: 12px;
		}
	}
}
</style>