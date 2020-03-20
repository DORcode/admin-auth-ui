<template>
  <div class="home">
    <Layout class="layout-page">
      <Sider ref="side1" class="layout-sider" :style="{overflow: 'auto'}" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class="layout-logo"></div>
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </template>
            <MenuItem name="1-1">Option 1</MenuItem>
            <MenuItem name="1-2">Option 2</MenuItem>
            <MenuItem name="1-3">Option 3</MenuItem>
            <MenuItem name="1-4">Option 4</MenuItem>
            <MenuItem name="1-5">Option 5</MenuItem>
            <MenuItem name="1-6">Option 6</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </template>
            <MenuItem name="2-1">Option 1</MenuItem>
            <MenuItem name="2-2">Option 2</MenuItem>
            <MenuItem name="2-3">Option 3</MenuItem>
            <MenuItem name="2-4">Option 4</MenuItem>
            <MenuItem name="2-5">Option 5</MenuItem>
            <MenuItem name="2-6">Option 6</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout class="layout-main">
        <Header class="layout-header">
          <Icon class="icon-collapse" v-show="true" @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
          <div class="header-left">
            <bread-nav class="current-bread" :list="breadlist"></bread-nav>
          </div>
          <div class="header-right">
            <Icon type="ios-expand" :size="25" @click="fullScreen" />
            <Dropdown class="language">
              <a href="javascript:void(0)" style="font-size: 20px">
                语言
                <Icon :size="25" type="md-arrow-dropdown"/>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="simplifiedChinese()">中文简体</DropdownItem>
                <DropdownItem @click.native="traditionalChinese()">中文繁体</DropdownItem>
                <DropdownItem @click.native="english()">English</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown class="manage-buttons">
              <a href="javascript:void(0)" style="font-size: 20px">
                我
                <Icon :size="25" type="md-arrow-dropdown"/>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="logout()">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content class="main-content">
          <Layout class="main-layout">
            <div class="open-nav">
              <tags-nav :list="openedNavList"></tags-nav>
            </div>
            <Content class="content">
              显示主界面
              <keep-alive>
                <router-view/>
              </keep-alive>
            </Content>
          </Layout>
        </Content>
        <Footer class="layout-footer">后台管理</Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, PropSync, Ref, Emit, Inject, Model, Provide } from 'vue-property-decorator'
import TagsNav from '@/components/tags-nav/tags-nav.vue'
import BreadNav from '@/components/bread-nav/bread-nav.vue'
import screenfull from 'screenfull'

declare module 'vue/types/vue' {
    interface Vue {
        [key: string]: any;
    }
}

@Component({
  components: {
    TagsNav,
    BreadNav
  }
})
export default class Home extends Vue {
  isCollapsed = false

  isFullScreen = false

  openedNavList = [
    {
      name: '标签1'
    }, {
      name: '标签2'
    }, {
      name: '标签3'
    },
    {
      name: '标签4'
    }, {
      name: '标签5'
    }, {
      name: '标签6'
    },
    {
      name: '标签7'
    }, {
      name: '标签8'
    }, {
      name: '标签9'
    },
    {
      name: '标签10'
    }, {
      name: '标签11'
    }, {
      name: '标签1标签1标签12'
    },
    {
      name: '标签13'
    }, {
      name: '标签14'
    }, {
      name: '标签15'
    },
    {
      name: '标签16'
    }, {
      name: '标签17'
    }, {
      name: '标签18'
    }]

  breadlist = [
    { name: 'Home', icon: 'ios-home-outline' },
    { name: 'Components', icon: 'logo-buffer' },
    { name: 'Layout', icon: '' }
  ]

  collapsedSider () {
    const side1: any = this.$refs.side1
    side1.toggleCollapse()
  }

  handleTabRemove (name: any) {
    this['tab' + name] = false
  }

  fullScreen () {
    if (screenfull.isEnabled) {
      screenfull.request()
      this.isFullScreen = !this.isFullScreen
    }
  }

  simplifiedChinese () {
    console.log('中文简体')
  }

  traditionalChinese () {
    console.log('中文繁体')
  }

  english () {
    console.log('英语')
  }

  logout () {
    console.log('退出登录')
  }

  get menuitemClasses () {
    return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
  }

  get rotateIcon () {
    return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
  }

  mounted () {
    this.$nextTick(() => {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) {
          if (this.isFullScreen) {
            this.$Message.success('Esc')
            this.isFullScreen = !this.isFullScreen
          }
        }
      })
    })
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './home.less';
</style>
