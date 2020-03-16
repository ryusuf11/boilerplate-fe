import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import authenticated from '../middleware/authenticated'
import unauthenticated from '../middleware/unauthenticated'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
		meta: {
			middleware: unauthenticated
		}
	},
	{
		path: '/logout',
		name: 'Logout',
		redirect: () => {
			VueCookie.delete('evb_token')

			return '/'
		}
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard
	}
]

routes.filter((route) => !route.meta)
	.map((route) => {
		// eslint-disable-next-line no-param-reassign
		route.meta = {
			middleware: authenticated
		}

		return route
	})

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

function nextFactory(context, middleware, index) {
	const subsequentMiddleware = middleware[index]

	if (!subsequentMiddleware) return context.next

	return (...parameters) => {
		context.next(...parameters)
		const nextMiddleware = nextFactory(context, middleware, index + 1)
		subsequentMiddleware({ ...context, next: nextMiddleware })
	}
}

router.beforeEach((to, from, next) => {
	if (to.meta.middleware) {
		const middleware = Array.isArray(to.meta.middleware)
			? to.meta.middleware
			: [to.meta.middleware]

		const context = {
			from,
			next,
			router,
			to,
		}
		const nextMiddleware = nextFactory(context, middleware, 1)

		return middleware[0]({ ...context, next: nextMiddleware })
	}

	return next()
})

export default router
