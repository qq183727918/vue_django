<template>
  <div id="table-container" class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          抓包导入
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
            <el-input v-model="queryForm.file_name" placeholder="接口文件" />
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
        prop="file_name"
        label="接口文件"
      ></el-table-column>
      <el-table-column label="解压JSON">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_json"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handlePush(scope.row, scope.row.is_json)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建者"
        prop="user_name"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="解压状态">
        <template #default="{ row }">
          <el-tooltip
            :content="row.is_zip"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.is_zip | statusFilter">
              {{ row.is_zip }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="created_time"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="300px">
        <template #default="{ row }">
          <el-button type="warning" @click="uncompress(row)">解压</el-button>
          <el-button type="success" @click="handleRun(row, $event)">运行</el-button>
          <el-button type="info" @click="handleReport(row)">查看报告</el-button>
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
  </div>
</template>

<script>
  import { getList, doDelete, GetProList, Uncompress, IsJSon, LookReport, HttpRunner } from '@/api/requestTools/httprunner'
  import TableEdit from './components/newrunner'
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
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
        stuname: '正在运行...',
        value: 2,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          file_name: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      handleReport(row) {
        console.log(row)
        LookReport({ file_name: row.file_name }).then(data => {
          console.log(data)
          var tempwindow = window.open('_blank')
          tempwindow.location.href = data.message
        })
      },
      handlePush(row, rows) {
        if(row.is_zip == "已解压"){
          this.$baseMessage('已经解压完成！不能在操作', 'error')
          this.fetchData()
          return false
        }
        const pro_lsit = { 
          id: row.id, 
          is_json: rows
        }
        console.log(pro_lsit)
        IsJSon(pro_lsit).then(data => {
          console.log(data)
          this.$baseMessage(data.message, 'success')
        })
      },
      handleRun(row, val){
        console.log(row)
        if(row.is_zip == "未解压"){
          this.$baseMessage('请先行解压！', 'warning')
          return false
        }else{
          val.target.innerText = this.stuname
          HttpRunner({ id: row.id}).then(data => {
            console.log(data)
            this.$baseMessage('运行完成!', 'success')
            val.target.innerText = '运行'
          })
        }
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
      handleAdd() {
        const tokens = localStorage.getItem("token")
        this.$refs['edit'].showEdit(tokens)
      },
      handleEdit(row) {
        this.$refs['edit'].showEdits(row)
      },
      uncompress(row) {
        console.log(row.is_zip)
        if(row.is_zip == "已解压"){
          this.$baseMessage('已经解压完成！不能在操作', 'error')
          return false
        }
        Uncompress({ id: row.id }).then(data => {
          this.$baseMessage('操作完成！', 'success')
          this.fetchData()
        })
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
        this.queryForm.pageNo = 1
        this.fetchData()
      },
    },
  }
</script>
