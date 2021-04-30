<template>
  <div id="table-container" ref="project_apis" class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdds">
          新增接口
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <!-- <el-input v-model="queryForm.listName" placeholder="项目名称" /> -->
            <el-select v-model="select.value" clearable placeholder="项目名称">
              <el-option
                v-for="item in select.options"
                :key="item.value"
                :label="item.value"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryForm.name" placeholder="接口名称" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="listName"
        label="项目名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="接口名称"
        prop="name"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="请求方式">
        <template #default="{ row }">
          <el-tooltip
            :content="row.api_models"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.api_models | statusFilter">
              {{ row.api_models }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="请求路径"
        prop="api_url"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="400px">
        <template #default="{ row }">
          <el-button type="primary" @click="handleAdd(row)">调试</el-button>
          <el-button type="warning" @click="handleEdit(row)">编辑</el-button>
          <el-button @click="handleCopy(row)">复制</el-button>
          <el-button type="info" @click="AbnoRmal(row)">异常值测试</el-button>
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit"></table-edit>
    <table-apis ref="ApisEdit"></table-apis>
    <table-api ref="ApisEdits"></table-api>
    <table-abnormal ref="abnormal"></table-abnormal>
  </div>
</template>

<script>
  import { getList, doDelete, copyApis } from '@/api/project/apis'
  import { GetProList } from '@/api/project/list'
  import TableEdit from './components/apis/des'
  import TableApis from './components/apis/apis'
  import TableApi from './components/apis/newapis'
  import TableAbnormal from './components/apis/abnormal'
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
      TableApis,
      TableApi,
      TableAbnormal,
    },
    filters: {
      statusFilter(is_active) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在玩命的加载...',
        select: {
         options: [
           {
            value: '选项1',
            label: '黄金糕'
          }],
          value: '',
          label: ''
         },
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          listName: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    watch: {
    },
    created() {
      this.fetchData()
      this.resfet()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      apirefresh() {
        this.fetchData()
      },
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleAdd(row) {
        this.$refs['ApisEdit'].showEdits(row)
        this.$refs['ApisEdit'].showReturt(row)
      },
      handleAdds(row) {
        const getpro = new Array()
        GetProList().then(data => {
          const lists = data.data
          for(var s = 0; s < lists.length; s++){
            const dic = {}
            dic.value = lists[s].listName
            dic.label = lists[s].id
            getpro.push(dic)
          }
        })
        this.$refs['ApisEdits'].showEdits(row, getpro)
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      AbnoRmal(row) {
        console.log(row)
        const apibody = row.api_body
        const len = Object.keys(apibody).length
        if(len == 0){
          this.$baseMessage('此接口参数无法进行异常值测试', 'error')
          return false
        }
        debugger
        if(row.body_method == 'Raw'){
          this.$baseMessage('此接口参数无法进行异常值测试', 'error')
          return false
        }
        if(row.api_body == '{"": ""}'){
          this.$baseMessage('此接口参数无法进行异常值测试', 'error')
          return false
        }
        this.$refs['abnormal'].showEdit(row)
      },
      handleCopy(row) {
        const { message } = copyApis({ ids: row.id })
        this.$baseMessage(message, 'success')
        this.fetchData()
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { message } = await doDelete({ ids: row.id })
            this.$baseMessage(message, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { message } = await doDelete({ ids: ids })
              this.$baseMessage(message, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      async resfet() {
         GetProList().then(data => {
          const lists = data.data
          const getpro = new Array()
          for(var s = 0; s < lists.length; s++){
            const dic = {}
            dic.value = lists[s].listName
            dic.label = lists[s].id
            getpro.push(dic)
            console.log(dic)
          }
          console.log(getpro)
          this.select = {options: getpro}
        })
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.listName = this.select.value
        this.queryForm.pageNo = 1
        this.fetchData()
      },
    },
  }
</script>
