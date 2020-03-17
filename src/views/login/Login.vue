<template>
  <div class="login">
    <div class="content">
      <p>登录 </p>
      <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" placeholder="输入帐户" style="width: auto" v-model="formInline.user">
            <Icon type="ios-person-outline" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" placeholder="输入密码" style="width: auto" v-model="formInline.password">
            <Icon type="ios-lock-outline" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入帐户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 登录验证
          this.$Message.success('登录成功')
        } else {
          this.$Message.error('请求输入帐户或密码！')
        }
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .login {
    width: 100%;
    height: 100%;
    min-height: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    margin: 0 auto;
    top: 50%;
    position: absolute;
    transform: translateY(-60%);
  }
</style>
