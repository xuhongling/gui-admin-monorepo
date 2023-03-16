<template>
  <Drawer class="basic-drawer" @close="onClose" v-bind="getBindValues">
    <template #title v-if="!$slots.title">
      <DrawerHeader
        :title="getMergeProps.title"
        :isDetail="isDetail"
        :showDetailBack="showDetailBack"
        @close="onClose"
      >
        <template #titleToolbar>
          <slot name="titleToolbar"></slot>
        </template>
      </DrawerHeader>
    </template>
    <template v-else #title>
      <slot name="title"></slot>
    </template>

    <ScrollContainer
      :style="getScrollContentStyle"
      :loading-tip="loadingText || '加载中...'"
    >
      <slot></slot>
    </ScrollContainer>

    <DrawerFooter
      v-bind="getProps"
      @close="onClose"
      @ok="handleOk"
      :height="getFooterHeight"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </DrawerFooter>
  </Drawer>
</template>
<script lang="ts">
  import type { DrawerInstance, DrawerProps } from './typing'
  import type { CSSProperties } from 'vue'

  import { defineComponent, ref, computed, watch, unref, nextTick, toRaw, getCurrentInstance } from 'vue'
  import { Drawer } from 'ant-design-vue'
  import { basicProps } from './props'
  import DrawerFooter from './components/DrawerFooter.vue'
  import DrawerHeader from './components/DrawerHeader.vue'
  import { useAttrs } from '@gui-pkg/hooks'
  import { ScrollContainer } from '@gui-pkg/components'
  import { isFunction, isNumber, deepMerge } from '@gui-pkg/utils'

  export default defineComponent({
    components: { Drawer, DrawerFooter, DrawerHeader, ScrollContainer },
    inheritAttrs: false,
    props: basicProps,
    emits: ['visible-change', 'ok', 'close', 'register'],
    setup(props, { emit }) {
      const visibleRef = ref(false)
      const attrs = useAttrs()
      const propsRef = ref<Partial<Nullable<DrawerProps>>>(null)

      const drawerInstance: DrawerInstance = {
        setDrawerProps: setDrawerProps,
        emitVisible: undefined,
      }

      const instance = getCurrentInstance()

      instance && emit('register', drawerInstance, instance.uid)

      const getMergeProps = computed((): DrawerProps => {
        return deepMerge(toRaw(props), unref(propsRef))
      })

      const getProps = computed((): DrawerProps => {
        const opt = {
          placement: 'right',
          ...unref(attrs),
          ...unref(getMergeProps),
          visible: unref(visibleRef),
        }
        opt.title = undefined
        const { isDetail, width, wrapClassName, getContainer } = opt
        if (isDetail) {
          if (!width) {
            opt.width = '100%'
          }
          const detailCls = 'basic-drawer__detail'
          opt.class = wrapClassName ? `${wrapClassName} ${detailCls}` : detailCls

          if (!getContainer) {
            // TODO type error?
            opt.getContainer = `.gui-layout-content` as any
          }
        }
        return opt as DrawerProps
      })

      const getBindValues = computed((): DrawerProps => {
        return {
          ...attrs,
          ...unref(getProps),
        }
      })

      // Custom implementation of the bottom button,
      const getFooterHeight = computed(() => {
        const { footerHeight, showFooter } = unref(getProps)
        if (showFooter && footerHeight) {
          return isNumber(footerHeight)
            ? `${footerHeight}px`
            : `${footerHeight.replace('px', '')}px`
        }
        return `0px`
      })

      const getScrollContentStyle = computed((): CSSProperties => {
        const footerHeight = unref(getFooterHeight)
        return {
          position: 'relative',
          height: `calc(100% - ${footerHeight})`,
        }
      })

      const getLoading = computed(() => {
        return !!unref(getProps)?.loading
      })

      watch(
        () => props.visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = newVal
        },
        { deep: true },
      )

      watch(
        () => visibleRef.value,
        (visible) => {
          nextTick(() => {
            emit('visible-change', visible)
            instance && drawerInstance.emitVisible?.(visible, instance.uid)
          })
        },
      )

      // Cancel event
      async function onClose(e: Recordable) {
        const { closeFunc } = unref(getProps)
        emit('close', e)
        if (closeFunc && isFunction(closeFunc)) {
          const res = await closeFunc()
          visibleRef.value = !res
          return
        }
        visibleRef.value = false
      }

      function setDrawerProps(props: Partial<DrawerProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)

        if (Reflect.has(props, 'visible')) {
          visibleRef.value = !!props.visible
        }
      }

      function handleOk() {
        emit('ok')
      }

      return {
        onClose,
        getMergeProps: getMergeProps as any,
        getScrollContentStyle,
        getProps: getProps as any,
        getLoading,
        getBindValues,
        getFooterHeight,
        handleOk,
      }
    },
  })
</script>
<style lang="less">
@header-height: 60px;
@detail-header-height: 40px;
@prefix-cls: ~'basic-drawer';
@prefix-cls-detail: ~'basic-drawer__detail';

.@{prefix-cls} {
  .ant-drawer-wrapper-body {
    overflow: hidden;
  }

  .ant-drawer-close {
    font-size: 18px;
    &:hover {
      color: var(--error-color);
    }
  }

  .ant-drawer-body {
    height: calc(100% - @header-height);
    padding: 0;
    background-color: var(--component-background);
  }

  .scrollbar__wrapper {
    padding: 16px !important;
    margin-bottom: 0!important;
  }
}

.@{prefix-cls-detail} {
  position: absolute;

  .ant-drawer-header {
    width: 100%;
    height: @detail-header-height;
    padding: 0;
    border-top: 1px solid var(--border-color-base);
    box-sizing: border-box;
  }

  .ant-drawer-title {
    height: 100%;
  }

  .ant-drawer-close {
    height: @detail-header-height;
    line-height: @detail-header-height;
  }

  .scrollbar__wrapper {
    padding: 0 !important;
  }

  .ant-drawer-body {
    height: calc(100% - @detail-header-height);
  }
}
</style>
