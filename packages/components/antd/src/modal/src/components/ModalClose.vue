<template>
  <div :class="getClass">
    <template v-if="canFullscreen">
      <Tooltip title="还原" placement="bottom" v-if="fullScreen">
        <FullscreenExitOutlined role="full" @click="handleFullScreen" />
      </Tooltip>
      <Tooltip title="最大化" placement="bottom" v-else>
        <FullscreenOutlined role="close" @click="handleFullScreen" />
      </Tooltip>
    </template>
    <Tooltip title="关闭" placement="bottom">
      <CloseOutlined @click="handleCancel" />
    </Tooltip>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue'
  import { Tooltip } from 'ant-design-vue'

  export default defineComponent({
    name: 'ModalClose',
    components: { Tooltip, FullscreenExitOutlined, FullscreenOutlined, CloseOutlined },
    props: {
      canFullscreen: { type: Boolean, default: true },
      fullScreen: { type: Boolean },
    },
    emits: ['cancel', 'fullscreen'],
    setup(props, { emit }) {
      const prefixCls = 'basic-modal-close'
      const getClass = computed(() => {
        return [
          prefixCls,
          `${prefixCls}--custom`,
          {
            [`${prefixCls}--can-full`]: props.canFullscreen,
          },
        ]
      })

      function handleCancel(e: Event) {
        emit('cancel', e)
      }

      function handleFullScreen(e: Event) {
        e?.stopPropagation()
        e?.preventDefault()
        emit('fullscreen')
      }

      return {
        getClass,
        prefixCls,
        handleCancel,
        handleFullScreen,
      }
    },
  })
</script>
<style lang="less">
  .basic-modal-close {
    display: flex;
    height: 95%;
    align-items: center;

    > span {
      margin-left: 48px;
      font-size: 16px;
    }

    &--can-full {
      > span {
        margin-left: 12px;
      }
    }

    &:not(&--can-full) {
      > span:nth-child(1) {
        &:hover {
          font-weight: 700;
        }
      }
    }

    & span:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 10px;

      &:hover {
        color: var(--primary-color);
      }
    }

    & span:last-child {
      &:hover {
        color: var(--error-color);
      }
    }
  }
</style>
