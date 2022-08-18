<template>
	<div class="page">
  		<landingHeader></landingHeader>
		<main class="main">
			<section class="contacts" v-if="contacts">
				<article class="contact" v-for="contact of contacts" :key="contact" @click="copyOrOpen(contact.attributes.Link || contact.attributes.Text)">
					<img v-if="contact.attributes.Icon.data" class="contact__image" :src="'https://polonska-diploma.herokuapp.com'+contact.attributes.Icon.data.attributes.url"/>
					<span class="heading heading--medium">{{contact.attributes.Text}}</span>
				</article>
			</section>
		</main>
	</div>

	<Spinner v-if="loading"></Spinner>
</template>

<script>
import landingHeader from "../components/landingHeader.vue";
import Spinner from "../components/Spinner.vue";
let md = require('markdown-it')({
	html: true
});

export default {
  	name: 'Contacts',
	components: {
		landingHeader,
		Spinner
	},
	data: function(){
		return {
			contacts: undefined,
			loading: undefined
		}
	},
	methods: {
		async copyOrOpen(textOrLink){
			try{
				let url = new URL(textOrLink);
				window.open(url);
			}
			catch{
				await navigator.clipboard.writeText(textOrLink);
				alert("Скопійовано в буфер!");
			}
		}
	},
	mounted: async function(){
		setTimeout(()=>{
			if(this.loading === undefined) this.loading = true;
		}, 1000);
		let resp = await this.$options.landingAPI.data().Contacts.get();
		let body = await resp.json();
		this.loading = false;
		this.contacts = body.data;
		console.log(body);
	}
}
</script>

<style lang="scss" scoped>
@import "../../../styles/global.scss";
.contacts{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.contact{
	@include card();
	@include cardHover();
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 60%;
	padding: 12px;
	background: map-get($colors, "bg1");
	font-size: 1.25rem;
	cursor: pointer;
	&__image{
		width: 64px;
		border-radius: 100%;
	}
}
@media screen and (max-width: 600px){
	.main{
		padding-top: 96px;
		.contact{
			width: 96%;
			padding: 12px;
		}
	}
}
</style>