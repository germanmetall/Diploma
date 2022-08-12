<template>
    <div class="page">
  		<Header></Header>
		<main class="main">

			<div class="command">
				<div v-if="!edit" class="command__edit" @click="toggleEdit()">Змінити</div>
			</div>
			<div class="command" v-if="edit">
				<div class="command__cancel" @click="toggleEdit()">Скасувати</div>
				<div class="command__save" @click="save()">Зберегти</div>
			</div>

            <section v-if="!edit" class="profile">
                <span class="profile__name">{{profile.name}}</span>
                <div class="profile__img">
					<!--
					<img class="img__top" src="https://www.svgrepo.com/show/1001/graduation-cap.svg"/>
					-->
					<img class="img__avatar" src="@/assets/ava.jpg"/>
				</div>
                <span class="profile__contacts">{{profile.contacts}}</span>
            </section>

			<section v-if="edit" class="profile edit">
                <input type="text" class="profile__name" :value="profile.name">
                <div class="profile__img">
					<img class="img__avatar" src="@/assets/ava.jpg" @click="changeAvatar()"/>
					<input type="file" accept="image/*" id="avatarInput"/>
				</div>
                <textarea class="profile__contacts" :value="profile.contacts"></textarea>
            </section>

		</main>
	</div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
    name: 'Profile',
	components: {
		Header
	},
	data: function() {
		return {
			edit: false,
			profile: {}
		};
	},
	mounted: async function() {
		let resp = await this.$options.platformAPI.data().Profile.me();
		let body = await resp.json();
		console.log(body);
		this.profile = {
			name: body.username,
			contacts: body.Contacts
		}
	},
	methods:{
		toggleEdit(){
			this.edit = !this.edit;
		},
		async save(){
			let username = document.querySelector(".profile__name").value,
				contacts = document.querySelector(".profile__contacts").value;
			let resp = await this.$options.platformAPI.data().Profile.update(username, contacts);
			let body = await resp.json();
			console.log(body);
			this.profile = {
				name: username,
				contacts: contacts
			};
			this.edit = !this.edit;
		},
		changeAvatar(){
			document.querySelector("#avatarInput").click();
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.main{
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}
.profile{
	width: 100%;
	display: grid;
	grid-template-columns: calc(30% - 6px) calc(70% - 6px);
	column-gap: 12px;
	row-gap: 4px;
	background: transparentize(map-get($colors, "bg1"), 0.5);
	border-radius: 56px;
	padding: 12px;
	margin: 0 auto;
	&__name{
		margin: auto;
		font-size: 3rem;
		border: none;
		box-sizing: border-box;
		height: 100%;
	}
	&__img{
		position: relative;
		width: max(100px, 100%);
		grid-row: 1 / span 2;
		&:hover{
			.img__top{
				opacity: 1;
				width: 80%;
			}
		}
		.img{
			&__top{
				opacity: 0;
				position: relative;
				margin-bottom: -36%;
				width: 10%;
				transition: 1s;
			}
			&__avatar{
				width: 100%;
				height: 100%;
				aspect-ratio: 1;
				object-fit: cover;
				border-radius: 56px 0 0 56px;
				box-sizing: border-box;
			}
		}
	}
	&__contacts{
		text-align: start;
		font-size: 1.75rem;
		border: none;
		box-sizing: border-box;
	}
}

 .edit .profile{
	&__name{
		width: 100%;
		border-radius: 0 56px 0 0;
	}
	&__contacts{
		width: 100%;
		border-radius: 0 0 56px 0;
	}
}

.command{
	display: flex;
	flex-direction: row;
	margin: 12px;
	font-size: 2rem;
	gap: 12px;
	color: map-get($colors, "bg3");
	&__edit{
		background: map-get($colors, "bg2");
		border-radius: 12px;
		padding: 12px;
		cursor: pointer;

		&:hover{

		}

		&::after{
			content: " ✎";
		}
	}
	&__save{
		background: map-get($colors, "bg2");
		border-radius: 12px;
		padding: 12px;
		cursor: pointer;

		&::after{
			content: " ✅";
		}
	}
	&__cancel{
		background: #e26868;
		border-radius: 12px;
		padding: 12px;
		cursor: pointer;

		&::after{
			content: " ❌";
		}
	}
}
#avatarInput{
	display: none;
}
</style>