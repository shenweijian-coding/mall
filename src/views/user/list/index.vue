<template>
  <!-- 用户概况 -->
  <a-card title="用户概况">
    <a-row>
      <a-col v-for="(item, key) in initPage.userProfiles" :span="6" :key="key">
        <div class="flex-col ai-center">
          <div class="fs-14">{{ item.label }}</div>
          <div class="fs-22 text-bold">{{ item.num }}</div>
          <div class="fs-14">昨日：{{ item.ayer }}</div>
        </div>
      </a-col>
    </a-row>
  </a-card>
  <!-- 筛选区 -->
  <a-card class="mt-m">
    <ConfigForm
      :formConfig="initPage.formConfig"
      :inline="true"
      @search="getTableData"
    ></ConfigForm>
  </a-card>
  <!-- 结果 -->
  <a-card class="mt-m">
    <a-table
      bordered
      :data-source="tableData"
      :columns="initPage.columns"
      size="small"
      :loading="loading"
      :pagination="page"
      @change="handleSizeChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-button @click="handleEdit(record)" type="link">编辑</a-button>
          <a-button @click="handleEdit(record)" type="link">加标签</a-button>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
<script setup>
  import { reactive } from 'vue'
  import ConfigForm from '@/components/config-form/index.vue'
  import { getUserList } from '@/api/user.js'
  import { getFormConfigParams } from '@/utils/get-form-config-params'
  import { useTable } from '@/hooks/useTable'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const initPage = reactive({
    formConfig: {
      keyWord: {
        label: '关键字',
        type: 'input',
        placeholder: '请输入用户昵称搜索',
        value: '',
      },
      tags: {
        label: '用户标签',
        type: 'select',
        placeholder: '用户标签',
        value: [],
        options: [{ id: 1, name: 1 }],
      },
      date1: {
        label: '注册时间',
        type: 'daterange',
        value: ['', ''],
      },
      date2: {
        label: '上次消费时间',
        type: 'daterange',
        value: ['', ''],
      },
      userType: {
        label: '用户类型',
        type: 'select',
        placeholder: '用户类型',
        value: [],
        options: [{ id: 1, name: 1 }],
      },
      date3: {
        label: '最后访问时间',
        type: 'daterange',
        value: ['', ''],
      },
    },
    userProfiles: {
      user_total: { label: '总用户数', num: 111, ayer: 80 },
      user_total2: { label: '总用户数', num: 111, ayer: 80 },
      user_total3: { label: '总用户数', num: 111, ayer: 80 },
      user_total4: { label: '总用户数', num: 111, ayer: 80 },
    },
    columns: [
      {
        title: '用户',
        dataIndex: 'name',
      },
      {
        title: '消费金额',
        dataIndex: 'price',
      },
      {
        title: '用户类型',
        dataIndex: 'type',
      },
      {
        title: '消耗次数',
        dataIndex: 'num',
      },
      {
        title: '上次消费时间',
        dataIndex: 'time1',
      },
      {
        title: '最后访问时间',
        dataIndex: 'time2',
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ],
    dataSource: [],
    tableLoading: false,
  })

  const { tableData, page, loading, getTableData, handleSizeChange } = useTable(
    getUserList,
    getFormConfigParams(initPage.formConfig)
  )
  function handleEdit() {
    router.push('/user/detail')
  }
</script>
