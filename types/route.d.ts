interface VaRouteMeta {
  // 路由标题
  title: string
  // 是否显示在菜单中(默认值：false)
  hidden?: boolean
  // 是否在菜单中隐藏父级(默认值：false)
  levelHidden?: boolean
  // 当前路由是否在打开标签时可关闭
  noClosable?: boolean
  // 在新窗口中打开
  target?: '_blank' | false
}

interface VaRouteRecord extends Omit<RouteRecordRaw, 'meta'> {
  path: string
  // name 首字母必须大写
  name: Capitalize<string> | '403' | '404'
  meta: VaRouteMeta
  fullPath?: string
  component?: Component | any
  components?: Component | string
  children?: VaRouteRecord[]
  redirect?: string | (() => string)
}
