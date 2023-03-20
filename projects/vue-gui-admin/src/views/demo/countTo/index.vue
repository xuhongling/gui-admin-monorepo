<template>
  <div class="count-to-demo">
    <a-page-header title="数字动画示例" />
    <a-card>
      <a-card-grid class="count-to-demo-card">
        <CountTo prefix="$" :color="'#409EFF'" :startVal="1" :endVal="200000" :duration="8000" />
      </a-card-grid>
      <a-card-grid class="count-to-demo-card">
        <CountTo
          suffix="$"
          :color="'red'"
          :startVal="1"
          :endVal="300000"
          :decimals="2"
          :duration="6000"
        />
      </a-card-grid>
      <a-card-grid class="count-to-demo-card">
        <CountTo
          suffix="$"
          :color="'rgb(0,238,0)'"
          :startVal="1"
          :endVal="400000"
          :duration="7000"
        />
      </a-card-grid>
      <a-card-grid class="count-to-demo-card">
        <CountTo
          separator="-"
          :color="'rgba(138,43,226,.6)'"
          :startVal="10000"
          :endVal="500000"
          :duration="8000"
        />
      </a-card-grid>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { CountTo } from '@gui-pkg/components';
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .count-to-demo {
    width: 100%;
    height: 100%;
    padding: 16px;
    &-card {
      width: 50%;
      font-size: 30px;
      text-align: center;
    }
  }
</style>
