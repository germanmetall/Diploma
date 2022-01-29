<template>
	<div class="page">
  		<Header></Header>
		<main class="main">
			<section class="course" v-if="course">
				
                <nav class="nav">
                    <span class="nav__item">Главная</span>
                    <span class="nav__item">Материалы</span>
                    <span class="nav__item">Задания</span>
                    <span class="nav__item">Ученики</span>
                </nav>

                <article class="course__description"></article>

                <section class="course__events">

                    <article class="event">
                        <span class="event__description"></span>
                        <time class="event__date"></time>
                    </article>

                </section>

                <img src="" class="course__avatar"/>
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
		
	}
}
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";
@import "../../../variables.scss";
@import "../styles/mixins.scss";

.course{
}
</style>