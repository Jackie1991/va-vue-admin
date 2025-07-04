<template>
  <div class="captcha-view">
    <canvas ref="captchaRef" class="captcha-canvas" :height="height" :width="width" @click="draw" />
  </div>
</template>

<script lang="ts" setup>
import { random } from '@/utils'

interface CaptchaProps {
  modelValue?: string
  width?: number
  height?: number
}
const props = withDefaults(defineProps<CaptchaProps>(), {
  modelValue: '',
  width: 120,
  height: 40,
})

interface Emits {
  (e: 'update:modelValue', value: any): void
}
const emits = defineEmits<Emits>()

const captchaRef = ref<any>(null)
const pool: any = 'ABCDEFGHJKLMNPQRSTUVWXYZ1234567890'

const randomColor = (m: number, n: number) => {
  const r = random(m, n)
  const g = random(m, n)
  const b = random(m, n)
  return `rgb(${r},${g},${b})`
}

const draw = () => {
  const ctx = captchaRef.value.getContext('2d')
  ctx.fillStyle = randomColor(180, 240)
  ctx.fillRect(0, 0, props.width, props.height)
  let captchaCode = ''
  for (let i = 0; i < 4; i++) {
    const text = pool[random(0, pool.length)]
    const fontSize = random(18, props.height)
    const deg = random(-45, 45)
    ctx.font = `${fontSize}px SimHei`
    ctx.textBaseline = 'top'
    ctx.fillStyle = randomColor(80, 180)
    ctx.save()
    ctx.translate(30 * i + 15, 15)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(text, -15 + 5, -15)
    ctx.restore()
    captchaCode += text
  }
  emits('update:modelValue', captchaCode)
  // 干扰线
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.moveTo(random(0, props.width), random(0, props.height))
    ctx.lineTo(random(0, props.width), random(0, props.height))
    ctx.strokeStyle = randomColor(180, 230)
    ctx.closePath()
    ctx.stroke()
  }
  // 干扰点
  for (let i = 0; i < 20; i++) {
    ctx.beginPath()
    ctx.arc(random(0, props.width), random(0, props.height), 1, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = randomColor(150, 200)
    ctx.fill()
  }
}

onMounted(() => {
  draw()
})
</script>

<style lang="scss" scoped>
.captcha-view {
  border-radius: 0 4px 4px 0;
  overflow: hidden;

  .captcha-canvas {
    display: block;
  }
}
</style>
