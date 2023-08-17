<template>
  <div :class="getClass" ref="wrapperRef">
    <PageHeader
      :ghost="ghost"
      :title="title"
      v-bind="omit($attrs, 'class')"
      ref="headerRef"
      v-if="getShowHeader"
    >
      <template #default>
        <template v-if="content">
          {{ content }}
        </template>
        <slot name="headerContent" v-else></slot>
      </template>
      <template #[item]="data" v-for="item in getHeaderSlots">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </PageHeader>

    <div class="overflow-hidden" :class="getContentClass" :style="getContentStyle" ref="contentRef">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { CSSProperties, PropType, computed, ref, unref, useAttrs, useSlots } from 'vue';
  import { PageHeader } from 'ant-design-vue';
  import { omit, propTypes } from '@gui-pkg/utils';
  import { useContentHeight } from '@gui-pkg/hooks';

  defineOptions({
    name: 'PageWrapper',
    inheritAttrs: false,
  });

  const props = defineProps({
    title: propTypes.string,
    dense: propTypes.bool,
    ghost: propTypes.bool,
    content: propTypes.string,
    contentStyle: {
      type: Object as PropType<CSSProperties>,
    },
    contentBackground: propTypes.bool,
    contentFullHeight: propTypes.bool.def(false),
    contentClass: propTypes.string,
    fixedHeight: propTypes.bool,
    upwardSpace: propTypes.oneOfType([propTypes.number, propTypes.string]).def(0),
  });

  const attrs = useAttrs();
  const slots = useSlots();

  const wrapperRef = ref(null);
  const headerRef = ref(null);
  const contentRef = ref(null);
  const footerRef = ref(null);
  const offsetHeightRef = ref(-16);

  const getIsContentFullHeight = computed(() => {
    return props.contentFullHeight;
  });

  const getUpwardSpace = computed(() => props.upwardSpace);
  const { setCompensation, contentHeight } = useContentHeight(
    getIsContentFullHeight,
    wrapperRef,
    [headerRef, footerRef],
    [contentRef],
    getUpwardSpace,
    offsetHeightRef,
  );

  setCompensation({ useLayoutFooter: true, elements: [footerRef] });

  const getClass = computed(() => {
    return [
      'page-wrapper',
      {
        [`page-wrapper--dense`]: props.dense,
      },
      attrs.class ?? {},
    ];
  });

  const getShowHeader = computed(
    () => props.content || slots?.headerContent || props.title || getHeaderSlots.value.length,
  );


  const getHeaderSlots = computed(() => {
    return Object.keys(omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent'));
  });

  const getContentStyle = computed((): CSSProperties => {
    const { contentFullHeight, contentStyle, fixedHeight } = props;
    if (!contentFullHeight) {
      return { ...contentStyle };
    }

    const height = `${unref(contentHeight)}px`;
    return {
      ...contentStyle,
      minHeight: height,
      ...(fixedHeight ? { height } : {}),
    };
  });

  const getContentClass = computed(() => {
    const { contentBackground, contentClass } = props;
    return [
      `page-wrapper-content`,
      contentClass,
      {
        [`page-wrapper-content-bg`]: contentBackground,
      },
    ];
  });
</script>
<style lang="less">
  @prefix-cls: ~'page-wrapper';

  .@{prefix-cls} {
    position: relative;

    .@{prefix-cls}-content {
      margin: 16px;
    }

    .ant-page-header {
      &:empty {
        padding: 0;
      }
    }

    &-content-bg {
      background-color: @component-background;
    }

    &--dense {
      .@{prefix-cls}-content {
        margin: 0;
      }
    }
  }
</style>
