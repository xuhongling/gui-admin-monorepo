<template>
  <div class="tree-demo">
    <a-page-header title="Tree基础示例" />
    <Row :gutter="[16, 16]">
      <Col :span="8">
        <BasicTree title="基础示例，默认展开第一层" :treeData="treeData" defaultExpandLevel="1">
          <template #title> 123123 </template>
        </BasicTree>
      </Col>
      <Col :span="8">
        <BasicTree
          title="可勾选，默认全部展开"
          :treeData="treeData"
          :checkable="true"
          defaultExpandAll
          @check="handleCheck"
        />
      </Col>
      <Col :span="8">
        <BasicTree
          title="指定默认展开/勾选示例"
          :treeData="treeData"
          :checkable="true"
          :expandedKeys="['0-0']"
          :checkedKeys="['0-0']"
        />
      </Col>
      <Col :span="8">
        <BasicTree
          title="懒加载异步树"
          ref="asyncTreeRef"
          :treeData="tree"
          :load-data="onLoadData"
        />
      </Col>
      <Col :span="8">
        <Card title="异步数据，默认展开">
          <template #extra>
            <a-button @click="loadTreeData" :loading="treeLoading">加载数据</a-button>
          </template>
          <Spin :spinning="treeLoading">
            <BasicTree ref="asyncExpandTreeRef" :treeData="tree2" />
          </Spin>
        </Card>
      </Col>
      <Col :span="8">
        <Card title="BasicTree内置加载">
          <template #extra>
            <a-button @click="loadTreeData2" :loading="treeLoading">请求数据</a-button>
          </template>
          <BasicTree ref="loadTreeRef" :treeData="tree2" :loading="treeLoading" />
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts" setup>
  import { type Nullable } from '@gui-pkg/types';
  import { nextTick, ref, unref } from 'vue';
  import { BasicTree, TreeActionType } from '@gui-pkg/antdcomponents';
  import { treeData } from './data';
  import { Card, Row, Col, Spin } from 'ant-design-vue';
  import { isArray, cloneDeep, uniq } from '@gui-pkg/utils';

  const asyncTreeRef = ref<Nullable<TreeActionType>>(null);
  const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
  const loadTreeRef = ref<Nullable<TreeActionType>>(null);
  const tree2 = ref<any[]>([]);
  const treeLoading = ref(false);

  function handleCheck(checkedKeys, e) {
    console.log('onChecked', checkedKeys, e);
  }

  function loadTreeData() {
    treeLoading.value = true;
    // 以下是模拟异步获取数据
    setTimeout(() => {
      // 设置数据源
      tree2.value = cloneDeep(treeData);
      treeLoading.value = false;
      // 展开全部
      nextTick(() => {
        console.log(unref(asyncExpandTreeRef));
        unref(asyncExpandTreeRef)?.expandAll(true);
      });
    }, 2000);
  }
  function loadTreeData2() {
    treeLoading.value = true;
    // 以下是模拟异步获取数据
    setTimeout(() => {
      // 设置数据源
      tree2.value = cloneDeep(treeData);
      treeLoading.value = false;
    }, 2000);
  }

  const tree = ref([
    {
      title: 'parent ',
      key: '0-0',
    },
  ]);

  function onLoadData(treeNode) {
    return new Promise((resolve: (value?: unknown) => void) => {
      if (isArray(treeNode.children) && treeNode.children.length > 0) {
        resolve();
        return;
      }
      setTimeout(() => {
        const asyncTreeAction: TreeActionType | null = unref(asyncTreeRef);
        if (asyncTreeAction) {
          const nodeChildren = [
            { title: `Child Node ${treeNode.eventKey}-0`, key: `${treeNode.eventKey}-0` },
            { title: `Child Node ${treeNode.eventKey}-1`, key: `${treeNode.eventKey}-1` },
          ];
          asyncTreeAction.updateNodeByKey(treeNode.eventKey, { children: nodeChildren });
          asyncTreeAction.setExpandedKeys(
            uniq([treeNode.eventKey, ...asyncTreeAction.getExpandedKeys()]),
          );
        }

        resolve();
        return;
      }, 300);
    });
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .tree-demo {
    width: 100%;
    height: 100%;
    padding: 16px;
  }
</style>
