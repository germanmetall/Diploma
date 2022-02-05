<template>
    <div class="page">
  		<Header></Header>
		<main class="main">

            <section class="courses">
				<span class="heading heading--medium">В разработке</span>
                <article class="course" v-for="course of courses" :key="course" @click="$router.push({ name: 'Course', params: { id: course.id }})">
                    <span class="course__name heading heading--medium"></span>
                    <img src="" class="course__img"/>
                    <span class="course__info"></span>
                </article>
            </section>

		</main>
	</div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
    name: 'Courses',
	components: {
		Header
	},
	data: function() {
		return {
			texts: undefined
		};
	},
	mounted: async function() {
		let resp = await this.$options.API.data().Courses.getMine();
		let body = await resp.json();
	}
}
</script>
