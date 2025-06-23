import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginTypescript from '@typescript-eslint/eslint-plugin'
import pluginImport from 'eslint-plugin-import' // Import 规则

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      // 强制在Vue模板中使用kebab-case组件名称
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          ignores: [], // 可以添加需要忽略的组件名
          registeredComponentsOnly: false, // 检查所有组件，包括未注册的
        },
      ],
      // 强制自定义事件名称使用kebab-case
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/attribute-hyphenation': ['error', 'always'],
      'prettier/prettier': 'error', // 添加 Prettier 规则
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index', '403', '404'], // 可选：忽略特定组件名
        },
      ],

      // 确保 import 语句在文件最前面
      'import/first': 'error',
      // import 语句后面增加空行
      'import/newline-after-import': ['error', { count: 1 }],
      'import/named': 'error', // 确保命名的导入与远程文件中的命名的导出相对应。
      'import/namespace': 'error', // 确保导入的命名空间包含已取消引用的属性，因为它们已被取消引用。
      'import/no-duplicates': 'error', // 禁止在多个位置重复导入同一模块。
    },
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    plugins: {
      '@typescript-eslint': pluginTypescript, // 注册 typescript-eslint 插件
      prettier: pluginPrettier,
      import: pluginImport,
    },
    // 引入 @typescript-eslint/eslint-plugin 的推荐规则集
    rules: {
      ...pluginTypescript.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
)
