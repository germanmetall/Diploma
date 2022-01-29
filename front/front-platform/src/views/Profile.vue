<template>
    <div class="page">
		<main class="main">

            <section class="profile">
                <span class="profile__name"></span>
                <img class="profile__img" src=""/>
                <span class="profile__contacts"></span>
            </section>

		</main>
	</div>
</template>

<script>
export default {
    name: 'Profile',
	data: function() {
		return {
			texts: undefined
		};
	},
	mounted: async function() {
		let resp = await this.$options.API.data().Me.get();
		let body = await resp.json();
	}
}
</script>
