<template>
    <div class="page">
		<main class="main">

            <section class="courses">
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
export default {
  	name: 'Home',
	data: function() {
		return {
			texts: undefined
		};
	},
	mounted: async function() {
		let resp = await this.$options.API.data().Courses.getAll();
		let body = await resp.json();
	}
}
</script>
