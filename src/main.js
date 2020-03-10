import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VueMoment from 'vue-moment'

import App from './App.vue'
import router from './router'
import store from './store'

axios.interceptors.request.use((config) => {
	const token = VueCookie.get('evb_token')
	if (token) {
		// eslint-disable-next-line no-param-reassign
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueCompositionApi)
Vue.use(VueCookie)
Vue.use(VueMoment)

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
