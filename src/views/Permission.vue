<template>
  <div id="app">
    <Tabs>
      <TabPane label="角色查询"></TabPane>
      <TabPane label="绑定用户"></TabPane>
      <TabPane label="绑定权限"></TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit, Inject, Model, Provide } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Permission extends Vue {
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
