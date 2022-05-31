<template>
	<div class="page">
  		<Header></Header>
		<main class="main">
			<section class="contacts" v-if="contacts">
				<article class="contact" v-for="contact of contacts" :key="contact" @click="copyOrOpen(contact.attributes.Link || contact.attributes.Text)">
					<img class="contact__image" :src="'http://localhost:1337'+contact.attributes.Icon.data.attributes.url"/>
					<span class="heading heading--medium">{{contact.attributes.Text}}</span>
				</article>
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
  	name: 'Contacts',
	components: {
		Header
	},
	data: function(){
		return {
			contacts: undefined
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
				alert("Скопировано в буфер!");
			}
		}
	},
	mounted: async function(){
		let resp = await this.$options.API.data().Contacts.get();
		let body = await resp.json();
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
	padding: 24px;
	background: map-get($colors, "bg1");
	font-size: 1.25rem;
	cursor: pointer;
	&__image{
		width: 64px;
		border-radius: 100%;
	}
}
</style>