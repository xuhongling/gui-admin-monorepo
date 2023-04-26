<template>
  <div class="loginForm animation delay1">
    <h2 class="title animation delay2">账号登录</h2>
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="handleLogin"
    >
      <a-form-item name="code" :rules="[{ required: true, message: '请输入账号！' }]" class="animation delay3">
        <div class="greyBG">
          <a-input v-model:value="formState.code" :bordered="false">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </div>
      </a-form-item>

      <a-form-item name="pwd" :rules="[{ required: true, message: '请输入密码！' }]" class="animation delay4">
        <div class="greyBG">
          <a-input-password v-model:value="formState.pwd" :bordered="false">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </div>
      </a-form-item>

      <a-form-item name="remember" class="animation delay5">
        <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
      </a-form-item>

      <a-form-item class="animation delay7">
        <a-button type="primary" block html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { notification } from 'ant-design-vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { useUserStoreWithOut } from '@/store/modules/user';
  import { Base64 } from '@gui-pkg/utils';

  interface FormState {
    code: string;
    pwd: string;
    remember?: boolean;
  }

  const userStore = useUserStoreWithOut();

  const formState = reactive<FormState>({
    code: 'admin',
    pwd: 'GRKJ_@2022',
  });

  async function handleLogin(values: any) {
    values.pwd = Base64.encode(values.pwd);
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
  .loginForm {
    width: 480px;
    background: #fff;
    box-shadow: 0px 0px 14px rgba(3, 122, 255, 0.12);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    // padding: 70px 80px 30px 80px;
    padding: 50px 80px 30px 80px;

    .app{
        text-align: center;
        margin: auto;
        width: 120px;
    }

    h2.title {
      width: 110px;
      height: 22px;
      margin-bottom: 0;
      // background: url("@/assets/images/login_title.png") no-repeat;
      // background-size: 100% 100%;
      font-size: 22px;
      font-weight: bold;
    }

    .ant-form {
      width: 100%;

      .greyBG {
        background: #F5F5F8;
        border-radius: 4px;
      }
    }
  }

  .animation {
    animation-name: move;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-delay: 0.1s;
  }

  .delay1 {
    animation-delay: 0.2s;
  }

  .delay2 {
    animation-delay: 0.3s;
  }

  .delay3 {
    animation-delay: 0.4s;
  }

  .delay4 {
    animation-delay: 0.6s;
  }

  .delay5 {
    animation-delay: 0.7s;
  }

  .delay6 {
    animation-delay: 0.8s;
  }

  .delay7 {
    animation-delay: 0.9s;
  }

  .delay8 {
    animation-delay: 1.0s;
  }
  @keyframes move {
    0% {
      opacity: 0;
      visibility: hidden;
      -webkit-transform: translateY(-40px);
              transform: translateY(-40px);
    }

    100% {
      opacity: 1;
      visibility: visible;
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
  }
</style>
