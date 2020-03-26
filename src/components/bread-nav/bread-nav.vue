<template>
  <div id="app">
    <Breadcrumb class="bread" >
      <BreadcrumbItem v-for="(item, index) in list" :key="index" >
        <Icon :type="item.icon" v-show="item.icon !== null"></Icon>
        {{item.name}}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit, Inject, Model, Provide } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class BreadNav extends Vue {
  @Prop({ type: Array })
  list!: Array<object>
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './bread-nav.less';
</style>
