<template>
<div>
  <el-container style="height: 100%;">
    <div style="position: fixed;width: 252px;background-color: #20222a;height:100%">dddd</div>
    <el-aside width="252px">
    <div style="height: 60px;text-align: center;background-color: #20222a;color: #fff;width: 252px;font-size: 20px;
        font-weight: 300;;z-index: 2"><span style="top: 25px;position: fixed;left: 85px;z-index: 2">PLATFORM</span></div>
    <el-menu
      :style="containerHeight"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#20222a"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>项目管理</template
          >
          <el-menu-item-group>
            <router-link to='/project/list'>
              <el-menu-item index="1-1">项目列表</el-menu-item>
            </router-link>
            <router-link to='/project/apis'>
              <el-menu-item index="1-2">接口管理</el-menu-item>
            </router-link>
            <router-link to='/project/case'>
              <el-menu-item index="1-3">用例管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-setting"></i>变量管理</template
          >
          <el-menu-item-group>
            <router-link to='/global/data'>
              <el-menu-item index="2-1">全局变量</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
          <el-menu-item-group>
            <router-link to='/user/user'>
              <el-menu-item index="3-1">用户管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"
            ><i class="el-icon-s-promotion"></i>小工具管理</template
          >
          <el-menu-item-group>
            <router-link to='/quadrature'>
              <el-menu-item index="4-1">正交生成器</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
    </el-container>
  </el-container>
  <router-view />
</div>
</template>

<style>
* {
  padding: 0px;
  margin: 0px;
}

html,
body {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(120deg, #487eb0, #fbc531);
  overflow: hidden;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.container{
  position: fixed;
  top: 10%;
  width: 81%;
  left: 17%;
  height: 88.5%;
  background-color: rgba(252, 252, 252, 0.5);
  border-radius: 10px;
}

*::-webkit-scrollbar {
  width: 0;
}
</style>

<script>
export default {
  handleOpen (key, keyPath) {
    console.log(key, keyPath)
  },
  handleClose (key, keyPath) {
    console.log(key, keyPath)
  }
}
</script>
