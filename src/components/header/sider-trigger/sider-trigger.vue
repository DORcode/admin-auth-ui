<template>
  <div id="app">
    <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']"><Icon :type="icon" :size="size"></Icon></a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit, Inject, Model, Provide } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop({ type: Boolean }) collapsed!: boolean
  @Prop({ type: String, default: 'navicon-round' }) icon!: string
  @Prop({ type: Number, default: 26 }) size!: number

  @Emit('on-sider-change')
  handleChange () {
    return !this.collapsed
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './sider-trigger.less';
</style>
