<template>
  <div class="page">
    <error-page desc="服务端错误" color="red"></error-page>
  </div>
</template>

<script type="text/ecmascript-6">
import ErrorPage from './error-page'

export default {
  data () {
    return {

    }
  },
  components: {
    ErrorPage
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
