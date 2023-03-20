<template>
  <BasicDrawer v-bind="$attrs" title="Drawer Title" width="50%"> Drawer Info. </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer } from '@gui-pkg/antdcomponents';
  export default defineComponent({
    components: { BasicDrawer },
    setup() {
      return {};
    },
  });
</script>
