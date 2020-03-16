<template>
	<div id="app">
		<el-container style="height: 100%">
			<Sidebar></Sidebar>

			<el-container>
				<Header></Header>

				<el-main style="margin-top:60px;margin-left:220px;background-color:#eee;padding:25px 30px;">
					<el-table :data="tableData">
						<el-table-column prop="date" label="Date" width="140">
						</el-table-column>
						<el-table-column prop="name" label="Name" width="120">
						</el-table-column>
						<el-table-column prop="address" label="Address">
						</el-table-column>
					</el-table>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

export default {
	components: {
		Sidebar,
		Header,
	},
	data() {
		const item = {
			date: '2016-05-02',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles'
		}

		return {
			tableData: Array(20).fill(item)
		}
	}
}
</script>
