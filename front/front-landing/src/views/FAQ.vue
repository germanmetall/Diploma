<template>
	<div class="page">
  		<Header></Header>
		<main class="main">
			<section class="FAQ" v-if="questions">
				<article class="question" v-for="(question, counter) of questions" :key="question" @click="toggleQuestion(counter)">
					<span class="heading heading--medium">{{question.attributes.Question}}</span>
					<div class="question__answer" v-html="question.attributes.Answer"></div>
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
  	name: 'FAQ',
	components: {
		Header
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
			questions: undefined
		}
	},
	mounted: async function() {
		let resp = await this.$options.API.data().FAQ.get();
		let body = await resp.json();
		this.questions = body.data;
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
</style>