<template>
    <div class="page">
  		<Header></Header>
		<main class="main">
            <section class="profile">
                <span class="profile__name">{{profile.name}}</span>
                <div class="profile__img">
					<img class="img__top" src="https://www.svgrepo.com/show/1001/graduation-cap.svg"/>
					<img class="img__avatar" :src="profile.img"/>
				</div>
                <span class="profile__contacts">{{profile.contacts}}</span>
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
			texts: undefined,
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
	}
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.profile{
	display: grid;
	grid-template-columns: calc(30% - 6px) calc(70% - 6px);
	gap: 12px;
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
				width: 5%;
				transition: 1s;
			}
			&__avatar{
				width: 100%;
				aspect-ratio: 1;
				object-fit: cover;
				border-radius: 100%;
			}
		}
	}
	&__contacts{
		text-align: start;
		font-size: 1.75rem;
	}
}
</style>