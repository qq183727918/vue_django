<template>
  <div id="table-container" class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <!-- <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          禁用
        </el-button> -->
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <!-- <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.listName" placeholder="账号" />
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
        </el-form> -->
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
        prop="username"
        label="账号"
      ></el-table-column>
      <!-- <el-table-column
        show-overflow-tooltip
        label="备注"
        prop="remark"
      ></el-table-column> -->
      <el-table-column show-overflow-tooltip label="状态">
        <template #default="{ row }">
          <el-tooltip
            :content="row.is_active"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.is_active | statusFilter">
              {{ row.is_active }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="created_time"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="230px">
        <template #default="{ row }">
          <el-button type="success" @click="handleEdit(row)">启用</el-button>
          <el-button type="danger" @click="handleDelete(row)">禁用</el-button>
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
  import { getList, doDelete } from '@/api/project/user'
  import TableEdit from './components/user'
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
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
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
        this.$refs['edit'].showEdit()
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要禁用当前项吗', null, async () => {
            const { message } = await doDelete({ ids: row.id })
            this.$baseMessage(message, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要禁用选中项吗', null, async () => {
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
