<template>
  <div id="app">
    <!-- 用来实现选中列进行显示 -->
    <Row>
      <h3>{{tableTitle}}</h3>
    </Row>
    <Divider/>
    <Row>
      <Row class="header-row">
        <Button class="btn btn-add" :disabled="!isAddable" icon="ios-add" type="info" size="default" @click="addModal=true">新增</Button>
        <Button class="btn btn-delete" icon="ios-remove" type="error" size="default" @click="deleteAll">删除全部</Button>
        <Button class="btn" type="info" icon="ios-arrow-dropup" size="default" @click="importData">导入数据</Button>
        <Button class="btn" type="info" icon="ios-arrow-down" size="default" @click="exportData">导出数据</Button>
        <Button class="btn" type="success" icon="ios-download" size="small" @click="openDrawer = true">表头</Button>
      </Row>
    </Row>
    <Row class = "table-content">
      <Drawer :inner="true" :transfer="false" :closable="false" v-model="openDrawer">
        <div slot="header">
          <Icon type="md-aperture" :size="18"></Icon>
          <b>表头选择</b>
        </div>
        <Checkbox-group v-for="item in columnsList" :key="item.key" v-model="tableColumnsChecked" @on-change="changeTableColumns">
          <Checkbox :label="item.key">{{ item.title }}</Checkbox>
        </Checkbox-group>
      </Drawer>
      <Table ref="table" :loading="loading" :border="showBorder" :data="dataList"
        :columns="showColumnsList"
        @on-select-cancel="selectCancel"
        @on-select-all-cancel="selectAllCancel"
        @on-selection-change="selectChange"
        @on-select-all="selectAll"
        @on-sort-change="sortChange">
        <template slot-scope="{ row, index }" slot="action" v-show="isShowAction">
          <Poptip confirm trigger="click" title="Title" content="content" >
            <Button :disabled="!isEditable" type="primary" size="small" @click="edit(index)" style="margin-right: 5px">Edit</Button>
          </Poptip>
          <Poptip confirm trigger="click" title="Title" content="content" >
            <Button :disabled="!isDeleteable" type="error" size="small" @click="remove(index)">Delete</Button>
          </Poptip>
        </template>
      </Table>
    </Row>
    <div v-show="isShowPage" style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="current" @on-change="changePage"></Page>
        </div>
    </div>
    <Modal
      v-model="addModal"
      title="新增"
      @on-ok="okAdd"
      @on-cancel="cancel">
      <slot></slot>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit, Inject, Model, Provide } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class TablePage extends Vue {
  openDrawer = false

  addModal = false

  @Prop({ type: String })
  tableTitle!: string

  // 是否显示遮罩
  @Prop({ required: false, default: false })
  loading!: boolean

  // 是否显示选择框
  @Prop({ type: Boolean, required: false, default: true })
  showCheckbox!: boolean

  // 是否显示序号
  @Prop({ type: Boolean, required: false, default: true })
  showIndex!: boolean

  // 是否显示边框
  @Prop({ type: Boolean, required: false, default: true })
  showBorder!: boolean

  @Prop({ required: false, default: false })
  isShowPage!: boolean

  @Prop({ required: false, default: true })
  isShowAction!: boolean

  // 分页数据
  @Prop()
  dataList!: Array<any>

  // 表头
  @Prop()
  columnsList!: Array<any>

  // 总页数
  @Prop({ default: 0 })
  total!: number

  @Prop({ required: false, default: 0 })
  current!: number

  @Prop({ required: false, default: true })
  isAddable!: boolean

  @Prop({ required: false, default: true })
  isEditable!: boolean

  @Prop({ required: false, default: false })
  isDeleteable!: boolean

  @Prop({ default: [] })
  tableColumnsChecked!: Array<string>

  showColumnsList: Array<any> = []

  deleteAllList: Array<any> = []

  changePage () {
    console.log('')
  }

  getShowColumnsList () {
    const data: Array<any> = []
    if (this.showCheckbox) {
      data.push({
        type: 'selection',
        width: 60,
        align: 'center'
      })
    }

    if (this.showIndex) {
      data.push({
        type: 'index',
        width: 60,
        align: 'center'
      })
    }

    this.columnsList.forEach(
      (val) => {
        if (val.key && this.tableColumnsChecked.indexOf(val.key) >= 0) {
          data.push(val)
        }
      }
    )
    if (this.isShowAction) {
      data.push(
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      )
    }
    if ((this.columnsList && this.columnsList.length === 0) || !this.columnsList) {
      this.isShowPage = false
      return []
    }
    return data
  }

  initCheckedColumns () {
    const data: Array<any> = []
    this.columnsList.forEach(
      val => {
        data.push(val.key)
      }
    )
    return data
  }

  changeTableColumns () {
    this.showColumnsList = this.getShowColumnsList()
  }

  selectCancel (selection: any, row: any) {
    console.log('selectCancel')
    console.log(selection)
    console.log(row)
  }

  selectAllCancel (selection: any) {
    console.log('selectAllCancel')
    console.log(selection)
  }

  selectChange (selection: any) {
    console.log('selectChange')
    console.log(selection)
  }

  selectAll (selection: any) {
    console.log('selectAll')
    console.log(selection)
  }

  sortChange (column: string, key: number, order: string) {
    console.log('sortChange')
    console.log(column)
    console.log(key)
    console.log(order)
  }

  // 新增
  add () {
    console.log()
  }

  // 删除所有数据
  deleteAll () {
    const table: any = this.$refs.table
    const data = table.getSelection()
    if (data.length > 0) {
      console.log(data)
    } else {
      this.$Message.warning('请选择要删除的数据！')
    }
  }

  // 导入数据
  importData () {
    console.log()
  }

  // 导出数据
  exportData () {
    console.log()
  }

  // 删除
  @Emit()
  remove (index: number) {
    return index
  }

  // 编号
  @Emit()
  edit (index: number) {
    return index
  }

  @Emit()
  okAdd () {
    console.log()
  }

  cancel () {
    console.log()
  }

  created () {
    this.initCheckedColumns()
  }

  mounted () {
    this.changeTableColumns()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .header-row {
    float: right;
    // margin-top: 10px;
    margin-bottom: 5px;
  }

  .btn {
    margin-right: 10px;
  }

  .btn-delete {
    margin-right: 20px;
  }

  .table-content {
    position: relative;
    // width: 100%;
    // height: 100%;
    // padding: 10px;
  }
</style>
