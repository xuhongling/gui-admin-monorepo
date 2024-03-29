import { Modal } from 'ant-design-vue'
import { defineComponent, toRefs, unref } from 'vue'
import { useAttrs } from '@gui-pkg/hooks'
import { extendSlots } from '@gui-pkg/utils'
import { basicProps } from '../props'
import { useModalDragMove } from '../hooks/useModalDrag'

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots, emit }) {
    const { visible, draggable, destroyOnClose } = toRefs(props)
    const attrs = useAttrs()
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable,
    })

    const onCancel = (e: Event) => {
      emit('cancel', e)
    }

    return () => {
      const propsData = { ...unref(attrs), ...props, onCancel } as Recordable
      return <Modal {...propsData}>{extendSlots(slots)}</Modal>
    }
  },
})
