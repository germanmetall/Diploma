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
					<span class="auth__action" @click="login()">Увійти</span>
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
			this.error = isValid;
			
			if(this.error.error) {
				alert(this.error.text);
				return;
			}

			let {mail, password} = isValid;

			alert("Зачекайте, будь ласка");

			let resp = await this.$options.platformAPI.data().Auth.login(mail, password);
			let body = await resp.json();
			if(body.jwt){
				alert("Ви успішно увійшли до системи");
				localStorage.setItem("jwt", body.jwt);
				this.$router.push("/platform");
			}
			else{
				alert("Помилка. Перевірте правильність логіна чи паролю");
			}
		},

		checkValidation(){
			let mailRegex = /[^@]+@[^@]+\.(com|net|org)/g,
					passwordRegex = /[a-zA-Z0-9]{6,}/g;
			
			let mail = document.querySelector("#email").value,
					password = document.querySelector("#password").value;

			if(!mail.match(mailRegex)) 
				return {error: true, text: "Ваша пошта не підходить!"};
			
			if(!password.match(passwordRegex)) 
				return {error: true, text: "Ваш пароль не підходить!"};

			return {error: false, text: "", mail: mail, password: password};
		}
	}
}
</script>

<style lang="scss" scoped>
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