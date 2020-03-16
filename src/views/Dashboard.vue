<template>
	<div>
		Dashboard
		<button @click="loadData">Load</button>
	</div>
</template>

<script>
export default {
	name: 'Dashboard',
	components: {},
	setup(props, { root: vm }) {
		const loadData = () => vm.axios.get('/v2/user/profile')
			.then(({ data }) => {
				window.console.log(data)
			})

		return {
			loadData,
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
