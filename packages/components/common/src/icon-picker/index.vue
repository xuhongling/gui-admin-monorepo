<template>
  <a-input
    :style="{ width }"
    class="icon-picker"
    placeholder="点击选择图标"
    v-model:value="currentSelect"
    @click="triggerPopover"
    :allowClear="props.allowClear"
    :readonly="props.readonly"
  >
    <template #addonAfter>
      <a-popover
        placement="bottomLeft"
        trigger="click"
        v-model="visible"
        overlayClassName="icon-picker-popover"
      >
        <template #title>
          <div class="flex justify-between">
            <a-input placeholder="搜索图标" @change="debounceHandleSearchChange" allowClear />
          </div>
        </template>

        <template #content>
          <div v-if="getPaginationList.length">
            <ScrollContainer class="border border-solid border-t-0">
              <ul class="flex flex-wrap p-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
                >
                  <SvgIcon v-if="isSvgMode" :name="icon" />
                  <Icon :icon="icon" v-else />
                </li>
              </ul>
            </ScrollContainer>
            <div class="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
              <a-pagination
                showLessItems
                size="small"
                :pageSize="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else>
            <div class="p-5"><a-empty /> </div>
          </template>
        </template>

        <div ref="trigger">
          <span class="cursor-pointer px-2 py-1 flex items-center" v-if="isSvgMode && currentSelect">
            <SvgIcon :name="currentSelect" />
          </span>
          <Icon :icon="currentSelect || 'ion:apps-outline'" class="cursor-pointer px-2 py-1" v-else />
        </div>
      </a-popover>
    </template>
  </a-input>
</template>

<script lang="ts" setup>
  import { ref, watchEffect, watch } from 'vue';
  import ScrollContainer from '../container/scroll-container.vue'
  import { useDebounceFn } from '@gui-pkg/utils';
  import { usePagination, copyTextToClipboard } from '@gui-pkg/hooks';
  import Icon from '../icon/index.vue';
  import SvgIcon from '../svg-icon/index.vue';

  import iconsData from './icons.data';
  import svgIcons from 'virtual:svg-icons-names';

  function getIcons() {
    const prefix = iconsData.prefix;
    return iconsData.icons.map((icon) => `${prefix}:${icon}`);
  }

  function getSvgIcons() {
    return svgIcons.map((icon: string) => icon.replace('icon-', ''));
  }

  export interface Props {
    value?: string;
    width?: string;
    pageSize?: number;
    copy?: boolean;
    mode?: 'svg' | 'iconify';
    allowClear?: boolean;
    readonly?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    value: '',
    width: '100%',
    pageSize: 140,
    copy: false,
    mode: 'iconify',
    allowClear: true,
    readonly: false,
  });

  // Don't inherit FormItem disabled、placeholder...
  defineOptions({
    inheritAttrs: false,
  });

  const emit = defineEmits(['change', 'update:value']);

  const isSvgMode = props.mode === 'svg';
  const icons = isSvgMode ? getSvgIcons() : getIcons();

  const currentSelect = ref('');
  const visible = ref(false);
  const currentList = ref(icons);
  const trigger = ref<HTMLDivElement>();

  const triggerPopover = () => {
    if (trigger.value) {
      trigger.value.click();
    }
  };

  const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100);

  const { getPaginationList, getTotal, setCurrentPage } = usePagination(
    currentList,
    props.pageSize,
  );

  watchEffect(() => {
    currentSelect.value = props.value;
  });

  watch(
    () => currentSelect.value,
    (v) => {
      emit('update:value', v);
      emit('change', v);
    },
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleClick(icon: string) {
    currentSelect.value = icon;
    if (props.copy) {
      copyTextToClipboard(icon);
    }
  }

  function handleSearchChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;

    if (!value) {
      setCurrentPage(1);
      currentList.value = icons;
      return;
    }
    currentList.value = icons.filter((item) => item.includes(value));
  }
</script>

<style lang="less">
  .icon-picker {
    .ant-input-group-addon {
      padding: 0;
    }

    .ant-input {
      cursor: pointer;
    }

    &-popover {
      width: 300px;

      .ant-popover-inner-content {
        padding: 0;
      }

      .scrollbar {
        height: 220px;
      }
    }
  }
</style>
