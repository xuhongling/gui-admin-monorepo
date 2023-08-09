<template>
  <div class="login">
    <div class="logo">
      <img class="logo_icon" src="@/assets/logo.png" alt="logo" />
      <h2 class="logo_name">后台管理综合系统</h2>
    </div>
    <div class="contents">
      <img class="contents_img" src="@/assets/images/login_img.png" />
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './LoginForm';
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .login {
    width: 100%;
    height: 100%;
    background: url('@/assets/images/bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      display: flex;
      align-items: center;
      position: absolute;
      top: 14px;
      left: 40px;
      .logo_icon {
        width: 40px;
        margin-right: 10px;
      }
      .logo_name {
        font-size: 26px;
        font-weight: bold;
        // font-style: italic;
        letter-spacing: 2px;
        background-image: -webkit-linear-gradient(#02ceff, #3177f9);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
    .contents {
      display: flex;
      align-items: center;
      justify-content: center;
      .contents_img {
        width: 857px;
        height: 715px;
        transform:rotate(2deg);
        margin-left: -40px;
        margin-right: 140px;
      }
    }
  }
</style>
