import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userData: null
	},
	mutations: {
		setUserData: (state, payload) => {
			state.userData = payload
		}
	},
	actions: {
		fetchUserData({ state, commit }, forceUpdate = false) {
			if (!forceUpdate && state.userData) return state.userData
			return this.$axios
				.get('/user/data')
				.then((response) => {
					commit('setUserData', response)
					return response
				})
		}
	},
	modules: {
	}
})
