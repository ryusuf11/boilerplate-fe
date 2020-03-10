module.exports = {
	devServer: {
		proxy: {
			'^/v1': {
				target: 'https://admin.staging.evermosa2z.com',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/v1': '/api',
				},
			},
			'^/v2': {
				target: 'https://api-admin.staging.evermosa2z.com',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/v2': '/admin',
				},
			},
		}
	}
}
