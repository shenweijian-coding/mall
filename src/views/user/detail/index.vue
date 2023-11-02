<template>
  <a-card title="基本信息">
    <a-row class="fs-16">
      <a-col :span="6">
        <vab-icon icon="account-circle-line"></vab-icon>
        <div>樱桃小丸子</div>
      </a-col>
      <a-col :span="6">
        <div>真实姓名：申伟建</div>
        <div>手机号：18832373807</div>
        <div>标签</div>
      </a-col>
      <a-col :span="6">
        <div>注册时间：2023-11-11</div>
        <div>最后访问：2023-11-11</div>
      </a-col>
      <a-col :span="6">关注状态：已收藏小程序</a-col>
    </a-row>
  </a-card>
  <a-card class="mt-m" title="资产信息">
    <div class="flex">
      <div class="card-box text-white flex-col jc-between p-m">
        <div class="fs-18">优惠券（张）</div>
        <div class="text-right fs-24 text-bold">25</div>
      </div>
      <div class="card-box text-white flex-col jc-between p-m ml-l">
        <div class="fs-18">余额</div>
        <div class="text-right fs-24 text-bold">25</div>
      </div>
    </div>
  </a-card>
  <a-card class="mt-m" title="资产信息">
    <div class="flex">
      <div class="card-box text-white flex-col jc-between p-m">
        <div class="fs-18">优惠券（张）</div>
        <div class="text-right fs-24 text-bold">25</div>
      </div>
      <div class="card-box text-white flex-col jc-between p-m ml-l">
        <div class="fs-18">余额</div>
        <div class="text-right fs-24 text-bold">25</div>
      </div>
    </div>
  </a-card>
</template>
<script setup>
  import VabIcon from '@/layout/vab-icon'
</script>
<style lang="less">
  .card-box {
    background-image: linear-gradient(to right, #eb417d, #b44997);
    width: 260px;
    height: 130px;
    border-radius: 6px;
  }
</style>
