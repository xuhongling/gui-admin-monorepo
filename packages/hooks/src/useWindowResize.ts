import { tryOnUnmounted, tryOnMounted } from '@vueuse/core'
import { useDebounceFn } from '@vueuse/core'

interface WindowSizeOptions {
  once?: boolean
  immediate?: boolean
  listenerOptions?: AddEventListenerOptions | boolean
}

export const useWindowResize = <T>(
  fn: AnyFunction<T>,
  wait = 150,
  options?: WindowSizeOptions,
) => {
  let handler = () => {
    fn()
  }
  const handleSize = useDebounceFn(handler, wait)
  handler = handleSize

  const start = () => {
    if (options && options.immediate) {
      handler()
    }
    window.addEventListener('resize', handler)
  }

  const stop = () => {
    window.removeEventListener('resize', handler)
  }

  tryOnMounted(() => {
    start()
  })

  tryOnUnmounted(() => {
    stop()
  })
  return [start, stop]
}
