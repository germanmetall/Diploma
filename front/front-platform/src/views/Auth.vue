<template>
  	<div class="page">
		<main class="main">
			<form class="auth" onsubmit="return false;">

				<section class="auth__errorContainer" v-if="error.error">
					<span class="auth__error">{{error.text}}</span>
				</section>

				<section class="auth__infoContainer">
					<label class="auth__info">
						<input class="auth__input" type="email" placeholder="Email" id="email">
					</label>

					<label class="auth__info">
						<input class="auth__input" type="password" placeholder="Password" id="password">
					</label>
				</section>

				<section class="auth__actionContainer">
					<span class="auth__action" @click="login()">Войти</span>
				</section>

			</form>
		</main>
	</div>
</template>

<script>
export default {
  	name: 'Auth',
	data: function(){
		return {
			error: {
				error: false,
				text: ""
			}
		}
	},
	methods: {
		async login(){
			let isValid = this.checkValidation();
			this.error = isValid.error;
			
			if(this.error.error) return;

			let {mail, password} = isValid;

			let resp = await this.$options.API.data().Auth.login(mail, password);
			let body = await resp.json();
			console.log(body);
			localStorage.setItem("jwt", body.jwt);
		},

		checkValidation(){
			let mailRegex = /[^@]+@[^@]+\.(com|net|org)/g,
					passwordRegex = /[a-zA-Z0-9]{6,}/g;
			
			let mail = document.querySelector("#email").value,
					password = document.querySelector("#password").value;

			if(!mail.match(mailRegex)) 
				return {error: true, text: "Ваша почта не подходит!"};
			
			if(!password.match(passwordRegex)) 
				return {error: true, text: "Ваш пароль не подходит!"};

			return {error: false, text: "", mail: mail, password: password};
		}
	}
}
</script>

<style lang="scss">
@import "../../../styles/global.scss";
.auth{
	&__error{
		&Container{}
	}
	&__info{
		&Container{}
	}
	&__input{
		display: block;
		margin: 6px auto;
		width: 100%;
		padding: 12px;
		box-sizing: border-box;
		font-size: 16px;
	}
	&__action{
		display: block;
		background: map-get($colors, "bg3");
		padding: 12px;
		border: 4px solid transparent;
		border-radius: 16px;
		font-size: 16px;
		transition: map-get($transitions, "fast");
		cursor: pointer;
		box-sizing: border-box;
		&:hover{
			border: 4px solid #000;
		}
		&Container{
			margin: 16px 0;
		}
	}
}
</style>