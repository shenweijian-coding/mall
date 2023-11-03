<template>
  <div>
    <a-card>
      <ConfigForm
        :formConfig="initPage.formConfig"
        :inline="true"
        @search="getTableData"
      ></ConfigForm>
    </a-card>
    <a-card class="mt-m">
      <a-tabs
        v-model:activeKey="initPage.currentTablekey"
        type="card"
        @change="tabChange"
      >
        <a-tab-pane
          v-for="tab in initPage.tabs"
          :key="tab.key"
          :tab="tab.title"
        ></a-tab-pane>
      </a-tabs>
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
            <a-button @click="handleAudit(true, record)" type="link">
              通过
            </a-button>
            <a-button @click="handleAudit(false, record)" type="link">
              拒绝
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script setup>
  import { reactive } from 'vue'
  import ConfigForm from '@/components/config-form/index.vue'
  import { useTable } from '@/hooks/useTable'
  // import { useRouter } from 'vue-router'

  const initPage = reactive({
    currentTablekey: 1,
    tabs: [
      { key: 1, title: '全部' },
      { key: 2, title: '销售中' },
      { key: 3, title: '下架中' },
      { key: 4, title: '售罄' },
    ],
    formConfig: {
      name: {
        label: '商品搜索',
        type: 'input',
        placeholder: '输入ID/昵称/姓名/手机号',
        value: '',
      },
      grade: {
        label: '商品分类',
        type: 'select',
        placeholder: '请选择',
        value: '',
      },
      date1: {
        label: '创建时间',
        type: 'daterange',
        value: ['', ''],
      },
      source: {
        label: '分销状态',
        type: 'select',
        placeholder: '请选择',
        value: '',
      },
    },
    columns: [
      {
        title: '商品描述',
        dataIndex: 'name',
      },
      {
        title: '商品价格',
        dataIndex: 'price',
      },
      {
        title: '库存',
        dataIndex: 'type',
      },
      {
        title: '销量',
        dataIndex: 'num',
      },
      {
        title: '创建时间',
        dataIndex: 'time1',
      },
      {
        title: '商品状态',
        dataIndex: 'time2',
      },
      {
        title: '分销状态',
        dataIndex: 'operation',
      },
      {
        title: '成本价状态',
        dataIndex: 'time',
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ],
  })
  const { tableData, page, loading, getTableData, handleSizeChange } =
    useTable()

  function tabChange(key) {
    console.log(key)
  }
</script>
