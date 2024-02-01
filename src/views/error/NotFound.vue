<template>
  <div class="not-found-wrapper">
    <div class="bg-wrap">
      <img src="../../assets/images/error/404.png" alt="" />
      <div class="error-content">很抱歉，我们找不到该页面！</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.not-found-wrapper {
  width: 100%;
  height: 100%;
  .bg-wrap {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
      height: 60%;
    }
    .error-content {
      margin-top: 14px;
      font-size: 14px;
    }
  }
}
</style>
