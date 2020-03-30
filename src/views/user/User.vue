<template>
  <div id="app">
    <Card class="card-query">
      <Row align="middle">
        <Col span="8">
          <h4>{{$t('queryCondition')}}</h4>
        </Col>
        <Col style="left:0px;float: right;">
            <Button icon="ios-search" size="small" type="primary" @click="handleSubmit('formValidate')">{{$t('query')}}</Button>
            <Button icon="ios-remove" size="small" type="error" @click="handleReset()" style="margin-left: 8px">{{$t('reset')}}</Button>
        </Col>
      </Row>
      <Divider style="margin-top:3px;margin-bottom:3px" />
      <Form ref="formData" class="query-form" :model="formData" label-position="right" :label-width="100">
        <Row :gutter="32" align="middle">
          <Col span="6">
            <FormItem :label="$t('name')" prop="name">
              <Input v-model="formData.name" size="default" :placeholder="$t('userPage.inputName')" clearable />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('username')" prop="username">
              <Input v-model="formData.username" size="default" :placeholder="$t('userPage.inputUserName')" clearable />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('sex')" prop="sex">
              <Select v-model="formData.sex" size="default" :placeholder="$t('userPage.inputSex')">
                <Option value="1">{{$t('man')}}</Option>
                <Option value="2">{{$t('woman')}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('phoneNum')" prop="mobile">
              <Input v-model="formData.mobile" size="default" :placeholder="$t('userPage.inputPhone')" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32" align="middle">
          <Col span="6">
            <FormItem :label="$t('code')" prop="code">
              <Input v-model="formData.code" size="default" :placeholder="$t('userPage.inputCode')" clearable />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('createTime')" prop="createTimeTemp">
              <DatePicker v-model="formData.createTimeTemp" type="daterange" size="default" :placeholder="$t('inputCreateTime')" style="display: block" placement="bottom-end"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('updateTime')" prop="updateTimeTemp">
              <DatePicker v-model="formData.updateTimeTemp" type="daterange" :placeholder="$t('inputUpdateTime')" size="default" style="display: block" placement="bottom-end"></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="card-list">
      <table-page ref="tablePage"
          :loading="loading"
          :total="total"
          :current="current"
          :size="size"
          :tableTitle="userList"
          :dataList="dataList"
          :columnsList="columnsList"
          :tableColumnsCheckedInit="tableColumnsCheckedInit"
          :importAction="importAction"
          @remove="deleteUser"
          @deleteAll="deleteAll"
          @exportData="exportData"
          @changePage="changePage"
          @changePageSize="changePageSize"
          @add="addUser"
          @edit="editUser">
        </table-page>
    </Card>
    <Modal
      v-model="addModal"
      :title="addTitle==1 ? $t('add') : $t('edit')"
      width="500">
      <Form ref="createForm" class="create-form" :model="createFormData" :rules="createRuleInline" label-position="right" :label-width="100">
        <Row :gutter="32" align="middle">
          <Col span="16">
            <FormItem :label="$t('name')" prop="name">
              <Input v-model="createFormData.name" size="default" :placeholder="$t('userPage.inputName')" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32" align="middle">
          <Col span="16">
            <FormItem :label="$t('username')" prop="username">
              <Input v-model="createFormData.username" size="default" :placeholder="$t('userPage.inputUserName')" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32" align="middle">
          <Col span="16">
            <FormItem :label="$t('sex')" prop="sex">
              <Select v-model="createFormData.sex" size="default" :placeholder="$t('userPage.inputSex')">
                <Option value="1">{{$t('man')}}</Option>
                <Option value="2">{{$t('woman')}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32" align="middle">
          <Col span="16">
            <FormItem :label="$t('phoneNum')" prop="mobile">
              <Input v-model="createFormData.mobile" size="default" :placeholder="$t('userPage.inputPhone')" clearable />
            </FormItem>
          </Col>
        </Row>
        <!-- <Row :gutter="32" align="middle">
          <Col span="16">
            <FormItem :label="$t('code')" prop="code">
              <Input v-model="createFormData.code" size="default" :placeholder="$t('userPage.inputCode')" clearable />
            </FormItem>
          </Col>
        </Row> -->
      </Form>
      <div slot="footer">
        <Button type="text" size="default" @click="cancel">{{$t('cancel')}}</Button>
        <Button type="primary" size="default" @click="okAdd">{{$t('ok')}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit, Inject, Model, Provide } from 'vue-property-decorator'
import TablePage from '@/components/table/table-page.vue'
@Component({
  data () {
    return {
      tableTitle: this.$i18n.t('userPage.userList')
    }
  },
  components: {
    TablePage
  },
  computed: {
  }
})
export default class User extends Vue {
  // 用户管理
  // tableTitle: string = this.userList() // window['vm'].$i18n.t('userPage.userList') // this.$i18n.t('userPage.userList')
  loading = false

  addModal = false

  addTitle = 1

  editModal = false

  total = 0

  formData: any = {}

  dataList: Array<any> = []

  columnsList: Array<any> = [
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '用户名',
      key: 'username'
    },
    {
      title: '性别',
      key: 'sex'
    },
    {
      title: '手机号',
      key: 'mobile'
    },
    {
      title: '编码',
      key: 'code'
    },
    {
      title: '创建时间',
      key: 'createTime'
    }
  ]

  current = 1

  size = 10

  tableColumnsCheckedInit: Array<string> = ['name', 'username', 'code', 'mobile', 'createTime']

  createFormData: any = {}

  createRuleInline: any = {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    sex: [
      { required: true, message: '请输入性别', trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3456789]\d{9}$/, message: '手机格式不正确', trigger: 'blur' }
    ]
  }

  importAction = ''

  handleSubmit () {
    console.log(this.formData)
    this.getUserList()
  }

  handleReset () {
    this.formData = {}
    // const qf: any = this.$refs.formData
    // qf.resetFields()
  }

  beforeCreate () {
    console.log(this.$route.matched[1].components.default.name)
    console.log(this)
    console.log(this.$vnode)
    console.log(this.$vnode.componentInstance)
    console.log('beforeCreate')
  }

  destroyed () {
    console.log('destroyed')
  }

  getUserList () {
    this.loading = true
    this.formData.page = this.current// this.current
    this.formData.size = this.size
    if (this.formData.createTimeTemp && this.formData.createTimeTemp[0]) {
      this.formData.createTimeStart = this.formData.createTimeTemp[0]
    }

    if (this.formData.createTimeTemp && this.formData.createTimeTemp[1] &&
        this.formData.createTimeTemp[0] !== this.formData.createTimeTemp[1]) {
      this.formData.createTimeEnd = this.formData.createTimeTemp[1]
    }

    if (this.formData.updateTimeTemp && this.formData.updateTimeTemp[0]) {
      this.formData.updateTimeStart = this.formData.updateTimeTemp[0]
    }

    if (this.formData.updateTimeTemp && this.formData.updateTimeTemp[1] &&
        this.formData.updateTimeTemp[0] !== this.formData.updateTimeTemp[1]) {
      this.formData.updateTimeEnd = this.formData.updateTimeTemp[1]
    }
    this.$api.selectSysUsers(this.formData).then(
      (res: any) => {
        console.log(res)
        if (res && res.data && res.data.success && res.data.length >= 0) {
          this.dataList = res.data
        }
        // else {
        //   if (res && res.data && res.data.msg) {
        //     this.$Message.warning(res.data.msg)
        //   }
        // }
      }
    )
    this.loading = false
  }

  // 新增、编辑用户
  okAdd () {
    const ref: any = this.$refs.createForm
    ref.validate((valid: any) => {
      if (valid) {
        // 无id的为新增
        if (!this.createFormData.id) {
          this.$api.insertSysUser(this.createFormData).then(
            (res: any) => {
              if (res && res.data && res.data.success && res.data.length >= 0) {
                this.createFormData = {}
                this.addModal = false
                this.getUserList()
              }
            }
          )
        } else {
          this.$api.updateSysUser(this.createFormData).then(
            (res: any) => {
              if (res && res.data && res.data.success && res.data.length >= 0) {
                this.createFormData = {}
                this.addModal = false
                this.getUserList()
              }
            }
          )
        }
      } else {
        this.addModal = true
      }
    })
  }

  cancel () {
    this.addModal = false
    console.log()
  }

  addUser () {
    this.addTitle = 1
    this.addModal = true
  }

  // 编辑回调
  editUser (index: number) {
    this.addModal = true
    this.addTitle = 2
    this.createFormData = this.dataList[index]
  }

  // 导出数据，目前导出当前页
  exportData () {
    const table: any = this.$refs.tablePage
    const t: any = table.$refs.tableData
    t.exportCsv({
      filename: 'The original data'
    })
  }

  // 删除用户
  deleteUser (index: number) {
    console.log()
    this.$api.deleteSysUserById(this.dataList[index]).then(
      (res: any) => {
        if (res.data && res.data.success) {
          this.dataList.splice(index, 1)
          this.$Message.info(res.data.message)
        } else {
          this.$Message.error(res.data.message)
        }
      }
    )
  }

  // 删除多条数据
  deleteAll (data: any) {
    if (data.length === 0) {
      this.$Message.warning('请选择要删除的数据！')
    } else {
      this.$api.deleteSysUsers(data).then(
        (res: any) => {
          if (res.data && res.data.success) {
            this.getUserList()
            this.$Message.info(res.data.message)
          } else {
            this.$Message.error(res.data.message)
          }
        }
      )
    }
  }

  changePage (page: number) {
    this.current = page
    this.getUserList()
  }

  changePageSize (size: number) {
    this.size = size
    this.getUserList()
    // 请求数据
  }

  get userList (): any {
    // this.ableTitle = this.$i18n.t('userPage.userList')
    return this.$i18n.t('userPage.userList')
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './user.less';
</style>
