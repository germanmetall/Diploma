<template>
    <div class="page">
  		<Header></Header>
		<main class="main">

            <section class="courses">
                <article class="course" v-for="course of courses" :key="course" @click="$router.push({ name: 'Course', params: { id: course.id }})">
                    <span class="course__name heading heading--medium">{{course.attributes.Name}}</span>
                    <span class="course__info">{{course.attributes.Schedule}}</span>
                    <img v-if="course.attributes.Avatar.data" :src="'http://localhost:1337'+course.attributes.Avatar.data.attributes.url" class="course__img"/>
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
			courses: undefined
		};
	},
	mounted: async function() {
		this.courses = await this.$options.API.data().Courses.getMine();
		console.log(this.courses);
	}
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.courses{
	width: clamp(80%, 60vw, 900px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
}
.course{
	@include card();
	@include cardHover();
	display: grid;
	grid-template-columns: auto clamp(120px, 30%, 300px);
	justify-content: space-between;
    align-items: center;
	padding: 24px;
	cursor: pointer;
	&__name{
	}
	&__info{
	}
	&__img{
		border-radius: 24px;
		width: 100%;
		grid-row: 1 /3;
		grid-column: 2;
	}
}
</style>