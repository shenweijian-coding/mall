<template>
  <div>用户中心</div>
  <ConfigForm :formConfig="formConfig"></ConfigForm>
</template>
<script>
import ConfigForm from '@/components/config-form/index.vue'

export default {
  components: {
    ConfigForm
  },
  data() {
    return {
      formConfig: {
        orderNo: {
          label: '业务单号',
          type: 'input',
          placeholder: '业务单号',
          value: ''
        },
        keyWord: {
          label: '关键字',
          type: 'input',
          placeholder: '关键字',
          value: ''
        },
        tags: {
          label: '用户标签',
          type: 'select',
          placeholder: '用户标签',
          value: '',
          options: [{ id: 1, name: 1 }]
        }
      }
    }
  }
}
</script>