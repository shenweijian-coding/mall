<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <a-date-picker
      v-model="value[0]"
      type="datetime"
      placeholder="最早时间"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="handleDateChange(0)"
    />
    <span>至</span>
    <a-date-picker
      v-model="value[1]"
      type="datetime"
      placeholder="最晚时间"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="handleDateChange(1)"
    />
  </div>
</template>

<script>
  export default {
    name: 'DateTimeRange',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        pickerOptions1: {
          disabledDate: (time) => {
            if (!this.value[1]) {
              return false
            }
            return time - new Date(this.value[1]) >= 0
          },
        },
        pickerOptions2: {
          disabledDate: (time) => {
            if (!this.value[0]) {
              return false
            }
            return time - new Date(this.value[0]) <= 0
          },
        },
      }
    },
    methods: {
      handleDateChange(i) {
        const [begin, end] = this.value
        if (begin && end) {
          if (new Date(end) - new Date(begin) < 0) {
            this.$message.warning('最晚时间要大于等于最早时间，请重新录入')

            this.$emit('change', i ? [begin, null] : [null, end])
          }
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .a-date-editor {
    width: 46%;
  }
</style>
