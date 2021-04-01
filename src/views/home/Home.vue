<template>
  <el-container style="height: 100%;">
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
            <router-link to='/global_data'>
              <el-menu-item index="2-1">全局变量</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
          <el-menu-item-group>
            <router-link to='/user'>
              <el-menu-item index="3-1">用户管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"
            ><i class="el-icon-setting"></i>小工具管理</template
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

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
*{
  padding: 0px;
  margin: 0px;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

*::-webkit-scrollbar {
  width: 0;
}
</style>

<script>
export default {
  datas () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  data () {
    return {
      containerHeight: {
        height: ''
      }
    }
  },
  created () {
    var docHeight = document.documentElement.clientHeight
    this.containerHeight.height = docHeight - 20 + 'px'
  },
  handleOpen (key, keyPath) {
    console.log(key, keyPath)
  },
  handleClose (key, keyPath) {
    console.log(key, keyPath)
  }
}
</script>
