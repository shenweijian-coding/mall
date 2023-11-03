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
    formConfig: {
      name: {
        label: '分销商搜索',
        type: 'input',
        placeholder: '输入ID/昵称/姓名/手机号',
        value: '',
      },
      grade: {
        label: '分销商等级',
        type: 'select',
        placeholder: '请选择',
        value: '',
      },
      date1: {
        label: '申请时间',
        type: 'daterange',
        value: ['', ''],
      },
      source: {
        label: '用户来源',
        type: 'select',
        placeholder: '请选择',
        value: '',
      },
      status: {
        label: '用户来源',
        type: 'select',
        placeholder: '请选择',
        value: '',
      },
      date2: {
        label: '加入时间',
        type: 'daterange',
        value: ['', ''],
      },
    },
    columns: [
      {
        title: '基本信息',
        dataIndex: 'name',
      },
      {
        title: '分销商等级',
        dataIndex: 'price',
      },
      {
        title: '累计销售金额',
        dataIndex: 'type',
      },
      {
        title: '累计佣金',
        dataIndex: 'num',
      },
      {
        title: '所有用户数',
        dataIndex: 'time1',
      },
      {
        title: '团队人数',
        dataIndex: 'time2',
      },
      {
        title: '状态',
        dataIndex: 'operation',
      },
      {
        title: '时间',
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
</script>
