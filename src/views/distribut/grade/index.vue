<template>
  <div>
    <a-card class="mt-m">
      <a-button type="primary">添加分销商等级</a-button>
      <a-table
        class="mt-m"
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
              编辑
            </a-button>
            <a-button @click="handleAudit(false, record)" type="link">
              删除
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useTable } from '@/hooks/useTable'

  const initPage = reactive({
    columns: [
      {
        title: '等级权重',
        dataIndex: 'name',
      },
      {
        title: '分销商数量',
        dataIndex: 'price',
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ],
  })
  const { tableData, page, loading, handleSizeChange } = useTable()
</script>
