<template>
  <div id="app">
    <div class="nav-btn btn-left">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div ref="btnTags" class="btn-tags" >
      <div ref="carouselContent" class="scroll-tags" :style="{transform:'translateX('+transLateX+'px)'}">
      <transition-group name="list" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOut">
        <Tag class="tags"
          type="dot"
          v-for="(item, index) in list"
          :color="isCurrentPage(item) ? 'primary' : 'default'"
          :key="index"
          :closable="index !== 0"
          @on-close="close(index)"
          @click.native="handleClick(index)">{{item.name}}
          <slot></slot>
        </Tag>
      </transition-group>
      </div>
    </div>
    <div class="nav-btn btn-right">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div class="btn-close">
      <Dropdown>
        <a href="javascript:void(0)">
          <Icon :size="25" type="ios-close-circle-outline"/>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="close(-1)">关闭全部</DropdownItem>
          <DropdownItem @click.native="close(-2)">关闭其它</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
@Component({
  name: 'tags-nav'
})

export default class TagsNav extends Vue {
  @Prop()
  list!: [any]

  @Prop({ type: Number })
  currentIndex!: number

  @Prop({ type: Number })
  transLateX!: number

  // 关闭，点击menu，点击tag,从浏览器打开一个页面
  // handleClose (index: number) {
  //   const item = this.list[this.currentIndex]
  //   const lastIndex = this.currentIndex
  //   this.list.splice(index, 1)
  //   if (index > ((this.list.length - 1) / 2)) {
  //     this.handleScroll(-240)
  //   } else {
  //     this.handleScroll(240)
  //   }

  //   if (lastIndex !== this.currentIndex) {
  //     this.$router.push(this.list[this.currentIndex].path)
  //   }
  //   if (index === this.currentIndex) {
  //     if (this.list.length > 1) {
  //       this.handleClick(index - 1)
  //       // this.currentIndex
  //     } else {
  //       this.handleClick(0)
  //       // this.currentIndex = 0
  //     }
  //   }
  // }

  // 点击tag打开页面
  @Emit('selectTags')
  handleClick (index: number) {
    // console.log('点击 ' + index)
    // console.log('当前 ' + this.currentIndex)
    // const lastIndex = this.currentIndex
    // this.currentIndex = index

    // if (lastIndex !== this.currentIndex) {
    //   this.$router.push(this.list[this.currentIndex].path)
    // }
    return index
  }

  // 滑动tag
  @Emit('tagScroll')
  handleScroll (num: number): number {
    const carousel: any = this.$refs.carouselContent
    const scrollWidth = carousel.scrollWidth
    const clientWidth = carousel.clientWidth

    if (scrollWidth > clientWidth) {
      if (num === 240) {
        if (this.transLateX + 240 > 0) {
          return 0
        } else {
          return this.transLateX + 240
        }
      } else {
        if ((this.transLateX - 240) < (scrollWidth - clientWidth) * -1) {
          return (scrollWidth - clientWidth) * -1
        } else {
          return this.transLateX - 240
        }
      }
    } else {
      return 0
    }
  }

  // 父页面调用该访求
  scrollNum (num: number) {
    const len = Math.abs(num)
    for (let i = 0; i <= len; i++) {
      if (num > 0) {
        this.handleScroll(-240)
      } else {
        this.handleScroll(240)
      }
    }
  }

  isCurrentPage (item: any) {
    return this.list[this.currentIndex] === item
  }

  @Emit('close')
  close (flag: number) {
    if (flag >= 0) {
      if (flag > ((this.list.length - 1) / 2)) {
        this.handleScroll(-240)
      } else {
        this.handleScroll(240)
      }
    }
    return flag
  }

  // @Emit('closeAll')
  // closeAll () {
  //   const lastIndex = this.currentIndex
  //   console.log('关闭全部打开tags')
  //   this.list.splice(1, this.list.length - 1)
  //   this.currentIndex = 0
  //   this.transLateX = 0

  //   if (lastIndex !== this.currentIndex) {
  //     this.$router.push(this.list[this.currentIndex].path)
  //   }
  // }

  // @Emit('closeOther')
  // closeOther () {
  //   if (this.currentIndex === 0) {
  //     this.list.splice(1, this.list.length - 1)
  //     this.currentIndex = 0
  //   } else if (this.currentIndex === this.list.length - 1) {
  //     this.list.splice(1, this.list.length - 2)
  //     this.currentIndex = 1
  //   } else {
  //     this.list.splice(this.currentIndex + 1, this.list.length - 1)
  //     this.list.splice(1, this.currentIndex - 1)
  //     this.currentIndex = 1
  //   }
  //   this.$router.push(this.list[this.currentIndex].path)
  // }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './tags-nav.less';
</style>
