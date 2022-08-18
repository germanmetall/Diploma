<template>
    <div class="page">
  		<Header></Header>
		<main class="main">

            <section class="courses">
                <article class="course" v-for="course of courses" :key="course" >
					<!-- @click="$router.push({ name: 'Course', params: { id: course.id }})" -->
                    <span class="course__name heading heading--medium">{{course.attributes.Name}}</span>
                    <span class="course__info">{{course.attributes.Schedule}}</span>
                    <img v-if="course.attributes.Avatar.data" :src="'https://polonska-diploma.herokuapp.com'+course.attributes.Avatar.data.attributes.url" class="course__img"/>
                </article>
            </section>

		</main>
	</div>

	<Spinner v-if="loading"></Spinner>
</template>

<script>
import Header from "../components/Header.vue";
import Spinner from "../components/Spinner.vue";
export default {
  	name: 'Home',
	components: {
		Header,
		Spinner
	},
	data: function() {
		return {
			courses: undefined,
			loading: undefined
		};
	},
	mounted: async function() {
		setTimeout(()=>{
			if(this.loading === undefined) this.loading = true;
		}, 1000);
		let resp = await this.$options.platformAPI.data().Courses.get();
		let body = await resp.json();
		this.loading = false;
		if(body.error && body.error.status === 401){
			this.$router.push("/platform/auth");
		}
		console.log(body);
		this.courses = body.data;
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
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 24px;
	background: map-get($colors, "bg1");
	&__description{
		font-size: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 6vh;
		padding: 24px 0;
		background: map-get($colors, "bg3");
	}
	&__tab{
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 24px 0;
		background: map-get($colors, "bg1");
		&.active{
			display: flex;
		}
	}
	&__teacherAvatar{
		z-index: 5;
		position: absolute;
		top: 48px;
		right: 48px;
		width: 100px;
		border-radius: 50%;
	}
}
.course{
	@include card();
	@include cardHover();
	display: grid;
	grid-template-columns: auto clamp(120px, 30%, 300px);
	justify-content: space-between;
    align-items: center;
	padding: 24px;
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