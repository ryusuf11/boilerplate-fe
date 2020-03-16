module.exports = {
	devServer: {
		proxy: {
			'^/v1': {
				target: 'https://v1.dummy.com',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/v1': '/api',
				},
			},
			'^/v2': {
				target: 'https://v2.dummy.com',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/v2': '/api',
				},
			},
		}
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: '@import "~@/assets/style/index.scss";'
			}
		}
	},
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg')

		svgRule.uses.clear()

		svgRule
			.use('babel-loader')
			.loader('babel-loader')
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader')
	},
}
