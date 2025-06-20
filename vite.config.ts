import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 自定义组件解析器
const customResolver = (name: string) => {
  if (/^Va[A-Z]/.test(name)) {
    return {
      name,
      from: `@/components/${name}/${name}.vue`,
    }
  }
  return null
}

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 根据当前模式加载环境变量
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      vueDevTools(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            dayjs: [['default', 'dayjs']],
          },
          '@vueuse/core',
        ],
        resolvers: [ElementPlusResolver()],
        dts: 'types/auto-imports.d.ts',
      }),
      Components({
        dirs: ['src/components'],
        resolvers: [
          customResolver,
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: 'types/components.d.ts',
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    build: {
      outDir: env.VITE_OUTPUT_DIR,
      assetsDir: 'static',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
})
