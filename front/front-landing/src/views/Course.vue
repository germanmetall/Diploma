<template>
	<div class="page">
  		<Header></Header>
		<main class="main">
			<article class="course" v-if="course">
				<span class="heading heading--medium">{{course.attributes.Heading}}</span>
				<img class="course__teacher" v-if="course.attributes.Icon" :src="'http://localhost:1337'+course.attributes.Icon.data.attributes.url"/>
				<section class="course__info">
					<span class="course__text" v-html="course.attributes.Description_long"></span>
					<span class="course__price">{{course.attributes.Price}}</span>
					<!-- Оплата -->
					<div class="course__pay">
						Оплатить
					</div>
				</section>
			</article>
		</main>
	</div>
</template>

<script>
import Header from "../components/Header.vue";
let md = require('markdown-it')({
	html: true
});

export default {
  	name: 'Course',
	components: {
		Header
	},
	data: function() {
		return {
			id: this.$route.params.id,
			payData: undefined,
			course: undefined
		};
	},
	methods: {
		ok(e){
			console.log(e);
		},
		error(e){
			console.log(e);
		}
	},
	mounted: async function() {
		let resp = await this.$options.API.data().Courses.getById(this.id);
		let body = await resp.json();
		this.course = body.data;
		this.course.attributes['Description_long'] = md.render(this.course.attributes['Description_long']);
		document.title = this.course.attributes.Heading;
		this.payData = JSON.stringify({
			version: 3,
			public_key: "",
			action: "pay",
			amount: +this.course.attributes.price,
			currency: "UAH",
			description: "",
			order_id: ""+this.course.id,
			result_url: "result",
			server_url: "server"
		});
	}
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.course{
	width: 100%;
	background: map-get($colors, "bg2");
	@include card();
	&__info{
		background: map-get($colors, "bg1");
	}
	&__teacher{
		position: absolute;
		top: -24px;
		right: -24px;
		width: 96px;
		height: 96px;
		background: chocolate;
		border-radius: 100%;
	}
	&__text{
		font-size: 1.25rem;
	}
	&__price, &__pay{
		position: relative;
		display: inline-block;
		width: 50%;
		padding: 24px 0;
		transition: map-get($transitions, "fast");
		color: map-get($colors, "black");
		font-size: 1.25rem;
	}
	&__price::after{
		content: " грн";
	}
	&__pay{
		width: 40%;
	}
}
</style>