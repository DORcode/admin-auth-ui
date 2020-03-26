<template>
  <div class="home">
    <Layout class="layout-page">
      <Sider ref="side1" class="layout-sider" :style="{overflow: 'auto'}" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class="layout-logo"></div>
        <Menu ref="leftMenu" class="menu" :accordion="true" :active-name="activeName" theme="dark" width="auto"
          :class="menuitemClasses" :open-names="[openName]">
          <Submenu v-for="(item, index) in menuList" @click.native="openPage(item, index)" :key="index" :name="index">
            <template slot="title">
              <Icon :type="isCustomIcon(item) ? item.icon : 'ios-navigate'"></Icon>
              <span>{{ item.name }}</span>
            </template>
            <MenuItem v-show="item.subMenus && item.subMenus.length" v-for="(sub, subidx) in item.subMenus"
              :key="subidx" :name="index + '-' + subidx" @click.native="openPage(sub, subidx)">
              <Icon type="ios-navigate"></Icon>
              <span>{{ sub.name }}</span>
            </MenuItem>
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
                <Avatar icon="ios-person" size="large" />
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
              <tags-nav ref="tagsNav" :currentIndex="currentIndex" :transLateX="transLateX" @selectTags="selectTags" @close="close" @tagScroll="tagScroll" :list="openedNavList"></tags-nav>
            </div>
            <Content class="content">
              <keep-alive>
                显示主界面
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
import localStore from '../../util/localstore'
import sessionStore from '../../util/sessionstore'

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

  activeName = ''
  openName = 0

  currentIndex = 0
  transLateX = 0

  menuList: any = localStore.get('menus') || [
    {
      name: '管理',
      path: '',
      icon: 'ios-home',
      type: 1,
      subMenus: [
        {
          name: '系统管理',
          path: '/sys/manage/system',
          type: 2
        },
        {
          name: '用户管理',
          path: '/sys/manage/user',
          type: 3
        }
      ]
    },
    {
      name: '股票数据',
      path: '',
      icon: 'ios-home',
      type: 1,
      subMenus: [
        {
          name: '角色管理',
          path: '/sys/manage/role',
          type: 2
        },
        {
          name: '权限管理',
          path: '/sys/manage/permission',
          type: 3
        }
      ]
    }
  ]

  openedNavList = [
    {
      name: '首页',
      path: '/',
      icon: 'ios-home'
    }]

  breadlist = [
    { name: '首页', path: '/', icon: 'ios-home' }
  ]

  isCustomIcon (item: any) {
    if (item.icon) {
      return true
    } else {
      return false
    }
  }

  isMenuShow (item: any) {
    if (item.type === 1 && item.type === 2) {
      return true
    } else {
      return false
    }
  }
  // 剩下滚动， 使用父去调用子方法，来滚动，根据之间的距离，来调用，滚动的距离即可

  // 获取树形多级，组合为active-name,用于高量menu
  getActiveName (item: any) {
    this.breadlist.splice(1, this.breadlist.length)
    let name = ''
    for (let i = 0; i < this.menuList.length; i++) {
      const sub = this.menuList[i].subMenus || []
      for (let j = 0; j < sub.length; j++) {
        if (sub[j].path === item.path) {
          this.openName = i
          this.breadlist.push(this.menuList[i])
          this.breadlist.push(sub[j])
          name = i + '-' + j
        }
      }
    }
    this.activeName = name
    return name
  }

  collapsedSider () {
    const side1: any = this.$refs.side1
    side1.toggleCollapse()
  }

  isOpened (item: any): boolean {
    let flag = false
    this.openedNavList.forEach(
      (val) => {
        if (item.path === val.path) {
          flag = true
        }
      }
    )
    return flag
  }

  openPage (item: any) {
    const lastIndex = this.currentIndex
    // 如果已经打开，则需要滚动到打开这个tag
    if (this.isOpened(item)) {
      // 当前点击的不是已经打开的
      if (item.path !== this.openedNavList[this.currentIndex]) {
        this.currentIndex = this.openedNavList.indexOf(item)
      }
    } else {
      // 未打开过，跳转
      this.$router.push(item.path)
      this.openedNavList.push(item)
      this.currentIndex = this.openedNavList.length - 1
    }
    let num = 0
    if (this.currentIndex > lastIndex) {
      num = this.currentIndex - lastIndex + 1
    } else {
      num = this.currentIndex - (lastIndex)
    }
    this.getActiveName(item)
    // scroll tags
    const tagsNav: any = this.$refs.tagsNav
    tagsNav.scrollNum(num)
  }

  tagScroll (num: number) {
    this.transLateX = num
  }

  selectTags (index: number) {
    // this.currentIndex = index
    this.openPage(this.openedNavList[index])
    // 当tag-nav 选择了后，从menu列表中得到activename的名称
  }

  close (flag: number) {
    if (flag === -1) {
      this.closeAll()
    } else if (flag === -2) {
      this.closeOther()
    } else {
      this.closeOne(flag)
    }
  }

  closeOne (index: number) {
    const lastIndex = this.currentIndex
    this.openedNavList.splice(index, 1)
    if (index === this.currentIndex) {
      if (this.openedNavList.length > 1) {
        this.currentIndex = index - 1
      } else {
        this.currentIndex = 0
      }
      this.getActiveName(this.openedNavList[this.currentIndex])
    }

    if (lastIndex !== this.currentIndex) {
      this.$router.push(this.openedNavList[this.currentIndex].path)
    }
  }

  closeAll () {
    const lastIndex = this.currentIndex
    console.log('关闭全部打开tags')
    this.openedNavList.splice(1, this.openedNavList.length - 1)
    this.currentIndex = 0
    this.transLateX = 0

    if (lastIndex !== this.currentIndex) {
      this.$router.push(this.openedNavList[this.currentIndex].path)
    }
    this.getActiveName(this.openedNavList[this.currentIndex])
  }

  closeOther () {
    const lastIndex = this.currentIndex
    if (this.currentIndex === 0) {
      this.openedNavList.splice(1, this.openedNavList.length - 1)
      this.currentIndex = 0
    } else if (this.currentIndex === this.openedNavList.length - 1) {
      this.openedNavList.splice(1, this.openedNavList.length - 2)
      this.currentIndex = 1
    } else {
      this.openedNavList.splice(this.currentIndex + 1, this.openedNavList.length - 1)
      this.openedNavList.splice(1, this.currentIndex - 1)
      this.currentIndex = 1
    }
    this.getActiveName(this.openedNavList[this.currentIndex])
    if (lastIndex !== this.currentIndex) {
      this.$router.push(this.openedNavList[this.currentIndex].path)
    }
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
    this.$router.push({ path: '/login' })
    localStore.remove('menus')
    sessionStore.remove('token')
    sessionStore.remove('tokenExpireTime')
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
