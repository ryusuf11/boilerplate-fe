import VueCookie from 'vue-cookie'

export default ({ next, router }) => {
	if (!VueCookie.get('evb_token')) {
		return router.push({ name: 'Login' })
	}

	return next()
}
