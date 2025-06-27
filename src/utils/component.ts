import { split } from 'lodash-es'

/**
 * @name 获取指定目录下所有组件
 */
export const getComponents = (imports: { [key: string]: ComponentType }) => {
  const Components: Record<string, Component> = {}
  Object.getOwnPropertyNames(imports).forEach((key: any) => {
    const fileName = split(key, '/').at(-1)
    if (!fileName) return
    const name = fileName.replace(/\.vue/g, '')
    Components[name] = imports[key].default
  })
  return Components
}
