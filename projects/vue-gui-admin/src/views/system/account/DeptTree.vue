<template>
  <div class="mr-0 overflow-hidden bg-white w-1/4 xl:w-1/5">
    <div class="tree-header flex px-2 py-1.5 items-center">
      <div class="basic-title">部门列表</div>
    </div>
    <div class="scrollbar scroll-container p-2.5" style="height: 80%;">
      <a-tree
        :tree-data="treeData"
        :fieldNames="{children:'children', title:'deptName', key:'id' }"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getDeptList } from '@/api/demo/system';

  const treeData = ref<TreeItem[]>([]);
  const emit = defineEmits(['select']);
  defineOptions({
    name: 'DeptTree',
  });

  async function fetch() {
    treeData.value = (await getDeptList()) as unknown as TreeItem[];
  }

  function handleSelect(keys) {
    emit('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .tree-header {
    height: 44px;
    border-bottom: 1px solid #d9d9d9;

    .basic-title {
      position: relative;
      display: flex;
      padding-left: 4px;
      font-size: 15px;
      font-weight: 500;
      line-height: 24px;
      color: #000000d9;
      cursor: pointer;
      text-indent: 6px;

      &::before {
        content: '';
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url('@/assets/images/title_tips.png') no-repeat;
        background-size: contain;
        position: relative;
        top: 4px;
      }
    }
  }

  .scrollbar {
    user-select: none;
  }
</style>
