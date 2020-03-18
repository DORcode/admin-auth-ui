<template>
  <div class="page">
      <div>
          <p v-bind:style="{'color':color}">{{ desc }}</p>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {

    }
  },
  props: {
    desc: String,
    color: String
  },
  components: {

  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    .page {
        width: 100%;
        height: 100%;
        min-height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
        .content {
            margin: 0 auto;
            top: 460%;
            position: absolute;
            transform: translateY(-60%);
        }
        p {
            font-size: 20px;
        }
    }
</style>
