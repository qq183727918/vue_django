<template>
  <div id="table-container" class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          新增用例
        </el-button>
        <el-button icon="el-icon-edit" @click="handleEdits">
          编辑
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
            <el-input v-model="queryForm.name" placeholder="用例名称" />
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
        label="用例名称"
        prop="name"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="用例描述"
        prop="des"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="created_time"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="400px">
        <template #default="{ row }">
          <el-button ref="Run_btn_{{row.id}}" type="primary" @click="handleapis(row,$event)">运行</el-button>
          <el-button type="warning" @click="handleSet(row)">设置</el-button>
          <el-button type="info" @click="handleReport(row)">查看报告</el-button>
          <el-button @click="CopyCase(row)">复制</el-button>
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
    <table-case ref="case"></table-case>
    <table-new ref="new"></table-new>
  </div>
</template>

<script>
  import { getList, doDelete, CopyCase, RunCase, LookReport, SmallList } from '@/api/project/cases'
  import { GetProList } from '@/api/project/list'
  import TableEdit from './components/cases/cases'
  import TableCase from './components/cases/caseEdit'
  import TableNew from './components/cases/casenew'
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
      TableCase,
      TableNew,
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
        select: {
         options: [
           {
            value: '选项1',
            label: '黄金糕'
          }],
          value: '',
          label: ''
        },
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在玩命的加载...',
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
    created() {
      this.fetchData()
      this.resfet()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      //预览描述的时候富文本设值
      handleReport(row) {
        LookReport({ id: row.id }).then(data => {
          console.log(data)
          var tempwindow = window.open('_blank')
          tempwindow.location.href = data.message
        })
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
        GetProList().then(data => {
          const lists = data.data
          const getpro = new Array()
          for(var s = 0; s < lists.length; s++){
            const dic = {}
            dic.value = lists[s].listName
            dic.label = lists[s].id
            getpro.push(dic)
          }
          console.log(getpro)
          this.$refs['edit'].showEdit(getpro)
        })
      },
      handleEdits() {
        if (this.selectRows.length > 0) {
          console.log(this.selectRows.length)
          if (this.selectRows.length > 1){
            this.$baseMessage('只能勾选一条数据', 'error')
            return false
          }else {
            GetProList().then(data => {
              const lists = data.data
              const getpro = new Array()
              for(var s = 0; s < lists.length; s++){
                const dic = {}
                dic.value = lists[s].listName
                dic.label = lists[s].id
                getpro.push(dic)
              }
              this.$refs['case'].showEdits(this.selectRows.map((item) => item), getpro)
              // this.$refs['edit'].showEdit(getpro)
            })
          }
        } else {
          this.$baseMessage('未选中任何行', 'error')
          return false
        }        
      },
      handleEdit(row) {
        this.$refs['case'].showEdits(row)
      },
      handleSet(row) {
        this.$refs['new'].showEditn(row)
      },
      handleapis(row, val) {
        SmallList({ id: row.id }).then(data => {
          const cases = data.data.length
          if(cases == 0){
            this.$baseMessage('该用例下没有接口存在', 'error')
          }else{
            val.target.innerText = this.stuname
            RunCase({case_id: row.id}).then(data =>{
              console.log(data)
              this.$baseMessage(data.message, 'success')
              val.target.innerText = '运行'
            })
          }
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
      CopyCase(row) {
        const { message } = CopyCase({ ids: row.id })
        this.$baseMessage('OK', 'success')
        this.fetchData()
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

<style scoped>
  #new {
    margin: 0 10px 10px 0;
  }
</style>


