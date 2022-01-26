<template>
	<div class="page">
  		<Header></Header>
		<main class="main">
			<article class="course" v-if="course">
				<span class="heading heading--medium">{{course.attributes.Heading}}</span>
				<section class="course__info">
					<span class="course__text" v-html="course.attributes.Description_long"></span>
					<span class="course__price">{{course.attributes.Price}}</span>
					<!-- Оплата -->
					<div class="course__pay">

						<lp-provider lp-data="eyAidmVyc2lvbiIgOiAzLCAicHVibGljX2tleSIgOiAieW91cl9wdWJsaWNfa2V5IiwgImFjdGlv
biIgOiAicGF5IiwgImFtb3VudCIgOiAxLCAiY3VycmVuY3kiIDogIlVTRCIsICJkZXNjcmlwdGlv
biIgOiAiZGVzY3JpcHRpb24gdGV4dCIsICJvcmRlcl9pZCIgOiAib3JkZXJfaWRfMSIgfQ==" lp-signature="QvJD5u9Fg55PCx/Hdz6lzWtYwcI=" :onpaymentsuccess="ok($event)"  :onpaymenterror="error($event)">
							<lp-privat24-pay mode="black"></lp-privat24-pay>
						</lp-provider>
					
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
@import "../styles/global.scss";
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.course{
	width: 100%;
	background: map-get($colors, "bg1");
	@include card();
	&__info{
		background: map-get($colors, "bg1");
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
	}
}
</style>