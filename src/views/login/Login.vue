<template>
  <div class="login">
    <div class="content">
      <div class="title">
        <p>登录 </p>
      </div>
      <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="username">
          <Input type="text" placeholder="输入帐户" style="width: auto" v-model="formInline.username">
            <Icon type="ios-person-outline" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" placeholder="输入密码" style="width: auto" v-model="formInline.password">
            <Icon type="ios-lock-outline" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem class="submit-form">
          <Button class="submit-btn" type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Api from '@/api/api'
import sessionStore from '@/util/sessionstore'
import getMenus from '@/util/permission'

export default {
  components: {
  },
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
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
          Api.login(this.formInline).then(
            res => {
              console.log(res)
              console.log(res.data.tokenExpireTime)
              if (res.data && res.success) {
                sessionStore.set('token', res.data.token)
                sessionStore.set('tokenExpireTime', res.data.tokenExpireTime)
                getMenus()
              } else {
              }
            }
          )
        } else {
          this.$Message.error('请求输入帐户或密码！')
        }
      })
    },
    isLogin () {
      if (Number(sessionStore.get('tokenExpireTime')) > new Date().getTime()) {
        this.$router.push('/')
      }
    }
  },
  beforeCreate () {
    console.log(Number(sessionStore.get('token')))
    console.log(Number(sessionStore.get('tokenExpireTime')))
    if (Number(sessionStore.get('tokenExpireTime')) > new Date().getTime()) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .title {
    text-align: center;
    margin-bottom: 10px;
  }

  .title p {
    font-size: 20px;
    color: blue;
  }

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

  .submit-form {
    text-align: center;
  }
</style>
