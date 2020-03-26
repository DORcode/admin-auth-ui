<template>
  <div id="app">
    <Card class="card-query">
      <Row>
        <h3>查询条件</h3>
      </Row>
      <Divider/>
      <Form ref="queryFrom" class="query-form" :model="formData" label-position="right" :label-width="100">
        <Row :gutter="32">
          <Col span="6">
            <FormItem label="姓名">
              <Input v-model="formData.name" size="default" placeholder="输入姓名" clearable />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="用户名">
              <Input v-model="formData.username" size="default" placeholder="输入用户名" clearable />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="性别">
              <Select v-model="formData.sex" size="default">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
            </Select>
              <!-- <Input v-model="formData.sex" placeholder="输入性别" /> -->
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="手机号">
              <Input v-model="formData.mobile" size="default" placeholder="输入手机号" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="6">
            <FormItem label="编码">
              <Input v-model="formData.code" size="default" placeholder="输入编码" clearable />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="创建时间">
              <DatePicker v-model="formData.createTime" type="daterange" size="default" placeholder="please select the date" style="display: block" placement="bottom-end"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="修改时间">
              <DatePicker v-model="formData.updateTime" type="daterange" placeholder="please select the date" size="default" style="display: block" placement="bottom-end"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col span="8">
            <FormItem>
              <Button size="media" type="primary" @click="handleSubmit('formValidate')">Query</Button>
              <Button size="media" @click="handleReset()" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="card-list">
      <table-page :tableTitle="tableTitle" :columnsList="columnsList" :tableColumnsChecked="tableColumnsChecked"></table-page>
    </Card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit, Inject, Model, Provide } from 'vue-property-decorator'
import TablePage from '@/components/table/table-page.vue'
@Component({
  components: {
    TablePage
  }
})
export default class App extends Vue {
  // 用户管理
  tableTitle = '用户列表'

  formData: any = {}

  columnsList: Array<any> = []

  tableColumnsChecked: Array<string> = ['name', 'username']

  handleSubmit () {
    console.log(this.formData)
  }

  handleReset (name: any) {
    const qf: any = this.$refs.queryFrom
    qf.resetFields()
  }

  mounted () {
    console.log()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './user.less';
</style>
