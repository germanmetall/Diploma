<template>
    <div class="page">
  		<Header></Header>
		<main class="main">
			<span class="heading heading--medium">В разработке</span>
            <section class="profile">
                <span class="profile__name"></span>
                <img class="profile__img" src=""/>
                <span class="profile__contacts"></span>
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
			texts: undefined
		};
	},
	mounted: async function() {
		//let resp = await this.$options.API.data().Me.get();
		//let body = await resp.json();
	}
}
</script>
