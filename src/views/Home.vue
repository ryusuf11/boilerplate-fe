<template>
	<div class="home">
		<center>
			<div style="color: #b3450e;margin-bottom: 1.5rem;" v-show="requestErrorMessage">
				{{ requestErrorMessage }}
			</div>
		</center>
		<button @click="loadData">login</button>
		<button @click="loadUser">load user</button>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Home',
	data() {
		return {
			requestErrorMessage: ''
		}
	},
	methods: {
		async loadUser() {
			const { data } = await this.axios.get('/v2/user')
			// eslint-disable-next-line
			console.log(data)
		},
		loadData() {
			axios.post('v1/client/auth', {
				username: '628979925083',
				password: 'Pxlr3210soYYzgw'
			}).then(({ data }) => {
				this.$cookie.set('evb_token', data.access_token, this.$moment().second(data.expires_in).toDate())

				this.requestErrorMessage = ''
				window.location.reload()
			}).catch(({ response }) => {
				this.requestErrorMessage = response.data.message
			})
		}
	}
}
</script>
