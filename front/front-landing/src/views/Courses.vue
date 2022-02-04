<template>
	<div class="page">
  		<Header></Header>

		<main class="main" v-if="courses">
			<article class="course" v-for="course of courses" :key="course">
				<img class="course__teacher" src="https://media-exp1.licdn.com/dms/image/C5603AQEhf8fpKRLYYQ/profile-displayphoto-shrink_800_800/0/1642147918037?e=1648684800&v=beta&t=ugsyrk07mzYFiSYTSNjSlYUjJLhWurgNhFLVi5p7R10"/>
				<span class="heading heading--medium">{{course.attributes.Heading}}</span>
				<section class="course__info">
					<span class="course__text" v-html="course.attributes.Description_short"></span>
					<span class="course__price">{{course.attributes.Price}}</span>
					<router-link :to="{ name: 'Course', params: { id: course.id }}" class="course__more">Больше</router-link>
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
  	name: 'Courses',
	components: {
		Header
	},
	data: function(){
		return {
			courses: undefined
		}
	},
	mounted: async function(){
		let resp = await this.$options.API.data().Courses.get();
		let body = await resp.json();
		this.courses = body.data;
		this.courses.map(el => {
			el.attributes['Description_short'] = md.render(el.attributes['Description_short']);
		})
	}
}
</script>

<style lang="scss" scoped>
.main{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 48px;
}

.course{
	position: relative;
	width: 100%;
	background: map-get($colors, "bg1");
	@include card();
	@include cardHover();
	.heading{
		padding: 0 24px 8px;
		transition: map-get($transitions, "ultra");
		border-bottom: 2px double map-get($colors, "black");
	}
	&__info{
		position: relative;
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
	&__price, &__more{
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
	&__more{
		border-radius: 24px 0 0 0;
		&:hover{
			$one: 20%;
			$two: 10%;
			background: map-get($colors, "bg3");
		}
	}

	&:hover{
		.heading{
			padding: 0 48px 8px;
		}
	}
}
</style>