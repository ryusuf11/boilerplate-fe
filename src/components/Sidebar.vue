<template>
	<el-aside width="220px" class="sidebar">
		<img src="evermos-logo-black.png" alt="" style="width:170px;padding:20px;">
		<el-menu :default-openeds="['1', '3']" style="border:none;">
			<el-submenu index="1">
				<template slot="title"><i class="el-icon-message"></i>Navigator One</template>
				<el-menu-item-group>
					<template slot="title">Group 1</template>
					<el-menu-item index="1-1">Option 1</el-menu-item>
					<el-menu-item index="1-2">Option 2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="Group 2">
					<el-menu-item index="1-3">Option 3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<template slot="title">Option4</template>
					<el-menu-item index="1-4-1">Option 4-1</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
				<el-menu-item-group>
					<template slot="title">Group 1</template>
					<el-menu-item index="2-1">Option 1</el-menu-item>
					<el-menu-item index="2-2">Option 2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="Group 2">
					<el-menu-item index="2-3">Option 3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="2-4">
					<template slot="title">Option 4</template>
					<el-menu-item index="2-4-1">Option 4-1</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
				<el-menu-item-group>
					<template slot="title">Group 1</template>
					<el-menu-item index="3-1">Option 1</el-menu-item>
					<el-menu-item index="3-2">Option 2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="Group 2">
					<el-menu-item index="3-3">Option 3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="3-4">
					<template slot="title">Option 4</template>
					<el-menu-item index="3-4-1">Option 4-1</el-menu-item>
				</el-submenu>
			</el-submenu>
		</el-menu>
	</el-aside>
</template>

<style lang="scss">
.sidebar {
	background-color:#fff;
	height:100%;
	position:fixed;
	z-index:2;
	top:0;
	left:0;
	box-shadow: 0 2px 10px 0 rgba(20, 20, 20, 0.05);
}

.el-aside {
	color: #333;
}
</style>
