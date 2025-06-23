import type { App, DirectiveBinding } from 'vue'
import { throttle } from 'lodash-es'

export default {
  install(app: App<Element>) {
    /**
     * @description 获取焦点自定义指令v-focus
     */
    app.directive('focus', {
      mounted(el) {
        if (el.querySelector('input')) el.querySelector('input').focus()
        if (el.querySelector('textarea')) el.querySelector('textarea').focus()
      },
    })
    /**
     * @description 阻止鼠标右键
     */
    app.directive('stop-contextmenu', {
      mounted(el) {
        el.__handleContextMenu = (e: any) => {
          e.preventDefault()
          e.stopPropagation()
        }

        el.addEventListener('contextmenu', el.__handleContextMenu)
      },
      beforeUnmount(el) {
        if (el.__handleContextMenu) {
          el.removeEventListener('contextmenu', el.__handleContextMenu)
          delete el.__handleContextMenu
        }
      },
    })
    /**
     * @description 鼠标滚轮
     */
    app.directive('not-mousewheel', {
      mounted(el) {
        const mouseScroll = (e: any) => {
          if (e.preventDefault) {
            e.preventDefault()
            e.stopPropagation()
          } else {
            e.cancelBubble = true
            e.returnValue = false
          }
          return false
        }

        el.addEventListener('mousewheel', mouseScroll, { passive: false })
        el.addEventListener('DOMMouseScroll', mouseScroll, { passive: false })
        el.mouseScroll = mouseScroll
      },
      beforeUnmount(el) {
        if (el.mouseScroll) {
          el.removeEventListener('mousewheel', el.mouseScroll)
          el.removeEventListener('DOMMouseScroll', el.mouseScroll)
          delete el.mouseScroll
        }
      },
    })
    /**
     * @description select组件触底v-select-loadmore，需设置不挂载到body
     */
    app.directive('scroll-loadmore', {
      beforeMount(el, binding: DirectiveBinding) {
        const SELECTWRAP: any = binding.value?.el ? el.querySelector(binding.value?.el) : el
        const loadmore = throttle(() => {
          if (SELECTWRAP.scrollHeight - SELECTWRAP.scrollTop <= SELECTWRAP.clientHeight + 50) {
            if (typeof binding.value === 'function') {
              binding.value()
            } else if (binding.value.callback) {
              binding.value.callback()
            }
          }
        }, 500)
        if (SELECTWRAP) {
          el.selectLoadMoreDom = SELECTWRAP
          el.selectLoadMoreFn = loadmore
          SELECTWRAP.addEventListener('scroll', loadmore, { passive: true })
        }
      },
      beforeUnmount(el) {
        if (el.selectLoadMoreFn) {
          el.selectLoadMoreDom.removeEventListener('scroll', el.selectLoadMoreFn)
          delete el.selectLoadMoreDom
          delete el.selectLoadMoreFn
        }
      },
    })
  },
}
