<template>
    <div class="page">
  		<Header></Header>
		<main class="main">

			<div class="command">
				<div v-if="!edit" class="command__edit" @click="toggleEdit()">Edit</div>
			</div>
			<div class="command" v-if="edit">
				<div class="command__cancel" @click="toggleEdit()">Cancel</div>
				<div class="command__save" @click="save()">Save</div>
			</div>

            <section v-if="!edit" class="profile">
                <span class="profile__name">{{profile.name}}</span>
                <div class="profile__img">
					<!--
					<img class="img__top" src="https://www.svgrepo.com/show/1001/graduation-cap.svg"/>
					-->
					<img class="img__avatar" :src="profile.img"/>
				</div>
                <span class="profile__contacts">{{profile.contacts}}</span>
            </section>

			<section v-if="edit" class="profile edit">
                <input type="text" class="profile__name" :value="profile.name">
                <div class="profile__img">
					<img class="img__avatar" :src="profile.img" @click="changeAvatar()"/>
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
			profile: {
				name: "Test name",
				img: "https://pbs.twimg.com/media/FSEQED7X0AQQMKd?format=jpg&name=900x900",
				contacts: "Test contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts"
			}
		};
	},
	mounted: async function() {
		//let resp = await this.$options.API.data().Me.get();
		//let body = await resp.json();
	},
	methods:{
		toggleEdit(){
			this.edit = !this.edit;
		},
		save(){

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
	display: grid;
	grid-template-columns: calc(30% - 6px) calc(70% - 6px);
	gap: 12px;
	background: transparentize(map-get($colors, "bg1"), 0.5);
	border-radius: 56px;
	padding: 12px;
	&__name{
		margin: auto;
		font-size: 3rem;
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
				aspect-ratio: 1;
				object-fit: cover;
				border-radius: 56px 0 0 56px;
			}
		}
	}
	&__contacts{
		text-align: start;
		font-size: 1.75rem;
	}
}

 .edit .profile{
	&__contacts{
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