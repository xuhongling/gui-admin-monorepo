<template>
  <BasicTitle v-if="!isDetail" class="basic-drawer-header">
    <slot name="title"></slot>
    {{ !$slots.title ? title : '' }}
  </BasicTitle>

  <div class="basic-drawer-header basic-drawer-header--detail" v-else>
    <span class="basic-drawer-header__twrap">
      <span @click="handleClose" v-if="showDetailBack">
        <ArrowLeftOutlined class="basic-drawer-header__back" />
      </span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span class="basic-drawer-header__toolbar">
      <slot name="titleToolbar"></slot>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTitle } from '../../../basic'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'BasicDrawerHeader',
  components: { BasicTitle, ArrowLeftOutlined },
  props: {
    isDetail: { type: Boolean },
    showDetailBack: { type: Boolean },
    title: { type: String },
  },
  emits: ['close'],
  setup(_, { emit }) {

    function handleClose() {
      emit('close')
    }

    return { handleClose }
  },
})
</script>

<style lang="less">
@prefix-cls: ~'basic-drawer-header';
@footer-height: 60px;
.@{prefix-cls} {
  display: flex;
  height: 100%;
  align-items: center;

  &__back {
    padding: 0 12px;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
  }

  &__twrap {
    flex: 1;
  }

  &__toolbar {
    padding-right: 50px;
  }
}
</style>
