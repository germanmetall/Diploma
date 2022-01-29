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
					<span class="auth__action" @click="register()">Зарегистрироваться</span>
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
		register(){
			let isValid = this.checkValidation();
			this.error = isValid.error;
			
			if(this.error.error) return;

			let {mail, password} = isValid;

			this.$options.API.data().Auth.register(mail, password);
		},

		login(){
			let isValid = this.checkValidation();
			this.error = isValid.error;
			
			if(this.error.error) return;

			let {mail, password} = isValid;

			this.$options.API.data().Auth.login(mail, password);
		},

		checkValidation(){
			let mailRegex = /@/g,
					passwordRegex = /[a-zA-Z0-9]{6,}/g;
			
			let mail = document.querySelector("#email"),
					password = document.querySelector("#password");

			if(!mail.matches(mailRegex)) 
				return {error: true, text: "Ваша почта не подходит!"};
			
			if(!password.matches(passwordRegex)) 
				return {error: true, text: "Ваш пароль не подходит!"};

			return {error: false, text: "", mail: mail, password: password};
		}
	}
}
</script>
