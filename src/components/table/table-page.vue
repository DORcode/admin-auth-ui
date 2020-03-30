<template>
  <div id="app">
    <!-- 用来实现选中列进行显示 -->
    <Row align="middle">
      <Col span="8">
        <h4>{{tableTitle}}</h4>
      </Col>
      <Col class="header-row">
        <Dropdown class="manage-buttons">
          <a href="javascript:void(0)" style="font-size: 20px">
            <Icon :size="25" type="md-arrow-dropdown"/>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem >
              <Button class="btn btn-add" :disabled="!isAddable" icon="ios-add" type="info" size="default" @click="add">{{$t('add')}}</Button>
            </DropdownItem>
            <DropdownItem >
              <Button class="btn btn-delete" :disabled="!isDeleteable" icon="ios-remove" type="error" size="default" @click="deleteAll">{{$t('deleteAll')}}</Button>
            </DropdownItem>
            <DropdownItem >
              <Upload :action="importAction" style="width:110px;heigth:32px;">
                <Button class="btn" type="info" icon="ios-arrow-dropup" size="default" @click="importData">{{$t('importData')}}</Button>
              </Upload>
            </DropdownItem>
            <DropdownItem >
              <Button class="btn" type="info" icon="ios-arrow-down" size="default" @click="exportData">{{$t('exportData')}}</Button>
            </DropdownItem>
            <DropdownItem >
              <Button class="btn" type="success" icon="ios-download" size="small" @click="openDrawer = true">{{$t('headerTitile')}}</Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!-- <Button class="btn btn-add" :disabled="!isAddable" icon="ios-add" type="info" size="default" @click="add">{{$t('add')}}</Button>
        <Button class="btn btn-delete" :disabled="!isDeleteable" icon="ios-remove" type="error" size="default" @click="deleteAll">{{$t('deleteAll')}}</Button>
        <Upload :action="importAction" style="width:110px;heigth:32px;">
          <Button class="btn" type="info" icon="ios-arrow-dropup" size="default" @click="importData">{{$t('importData')}}</Button>
        </Upload>
        <Button class="btn" type="info" icon="ios-arrow-down" size="default" @click="exportData">{{$t('exportData')}}</Button>
        <Button class="btn" type="success" icon="ios-download" size="small" @click="openDrawer = true">{{$t('headerTitile')}}</Button> -->
      </Col>
    </Row>
    <Divider style="margin-top:3px;margin-bottom:3px" />
    <Row class = "table-content">
      <Drawer :inner="true" :transfer="false" :closable="false" v-model="openDrawer">
        <div slot="header">
          <Icon type="md-aperture" :size="18"></Icon>
          <b>{{$t('headerSelect')}}</b>
        </div>
        <Checkbox-group v-for="item in columnsList" :key="item.key" v-model="tableColumnsChecked" @on-change="changeTableColumns">
          <Checkbox :label="item.key">{{ item.title }}</Checkbox>
        </Checkbox-group>
      </Drawer>
      <Table ref="tableData" :loading="loading" :border="showBorder" :data="dataList"
        :columns="showColumnsList"
        min-height="500"
        @on-select-cancel="selectCancel"
        @on-select-all-cancel="selectAllCancel"
        @on-selection-change="selectChange"
        @on-select-all="selectAll"
        @on-sort-change="sortChange">
        <template slot-scope="{ row, index }" slot="action" v-show="isShowActionTemplate">
          <Poptip confirm trigger="click" title="Title" content="content" >
            <Button :disabled="!isEditable" type="primary" size="small" @click="edit(index)" style="margin-right: 5px">Edit</Button>
          </Poptip>
          <Poptip confirm trigger="click" title="Title" content="content" >
            <Button :disabled="!isDeleteable" type="error" size="small" @click="remove(index)">Delete</Button>
          </Poptip>
        </template>
        <slot name="action"></slot>
      </Table>
    </Row>
    <div v-show="isShowPage" style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="current"
            :page-size="size"
            :page-size-opts="pageSizeOpts"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            show-sizer
            show-total></Page>
        </div>
    </div>
    <slot name="modal"></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit, Inject, Model, Provide } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class TablePage extends Vue {
  openDrawer = false

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

  @Prop({ required: false, default: true })
  isShowPage!: boolean

  // 是否有Action列
  @Prop({ required: false, default: true })
  isShowAction!: boolean

  // 是否显示Action模板
  @Prop({ required: false, default: true })
  isShowActionTemplate!: boolean

  @Prop({ required: true})
  importAction!: string

  // 分页数据
  @Prop()
  dataList!: Array<any>

  // 表头
  @Prop()
  columnsList!: Array<any>

  // 总页数
  @Prop({ default: 0 })
  total!: number

  @Prop({ required: false, default: 10 })
  current!: number

  @Prop({ required: false, default: 1 })
  size!: number

  @Prop({ required: false, default: () => [10, 20, 50, 100] })
  pageSizeOpts!: number[]

  @Prop({ required: false, default: true })
  isAddable!: boolean

  @Prop({ required: false, default: true })
  isEditable!: boolean

  @Prop({ required: false, default: true })
  isDeleteable!: boolean

  tableColumnsChecked: Array<string> = []

  @Prop({ required: false, default: () => [] })
  tableColumnsCheckedInit!: Array<string>

  showColumnsList: Array<any> = []

  deleteAllList: Array<any> = []

  @Emit('changePage')
  changePage (page: number) {
    console.log('')
    return page
  }

  @Emit('changePageSize')
  changePageSize (size: number) {
    console.log()
    return size
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
      // this.isShowPage = false
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
  @Emit()
  add () {
    console.log()
  }

  // 删除所有数据
  @Emit('deleteAll')
  deleteAll () {
    const table: any = this.$refs.tableData
    const data = table.getSelection()
    return data
  }

  // 导入数据
  importData () {
    console.log()
  }

  // 导出数据
  @Emit('exportData')
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

  @Emit('okAdd')
  okAdd () {
    console.log()
  }

  cancel () {
    console.log()
  }

  created () {
    this.initCheckedColumns()

    this.tableColumnsChecked = this.tableColumnsCheckedInit
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
    // margin-bottom: 5px;
  }

  .ivu-upload {
    display: inline;
  }

  .btn {
    margin-left: 10px;
  }

  .table-content {
    position: relative;
    // width: 100%;
    // height: 100%;
    // padding: 10px;
  }
</style>
