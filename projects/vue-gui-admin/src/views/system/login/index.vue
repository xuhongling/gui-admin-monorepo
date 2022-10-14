<template>
  <div class="login">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="handleLogin"
    >
      <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入账号！' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="pwd" :rules="[{ required: true, message: '请输入密码！' }]">
        <a-input-password v-model:value="formState.pwd" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { notification } from 'ant-design-vue';
  import { useUserStoreWithOut } from '@/store/user';

  interface FormState {
    username: string;
    pwd: string;
  }

  const userStore = useUserStoreWithOut();

  const formState = reactive<FormState>({
    username: 'admin',
    pwd: 'Grkj@1234',
  });

  async function handleLogin(values: any) {
    const userInfo = await userStore.login(values);
    if (userInfo) {
      notification.success({
        message: '登录成功',
        description: `欢迎回来: ${userInfo.realName}`,
        duration: 3,
      });
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .login {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
