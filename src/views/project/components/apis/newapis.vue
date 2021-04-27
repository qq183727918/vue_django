<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="80%"
    @close="close"
  >
    <el-form ref="forms" :model="form" :rules="rules" label-width="40px">
      <el-form-item>
        <div class="selectk">
          项目名称：
        </div>
        <div class="selectk">
          <el-select v-model="input1.value" clearable placeholder="项目名称">
              <el-option
                v-for="items in input1.options"
                :key="items.value"
                :label="items.value"
                :value="items.label">
              </el-option>
            </el-select>
        </div>
        <div class="selects">
          接口名称：
        </div>
        <div class="selects">
          <el-input
            v-model="input2"
            placeholder="请输入接口名称"
            prefix-icon="el-icon-search">
          </el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="select">
          <el-select ref="selectm" v-model='select.value' filterable placeholder='请选择请求方式'>
            <el-option
              v-for='item in select.options'
              :key='item.value'
              :label='item.label'
              :value='item.value'
              >
            </el-option>
          </el-select>
        </div>
        <div class='input' style="width: 80%">
          <el-input v-model='input' placeholder='请输入内容'></el-input>
        </div>
        <div class='button'>
          <el-button type='success' @click="sendRequest">发送请求</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-tabs v-model="ActiveName" type="border-card" @tab-click="tabchange">
          <el-tab-pane name="header">
            <span slot="label">
              <i class="el-icon-s-finance"></i>
              请求头部
            </span>
            <div>
              <ul class="url-li">
                <li class="tableheaders">KEY</li>
                <li class="tableheaders">VALUE</li>
                <li style="color: rgb(25, 128, 245)">操作</li>
              </ul>
              <el-col :span="24">
                <el-form
                  v-for="(item, index) in formArr"
                  :key="index"
                  :inline="true"
                >
                  <el-input v-model="item.key" class="tableheader"></el-input>
                  <el-input v-model="item.value" class="tableheader"></el-input>
                  <el-button type="danger" @click="del(index)">删除</el-button>
                </el-form>
                <el-button type="primary" @click="add">新增</el-button>
              </el-col>
            </div>
          </el-tab-pane>
          <el-tab-pane name="body">
            <span slot="label">
              <i class="el-icon-s-help"></i>
              请求体
            </span>
            <div>
              <el-radio-group v-model="radio">
                <el-radio :label="1">None</el-radio>
                <el-radio :label="2">Form-data</el-radio>
                <el-radio :label="3">X-www-form-urlencoded</el-radio>
                <el-radio :label="4">Raw</el-radio>
                <el-radio :label="5">Binary</el-radio>
              </el-radio-group>
              <hr>
              <div v-if="radio == 1" style="text-align: center; color: grey">
                <h3>这个请求将不会携带任何请求体</h3>
                <h5>This request will not carry any request-body</h5>
              </div>
              <div v-if="radio == 2" id="form-data">
                <ul class="url-lis">
                  <li class="tableheaderf">KEY</li>
                  <li class="tableheaderf">VALUE</li>
                  <li style="color: rgb(143, 24, 199)">操作</li>
                </ul>
                <el-col :span="24">
                  <el-form
                    v-for="(item, index) in formArrf"
                    :key="index"
                    :inline="true"
                  >
                    <el-input v-model="item.key" class="tableheader" />
                    <el-input v-model="item.value" class="tableheader" />
                    <el-button type="danger" @click="delf(index)">删除</el-button>
                  </el-form>
                  <el-button type="primary" @click="addf">新增</el-button>
                </el-col>
              </div>
              <div v-if="radio == 3" id="X-www-form-urlencoded">
                <ul class="url-lis">
                  <li class="tableheaderx">KEY</li>
                  <li class="tableheaderx">VALUE</li>
                  <li style="color: rgb(218, 114, 17)">操作</li>
                </ul>
                <el-col :span="24">
                  <el-form
                    v-for="(item, index) in formArrx"
                    :key="index"
                    :inline="true"
                  >
                    <el-input v-model="item.key" class="tableheader" />
                    <el-input v-model="item.value" class="tableheader" />
                    <el-button type="danger" @click="delx(index)">删除</el-button>
                  </el-form>
                  <el-button type="primary" @click="addx">新增</el-button>
                </el-col>
              </div>
              <div v-if="radio == 4">
                <el-button type="success" class="beautiy" @click="beautiy">格式化</el-button>
                <el-input
                  v-model="textarea"
                  type="textarea"
                  :rows="10"
                  resize="none"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </div>
            <div v-if="radio == 5">
              <br>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传不超过500kb</div>
              </el-upload>
            </div>
          </el-tab-pane>
          <el-tab-pane name="query">
            <span slot="label">
              <i class="el-icon-help"></i>
              Query参数
            </span>
            <div>
              <ul class="url-li">
                <li class="tableheaderq">KEY</li>
                <li class="tableheaderq">VALUE</li>
                <li style="color: rgb(25, 128, 245)">操作</li>
              </ul>
              <el-col :span="24">
                <el-form
                  v-for="(item, index) in formArrq"
                  :key="index"
                  :inline="true"
                >
                  <el-input v-model="item.key" class="tableheader"></el-input>
                  <el-input v-model="item.value" class="tableheader"></el-input>
                  <el-button type="danger" @click="delq(index)">删除</el-button>
                </el-form>
                <el-button type="primary" @click="addq">新增</el-button>
              </el-col>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-success"></i>
              返回结果
            </span>
            <json-viewer v-model="values" :expand-depth=4 copyable sort></json-viewer>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-share"></i>
              提取返回值
            </span>
            <span>提取返回值-路径法</span><br>
            <el-input
              v-model="ExtractPath"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="提取返回值-路径法：参数名的字符串=路径 这种方式提取，多个用换行分割，例如：name=/data/[3]/username"
              style="width: 50%"
            >
            </el-input>
            <el-input
              v-model="ExtractPathre"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="提取返回值-路径法：返回结果展示"
              style="width: 50%"
            >
            </el-input>
            <br>
            <span>提取返回值-正则法</span><br>
            <el-input
              v-model="ExtractRe"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="提取返回值-正则法：参数名的字符串=左边界字符串(.*?)右边界，多个用换行分割，例如：name=username:'(.*?);"
              style="width: 50%"
            >
            </el-input>
            <el-input
              v-model="ExtractRere"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="提取返回值-正则法：返回结果展示"
              style="width: 50%"
            >
            </el-input>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-document-checked"></i>
              断言结果
            </span>
            <span>断言-路径法</span><br>
            <el-input
              v-model="AssertPath"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="断言返回值-路径法：路径=预期值,字符串必须写引号,等号右侧会被求值。多个用换行分隔，例如：/data/[3]/username='wangzijia'"
              style="width: 50%"
            >
            </el-input>
            <el-input
              v-model="AssertPathre"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="断言返回值-路径法：返回结果展示"
              style="width: 50%"
            >
            </el-input><br>
            <span>断言-全文检索</span><br>
            <el-input
              v-model="AssertAll"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="断言返回值-全文检索：进行全文检索，存在即通过，全部按照字符串检索，不要加引号，多个用换行分隔，例如：123495\n请求成功\ncode:200"
              style="width: 50%"
            >
            </el-input>
            <el-input
              v-model="AssertAllre"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="断言返回值-全文检索：返回结果展示"
              style="width: 50%"
            >
            </el-input><br>
            
            <span>预期结果</span><br>
            <el-input
              v-model="ExpectedResult"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="断言返回值-正则法：左边界字符串(.*?)右边界 = 预期值，字符串必须写引号，等号右侧会被求值，多个用换行分隔，例如：username':(.*?),='wangzijia'"
              style="width: 50%"
            >
            </el-input>
            <el-input
              v-model="ExpectedResultre"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="断言返回值-全文检索：返回结果展示"
              style="width: 50%"
            >
            </el-input>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-s-flag"></i>
              自定义固定返回值
            </span>
            <span>MOCK</span>
            <el-input
              v-model="mock"
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="若想mock(写死)返回值，请在此直接写好保存。为空则不启用mock功能。"
            >
            </el-input>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, SaveApis, sendRequest } from '@/api/project/apis'
  import { GetProList } from '@/api/project/list'
  export default {
    name: 'TableApi',
    data() {
      return {
        mock: '',
        ExpectedResult: '',
        AssertPath: '',
        AssertAll: '',
        ExtractPath: '',
        ExtractRe: '',
        ExpectedResultre: '',
        AssertPathre: '',
        AssertAllre: '',
        ExtractPathre: '',
        ExtractRere: '',
        select: {
          options: [
            {
              value: 'GET',
              label: 'GET'
            },
            {
              value: 'POST',
              label: 'POST'
            },
            {
              value: 'PUT',
              label: 'PUT'
            },
            {
              value: 'DELETE',
              label: 'DELETE'
            },
            {
              value: 'OPTIONS',
              label: 'OPTIONS'
            },
            {
              value: 'HEAD',
              label: 'HEAD'
            },
            {
              value: 'PATCH',
              label: 'PATCH'
            }
          ],
            value: ''
        },
        formArrf: [
          {
            key: '',
            value: '',
          },
        ],
        formArr: [
          {
            key: '',
            value: '',
          },
        ],
        formArrq: [
          {
            key: '',
            value: '',
          },
        ],
        formArrx: [
          {
            key: '',
            value: '',
          },
        ],
        form: {
        },
        rules: {
        },
        title: '',
        dialogFormVisible: false,
        input: '',
        input1: {
         options: [
           {
            value: '选项1',
            label: '黄金糕'
          }],
          value: '',
          label: ''
         },
        input2: '',
        radio: 1,
        textarea: '',
        textareas: '响应数据',
        ActiveName: 'header',
        fileList: [{}],
        values: '接口响应结果',
      }
    },
    created() {},
    methods: {
      beautiy () {
        this.textarea = JSON.stringify(JSON.parse(this.textarea),null,4)
      },
      tabchange(tab) {
        this.ActiveName = tab.name
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      add() {
        this.formArr.push({
          key: '',
          value: '',
        })
        console.log(this.formArr)
      },
      del(index) {
        this.formArr.splice(index, 1)
      },
      addq() {
        this.formArrq.push({
          key: '',
          value: '',
        })
        console.log(this.formArrq)
      },
      delq(index) {
        this.formArrq.splice(index, 1)
      },
      addf() {
        this.formArrf.push({
          key: '',
          value: '',
        })
        console.log(this.formArrf)
      },
      delf(index) {
        this.formArrf.splice(index, 1)
      },
      addx() {
        this.formArrx.push({
          key: '',
          value: '',
        })
        console.log(this.formArrx)
      },
      delx(index) {
        this.formArrx.splice(index, 1)
      },
      showEdits(row, getpro) {
        console.log(getpro)
        this.title = '接口新增'
        this.dialogFormVisible = true
        this.input1 = {options: getpro}
      },
      close() {
        this.$refs['forms'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        if(this.input1.value == undefined){
          this.$baseMessage('请选择项目', 'error')
          return false
        }
        if(this.input2 == ""){
          this.$baseMessage('请输入接口名称', 'error')
          return false
        }
        if(this.$refs.selectm.value == ""){
          this.$baseMessage('请选择请求方式', 'error')
          return false
        }
        if(this.input == "" ){
          this.$baseMessage('请输入请求地址', 'error')
          return false
        }
        
        this.$refs['forms'].validate(async (valid) => {
          console.log(this.input1.value)
          const pro_list = {}
          pro_list['project_id'] = this.input1.value
          pro_list['api_name'] = this.input2
          pro_list['method'] = this.$refs.selectm.value
          pro_list['url'] = this.input
          pro_list['tag'] = this.ActiveName
          pro_list['header'] = this.formArr
          pro_list['result'] = this.values
          if(this.ActiveName == 'body' || 'header'){
            if(this.radio == 1){
              pro_list['api_body'] = this.textareas
            }
            if(this.radio == 2){
              pro_list['api_body'] = this.formArrf
            }
            if(this.radio == 3){
              pro_list['api_body'] = this.formArrx
            }
            if(this.radio == 4){
              pro_list['api_body'] = this.textarea
            }
            pro_list['radio'] = this.radio
          }
          if(this.ActiveName == 'query'){
            pro_list['radio'] = 'None'
            pro_list['api_body'] = this.formArrq
          }
          pro_list['mock'] = this.mock
          pro_list['ExpectedResult'] = this.ExpectedResult
          pro_list['AssertPath'] = this.AssertPath
          pro_list['AssertRe'] = this.AssertAll
          pro_list['ExtractPath'] = this.ExtractPath
          pro_list['ExtractRe'] = this.ExtractRe
          console.log(pro_list)
          SaveApis(pro_list).then(data => {
            this.$baseMessage('保存成功', 'success')
            this.$refs['forms'].resetFields()
            this.form = this.$options.data().form
            this.dialogFormVisible = false
          })
          this.$parent.fetchData()
          
          // if (valid) {
          //   const { message } = await doEdit(pro_list)
          //   this.$baseMessage(message, 'success')
          //   this.$refs['form'].resetFields()
          //   this.dialogFormVisible = false
          //   this.$emit('fetch-data')
          //   this.form = this.$options.data().form
          // } else {
          //   return false
          // }
        })
      },
      sendRequest() {
        const pro_list = {}
        if(this.mock == ""){
          pro_list['mock'] = ""
        }else{
          const re = this.mock
          const striq1 = re[0]
          const striq2 = re.substr(re.length-1,1)
          if(striq1 == '{' && striq2 == '}'){
            try{
              pro_list['mock'] = JSON.parse(re)
            }
            catch{
              pro_list['mock'] = this.mock
            }
          }else{
            pro_list['mock'] = this.mock
          }
        }
        pro_list['ExpectedResult'] = this.ExpectedResult
        pro_list['AssertPath'] = this.AssertPath
        pro_list['AssertRe'] = this.AssertAll
        pro_list['ExtractPath'] = this.ExtractPath
        pro_list['ExtractRe'] = this.ExtractRe
        pro_list['project_name'] = this.input1
        pro_list['api_name'] = this.input2
        pro_list['method'] = this.$refs.selectm.value
        pro_list['url'] = this.input
        pro_list['tag'] = this.ActiveName
        pro_list['header'] = this.formArr
        if(this.ActiveName == 'body' || 'header'){
          if(this.radio == 1){
            pro_list['api_body'] = {}
          }
          if(this.radio == 2){
            pro_list['api_body'] = this.formArrf
          }
          if(this.radio == 3){
            pro_list['api_body'] = this.formArrx
          }
          if(this.radio == 4){
            pro_list['api_body'] = this.textarea
          }
          pro_list['radio'] = this.radio
        }
        if(this.ActiveName == 'query'){
          pro_list['radio'] = 'None'
          pro_list['api_body'] = this.formArrq
        }
        console.log(pro_list)
        sendRequest(pro_list).then(data => {
          console.log(data.data)
          this.ExtractPathre = data.ExtractPath
          this.ExtractRere = data.ExtractRe
          this.AssertAllre = data.AssertRe
          this.AssertPathre = data.AssertPath
          this.ExpectedResultre = data.ResultExpected
          const datas = toString(data.data)
          const str1 = datas[0]
          const str2 = datas.substr(datas.length-1,1)
          if(this.mock == ""){
            if(str1 == '{' && str2 == '}'){
              this.values = JSON.parse(data.data)
            }else{
              this.values = data.data
            }
          }else{
            const re = this.mock
            const striq1 = re[0]
            const striq2 = re.substr(re.length-1,1)
            if(striq1 == '{' && striq2 == '}'){
              try{
                this.values = JSON.parse(re)
              }
              catch{
                this.values = this.mock
              }
            }else{
              this.values = this.mock
            }
          }
          this.$baseMessage('请求成功', 'success')
        })
      }
    },
  }
</script>
<style>
  .beautiy {
    margin: 5px 0 5px 20px;
  }
  .select {
    float:left;
  }

  .selectk {
    float:left;
    padding-left: 100px;
  }

  .selects {
    float:left;
    padding-left: 100px;
  }

  .input {
    float:left;
    margin-right:5px;
  }
  
  .button {
    float:left;
  }
  .request-button:hover {
    background-color: rgb(77, 189, 25);
  }

  .tableheaderx {
    width: 46.5%;
    text-align: center;
    color: rgb(218, 114, 17);
  }

  .tableheaderf {
    width: 46.5%;
    text-align: center;
    color: rgb(143, 24, 199);
  }

  .tableheaders {
    width: 46.5%;
    text-align: center;
    color: rgb(25, 128, 245);
  }
  .tableheaderq {
    width: 46.5%;
    text-align: center;
    color: rgb(94, 233, 179);
  }
  .tableheader {
    width: 46.5%;
    margin: 0 2px 2px 4px;
  }
  *::-webkit-scrollbar {
    width: 0;
  }

  .url-li li {
    float: left;
    list-style: none;
    line-height: 5px;
  }

  .url-lis li {
    float: left;
    list-style: none;
    line-height: 30px;
  }

  .el-col {
    line-height: 45px;
  }

  * {
    padding: 0px;
    margin: 0px;
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
