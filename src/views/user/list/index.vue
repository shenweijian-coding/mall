<template>
  <!-- 用户概况 -->
  <a-card title="用户概况">
    <a-row>
      <a-col v-for="(item, key) in userProfiles" :span="6" :key="key">
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
    <ConfigForm :formConfig="formConfig" :inline="true"></ConfigForm>
  </a-card>
  <!-- 结果 -->
  <a-card class="mt-m">
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a>Delete</a>
          <a-button @click="handleEdit(record)">编辑</a-button>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
<script>
  import ConfigForm from '@/components/config-form/index.vue'

  export default {
    components: {
      ConfigForm,
    },
    data() {
      return {
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
        dataSource: [
          {
            name: '申伟建',
            price: '123',
            type: '类型',
            num: '12',
            time1: '2023-11-1',
            time2: '2023-11-1',
            action: '11',
          },
        ],
      }
    },
  }
</script>
