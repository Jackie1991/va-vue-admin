import { defineConfig, presetWind4, presetAttributify, presetIcons, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        // framework7 icons 使用：class上 i-f7-*
        f7: () => import('@iconify-json/f7/icons.json').then((i) => i.default),
      },
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        secondary: '#36CFC9',
        accent: '#722ED1',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  shortcuts: {
    'flex-center': 'flex flex-items-center flex-justify-center',
    'flex-x-center': 'flex flex-items-center',
    'flex-y-center': 'flex flex-justify-center',
    'flex-column': 'flex flex-col',
  },
  rules: [
    [
      /^pos-(absolute|fixed)-(\w+)$/,
      ([, position, value]) => {
        const positions = {
          'x-center': { position, left: '50%', transform: 'translateX(-50%)' },
          'y-center': { position, top: '50%', transform: 'translateY(-50%)' },
          center: { position, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        }
        return positions[value] || ''
      },
    ],
  ],
})
