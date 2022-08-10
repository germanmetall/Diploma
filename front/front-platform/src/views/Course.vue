<template>
	<div class="page">
  		<Header></Header>
		<main class="main">
			<section class="course" v-if="course">
				
                <nav class="courseNav">
                    <span class="courseNav__item heading heading--medium active" @click="switchTab(0)">Головна</span>
                    <span class="courseNav__item heading heading--medium" @click="switchTab(1)">Матеріали</span>
                    <span class="courseNav__item heading heading--medium" @click="switchTab(2)">Завдання</span>
                    <span class="courseNav__item heading heading--medium" @click="switchTab(3)">Студенти</span>
                </nav>

                <span class="course__description">
					{{course.attributes.Description}}
					<br/>
					{{course.attributes.Schedule}}
				</span>

                <div class="course__tab active">

                    <article class="event" v-for="event of course.attributes.platform_events.data" :key="event">
                        <span class="event__description heading heading--small">{{event.attributes.Text}}</span>
                        <time class="event__date">{{event.attributes.Date}}</time>
                    </article>

                </div>

				<div class="course__tab">
					
					<article class="material" v-for="material of course.attributes.platform_materials.data" :key="material">
                        <span class="material__name heading heading--small">{{material.attributes.Name}}</span>
                        <span class="material__text">{{material.attributes.Text}}</span>
						
						<div class="file" v-for="file of material.attributes.Included_files.data" :key="file" @click="donwloadFromUrl(`http://localhost:1337${file.attributes.url}`, file.attributes.name)">
							<img class="file__img" src=""/>
							<span class="file__name">{{file.attributes.name}}</span>
						</div>
                    </article>

				</div>
				<div class="course__tab">
					<router-link class="task heading heading--medium" v-for="task of course.attributes.platform_tasks.data" :key="task" :to="{ name: 'Tasks', params: { courseId: course.id, id: task.id }}">
						{{task.attributes.Name}}
					</router-link>
				</div>
				<div class="course__tab">

					<article class="student" v-for="student of course.attributes.students.data" :key="student">
						<img class="student__avatar" v-if="student.attributes.avatar.data" :src="'http://localhost:1337'+student.attributes.avatar.data[0].attributes.url"/>
                        <span class="student__name heading heading--small">{{student.attributes.username}}</span>
                    </article>

				</div>

                <img :src="teacherAvatar" class="course__teacherAvatar"/>
			</section>
		</main>
	</div>
</template>

<script>
import Header from "../components/Header.vue";
import Tasks from "./Tasks.vue";
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
			course: undefined,
			teacherAvatar: undefined
		};
	},
	methods: {
		async donwloadFromUrl(url, name){
			let resp = await fetch(url);
			let body = await resp.blob();
			let file = window.URL.createObjectURL(body);
			let link = document.createElement("a");
			link.download = name;
			link.href = file;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
		switchTab(num){
			document.querySelectorAll(".course .courseNav__item").forEach((el, i) => {
				if(i==num) el.classList.add("active");
				else el.classList.remove("active");
			});
			document.querySelectorAll(".course__tab").forEach((el, i) => {
				if(i==num) el.classList.add("active");
				else el.classList.remove("active");
			});
		}
	},
	mounted: async function() {
		let resp = await this.$options.API.data().Courses.getById(this.id);
		let body = await resp.json();
		this.course = body.data;
		console.log(this.course);
		resp = await this.$options.API.data().Courses.getAvatar(this.id);
		body = await resp.json();
		if(body.data.attributes.Avatar.data) this.teacherAvatar = 'http://localhost:1337'+body.data.attributes.Avatar.data.attributes.url;
	}
}
</script>

<style lang="scss">
@import "../../../styles/global.scss";
body{
	overflow-y: scroll;
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
.courseNav{
	padding: 24px;
	width: 80%;
	min-height: 3.75rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
    align-self: flex-start;
	&__item{
		transition: map-get($transitions, "fast");
		cursor: pointer;
		&.active{
			font-size: 3.25rem;
			text-shadow: 0 0 4px map-get($colors, "shadow2");
		}
	}
}
.event{
	@include card();
	@include cardHover();
	display: flex;
	flex-direction: column;
	width: 60%;
	background: map-get($colors, "bg3");
	padding: 12px;
	&__description{
		margin-bottom: 24px;
	}
	&__date{
		text-align: right;
		font-size: 1.25rem;
	}
}
.material{
	@include card();
	@include cardHover();
	display: flex;
	flex-direction: column;
	width: 60%;
	background: map-get($colors, "bg3");
	padding: 12px;
	.file{
		margin: 24px auto;
		padding: 12px;
		border: 2px solid map-get($colors, "black");
		transition: map-get($transitions, "fast");
		border-radius: 24px 24px 0 0;
		cursor: pointer;
		&:hover{
			border: 2px solid map-get($colors, "bg2");
			color: map-get($colors, "bg2");
		}
	}
}
.task{
	@include card();
	@include cardHover();
	display: flex;
	flex-direction: column;
	width: 60%;
	background: map-get($colors, "bg3");
	padding: 12px;
}
.student{
	@include card();
	@include cardHover();
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 60%;
	background: map-get($colors, "bg3");
	padding: 12px;
	&__avatar{
		width: 96px;
		border-radius: 50%;
	}
	&__name{
		text-align: left;
		width: 100%;
		padding: 0 24px;
	}
}
</style>