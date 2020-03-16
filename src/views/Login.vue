<template>
	<div class="loginPage">
		<div class="loginContainer">
			<div class="loginPanel">
				<div class="loginPanel__logo">
					<img src="evermos-logo-black.png" alt="">
				</div>
				<div class="loginPanel__form">
					<center>
						<div style="color: #b3450e;margin-bottom: 1.5rem;" v-show="requestErrorMessage">
							{{ requestErrorMessage }}
						</div>
					</center>
					<el-form
						ref="loginForm"
						:model="loginForm"
						:rules="loginRules"
						class="login-form"
						auto-complete="on"
						label-position="left">
						<el-form-item prop="username">
							<span class="svg-container">
								<span class="icon icon--user1" style="color: #fff;"></span>
							</span>
							<el-input
								v-model="loginForm.username"
								@input.native="formatPhoneNumber"
								placeholder="username"
								name="username"
								type="text"
								class="input--login"
								auto-complete="on">
								<div slot="prefix" style="line-height:50px;margin:0 10px;">
									<PersonFill class="vertical-middle"></PersonFill>
								</div>
							</el-input>
						</el-form-item>

						<el-form-item prop="password">
							<span class="svg-container">
								<span class="icon icon--lock" style="color: #fff;"></span>
							</span>
							<el-input
								v-model="loginForm.password"
								:type="passwordType"
								placeholder="password"
								name="password"
								auto-complete="on"
								class="input--login"
								@keyup.enter.native="handleLogin">
								<div slot="prefix" style="line-height:50px;margin:0 10px;">
									<LockFill class="vertical-middle"></LockFill>
								</div>
								<div
									slot="suffix"
									style="line-height:50px;margin:0 10px;cursor:pointer;"
									@click="showPwd">
									<EyeFill class="vertical-middle"></EyeFill>
								</div>
							</el-input>
						</el-form-item>

						<el-form-item prop="remember" style="margin-bottom: 10px;">
							<div class="loginPanel__rememberMe gTheme__checkbox--yellow">
								<el-checkbox v-model="rememberMe">Remember Me</el-checkbox>
							</div>
						</el-form-item>

						<el-button
							:loading="loading"
							style="width:100%;margin-bottom:30px;"
							class="gTheme__button--black"
							@click.native.prevent="handleLogin">
							Masuk
						</el-button>
					</el-form>
				</div>
			</div>
			<div class="loginSprite">
				<!-- <img src="/bg-login-sprite.png" alt=""> -->
				<lottie
					:options="defaultOptions"
					:height="500"
					:width="600"
					@:animCreated="handleAnimation"/>
			</div>
		</div>
		<div class="loginFooter">
			<label>Copyright &copy; Evermos 2020</label>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { ref, reactive } from '@vue/composition-api'
import PersonFill from '@/assets/icons/login/person-fill.svg'
import LockFill from '@/assets/icons/login/lock-fill.svg'
import EyeFill from '@/assets/icons/login/eye-fill.svg'
import Lottie from 'vue-lottie'
import * as animationData from '@/assets/animation/login-animation.json'

export default {
	name: 'Login',
	components: {
		LockFill,
		PersonFill,
		EyeFill,
		Lottie,
	},
	setup(props, { root: vm }) {
		const loginForm = reactive({
			username: '',
			password: ''
		})
		const rememberMe = ref(false)
		const requestErrorMessage = ref('')
		const handleLogin = () => {
			axios.post('/v1/client/auth', {
				username: loginForm.username,
				password: loginForm.password
			}).then(({ data }) => {
				const expirationDate = new Date()
				expirationDate.setFullYear(expirationDate.getFullYear() + 1)

				vm.$cookie.set(
					'evb_token',
					data.access_token,
					vm.$moment().second(rememberMe ? expirationDate : data.expires_in).toDate()
				)

				requestErrorMessage.value = ''
				window.location.reload()
			}).catch(({ response }) => {
				requestErrorMessage.value = response.data.message
			})
		}

		const validateUsername = (rule, value, callback) => {
			callback()
		}
		const validatePassword = (rule, value, callback) => {
			if (value.length === 0) {
				callback(new Error('Kata sandi tidak boleh kosong'))
			} else {
				callback()
			}
		}
		const formatPhoneNumber = () => {
			const number = loginForm.username
			if (number.indexOf('0') === 0) loginForm.username = number.replace('0', '62')
		}

		const loginRules = reactive({
			username: [{ required: true, trigger: 'blur', validator: validateUsername }],
			password: [{ required: true, trigger: 'blur', validator: validatePassword }]
		})

		const passwordType = ref('password')
		const showPwd = () => {
			if (passwordType.value === 'password') {
				passwordType.value = ''
			} else {
				passwordType.value = 'password'
			}
		}

		const loading = ref(false)

		const defaultOptions = reactive({
			animationData: animationData.default
		})

		const handleAnimation = (anim) => {
			this.anim = anim
		}

		return {
			loginForm,
			rememberMe,
			handleLogin,
			loginRules,

			formatPhoneNumber,
			passwordType,
			showPwd,

			loading,

			requestErrorMessage,

			defaultOptions,
			handleAnimation,
		}
	}
}
</script>

<style lang="scss" scoped>
	.loginPanel {
		padding: 0;
		box-shadow: 0 2px 10px 0 rgba(20, 20, 20, 0.1);
		border-radius: 20px;
		width: 400px;
		max-width: 50%;
		background-image: url('/login-sprite.png');
		background-repeat: no-repeat;
		background-position: center bottom;
		background-size: contain;
		background-color: #fff;
		padding-bottom: 120px;

		&__logo {
			text-align: center;

			img {
				margin: 85px 0;
			}
		}

		&__form {
			margin: 0 40px;
		}

		&__rememberMe {
			font-size: 16px;
			font-weight: 500;
			display: flex;
			justify-content: flex-end;
		}
	}

	.loginSprite {
		margin-right: 15%;
		margin-top: 50px;
	}

	.loginContainer {
		display: flex;
		justify-content: space-between;
		margin: 140px 90px;
	}

	.loginFooter {
		text-align: center;
		color: #595959;
		font-size: 14px;
		font-weight: 500;
		line-height: 22px;
		letter-spacing: 2px;
	}

	.vertical-middle {
		vertical-align: middle;
	}
</style>
