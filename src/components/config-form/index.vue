<template>
  <a-form
    ref="ConfigForm"
    :form="formConfig"
    v-bind="$attrs"
    :laba-width="labelWidth"
    @submit.prevent
  >
    <a-row :gutter="24">
      <template v-for="(item, key) in formConfig">
        <a-col v-if="item.type === 'title'" :key="key" :span="24" class="title">
          {{ item.label }}
          <a-divider />
        </a-col>

        <!-- <a-col v-else-if="item.type === 'batch'" :key="key + 1">
            <div class="batch-search">
              <div class="radio-wrap">
                <span class="a-form-item__label">{{ item.label }}</span>
                <a-radio-group v-model="item.selectValue">
                  <a-radio v-for="o in item.options" :key="o.id" :label="o.id">
                    {{ o.name }}
                  </a-radio>
                </a-radio-group>
              </div>

              <a-input
                v-model="item.inputValue"
                type="textarea"
                :rows="2"
                :placeholder="
                  (item.options.find((o) => o.id === item.selectValue) || {})
                    .placeholder
                "
              />
            </div>
          </a-col> -->

        <a-col v-else :key="key + 2" :span="_calSpan(item)">
          <div v-if="item.type === 'empty'" class="empty" />

          <a-form-item
            v-else
            :label="item.label"
            :laba-width="
              item.label ? (inline ? item.labelWidth : labelWidth) : '0px'
            "
          >
            <!--              <template v-if="item.longLabel" slot="label">-->
            <!--                <div v-tooltip style="width:100%;overflow:hidden; white-space:nowrap; text-overflow:ellipsis">-->
            <!--                  {{ item.label }}-->
            <!--                </div>-->
            <!--              </template>-->
            <span v-if="item.type === 'text'">
              {{ item.formatter ? item.formatter(item.value) : item.value }}
            </span>

            <a-input
              v-else-if="item.type === 'input'"
              v-model:value="item.value"
              clearable
              :placeholder="item.placeholder || `请输入${item.label}`"
              @keyup.enter="getData"
              @change="
                item.onChange && item.onChange(item.value, realFormConfig)
              "
              :style="{
                width: item.width || '200px',
              }"
            />

            <!-- <NumInput
                v-else-if="item.type === 'num'"
                v-model="item.value"
                :min="item.min"

                clearable
                :placeholder="item.placeholder || `请输入${item.label}`"
                @keyup.enter.native="getData"
                @change="item.onChange && item.onChange(item.value, realFormConfig)"
              /> -->

            <a-select
              v-else-if="item.type === 'select'"
              v-model="item.value"
              :multiple="Array.isArray(item.value)"
              filterable
              clearable
              :placeholder="item.placeholder || `请选择`"
              :disabled="item.disabled || false"
              collapse-tags
              @change="
                item.onChange && item.onChange(item.value, realFormConfig)
              "
              :style="{
                width: item.width || '200px',
              }"
            >
              <a-select-option
                v-for="it in item.options"
                :key="it.id !== undefined ? it.id : it.value"
                :label="it.name !== undefined ? it.name : it.label"
                :value="it.id !== undefined ? it.id : it.value"
              />
            </a-select>

            <!-- <template v-else-if="item.type === 'select-plus'">
                <EnhanceSelect ref="EnhanceSelect" :config="item" />
              </template> -->

            <a-switch
              v-else-if="item.type === 'switch'"
              v-model="item.value"
              :active-value="item.options.trueValue"
              :inactive-value="item.options.falseValue"
            />

            <a-range-picker
              v-else-if="item.type === 'daterange'"
              v-model="item.value"
              type="daterange"
              separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="(value) => handleDateChange(key, value, item)"
            />

            <a-date-picker
              v-else-if="item.type === 'month'"
              v-model="item.value"
              type="month"
              :clearable="item.clearable"
              placeholder="选择月"
              value-format="yyyy-MM"
              @change="(value) => handleDateChange(key, value, item)"
            />

            <DateTimeRange
              v-else-if="item.type === 'date-time-range'"
              v-model="item.value"
            />
            <!-- <MaxMinInput v-else-if="item.type === 'numrange'" v-model="item.value" :precision="item.precision" /> -->

            <!-- <marksSelect v-else-if="item.type === 'mark'" v-model="item.value" :options="item.options" /> -->

            <!-- <QuickDateRange v-else-if="item.type ==='quick-date-range'" :form-key="key" :config="item" @handleDateChange="handleDateChange" /> -->

            <!-- <a-cascader
              v-else-if="item.type === 'cascader'"
              v-model="item.value"
              :placeholder="item.placeholder || `请选择`"
              :show-all-levels="false"
              :options="item.options"
              clearable
              :props="{
                multiple: false,
                checkStrictly: true,
                expandTrigger: 'hover',
                value: 'id',
                label: 'name',
                children: 'children',
              }"
              @change="
                item.onChange && item.onChange(item.value, realFormConfig)
              "
            /> -->

            <!-- <a-input
              v-else-if="item.type === 'selectinput'"
              v-model="item.inputValue"
              class="selectinput"
              :placeholder="item.placeholder || `请输入${item.label}`"
              @keyup.enter="getData"
              @change="
                item.onChange && item.onChange(item.inputValue, realFormConfig)
              "
            >
              <a-select
                slot="prepend"
                v-model="item.selectValue"
                :style="{ width: item.label ? '68px' : '120px', padding: 0 }"
                @change="
                  item.onChange &&
                    item.onChange(item.selectValue, realFormConfig)
                "
              >
                <a-select-option
                  v-for="it in item.options"
                  :key="it.id !== undefined ? it.id : it.value"
                  :value="it.id !== undefined ? it.id : it.value"
                  :label="it.name !== undefined ? it.name : it.label"
                />
              </a-select>
            </a-input> -->
            <!-- 
              <select-tree
                v-else-if="item.type === 'select-tree'"
                v-model="item.value"
                :options="item.options"
              /> -->

            <!-- <a-select
                v-else-if="item.type === 'selecttree'"
                ref="classTreeDom"
                v-model="item.value"
              >
                <a-select-option
                  :label="item.selectedLabel"
                  :value="item.value"
                  style="height:100%"
                >
                  <a-tree
                    :data="item.treeData"
                    :props="item.defaultProps"
                    :render-content="item.renderContent"
                    :default-expand-all="true"
                    :highlight-current="true"
                    class="goodsClass-tree"
                    @node-click="handleNodeClick($event,item)"
                  />
                </a-select-option>
              </a-select> -->

            <a-input
              v-else-if="item.type === 'textarea'"
              v-model="item.value"
              class="config-text-area"
              type="textarea"
              :rows="1"
              :placeholder="
                item.placeholder || `以“回车”或“；”分隔，最多输入50条数据`
              "
              @keyup.enter="getData"
              @change="
                item.onChange && item.onChange(item.value, realFormConfig)
              "
            />
          </a-form-item>
        </a-col>
      </template>

      <a-form-item>
        <a-button type="primary" @click="$emit('search')">查询</a-button>
        <a-button class="ml-m" @click="handleClickResetBtn">重置</a-button>
      </a-form-item>
      <a-form-item v-if="$slots.default" style="float: right">
        <slot />
      </a-form-item>
    </a-row>
  </a-form>
</template>

<script>
  import { deepCopy } from '@/utils/deep-copy'
  // import MaxMinInput from '@/components/max-min-input'
  // import SelectTree from '@/components/select-tree/index.vue'
  import DateTimeRange from '@/components/date-time-range/index.vue'
  // import NumInput from '@/components/auth-num-input/index.vue'
  // import marksSelect from '@/components/marks/select.vue'

  // import EnhanceSelect from './enhance-select'
  // import QuickDateRange from '@/components/quick-date-range'
  export default {
    name: 'ConfigForm',
    components: {
      // MaxMinInput,
      // SelectTree,
      DateTimeRange,
      // NumInput,
      // marksSelect,
      // EnhanceSelect,
      // QuickDateRange
    },
    props: {
      formConfig: {
        type: Object,
        required: true,
      },
      fullFormConfig: {
        type: Object,
        default: null,
      },
      col: {
        type: Number,
        default: 3,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      labelWidth: {
        type: String,
        default: '87px',
      },
    },

    computed: {
      realFormConfig() {
        // 快速搜索区域是部分form，有时候需要改动全部form
        return this.fullFormConfig || this.formConfig
      },
    },

    created() {
      // 给每个item增加默认值
      Object.values(this.formConfig).forEach((o) => {
        // o.defaultValue = deepCopy(o.value)
        // o.defaultInputValue = deepCopy(o.defaultInput)
        // o.defaultSelectValue = deepCopy(o.selectValue)

        const { type } = o
        o.span = 12
        type === 'daterange' && (o.span = 16)
        type === 'date-time-range' && (o.span = 24)
        type === 'title' && (o.span = 24)
        type === 'batch' && (o.span = 24)
      })
    },

    methods: {
      getData() {
        this.$emit('getData')
      },

      handleDateChange(key, value, item) {
        if (!value) {
          value = []
        }

        if (value.length === 2) {
          const end = value[1].split(' ')
          end[1] = '23:59:59'
          value[1] = end.join(' ')
        }

        // eslint-disable-next-line vue/no-mutating-props
        this.formConfig[key].value = value

        item.onChange && item.onChange(value)
      },
      // 下拉树型控件 树节点点击事件
      handleNodeClick(data, item) {
        item.selectedLabel = data.name
        item.value = data.id
        console.log(this.$refs.classTreeDom)
        this.$refs.classTreeDom[0].blur()
      },
      _calSpan(item) {
        if (this.inline) {
          let i = 1
          if (item.type === 'date-time-range') {
            i = 2
          }

          return (24 / this.col) * i
        } else {
          if (item.type === 'quick-date-range') {
            return 24
          }
          return item.span
        }
      },
      reCalc() {
        this.$nextTick(() => {
          this.$refs['EnhanceSelect'] &&
            this.$refs['EnhanceSelect'].map((v) => v.handleToUpData())
        })
      },
      handleClickResetBtn() {
        this.resetFormData(true)
        this.$emit('search')
      },
      resetFormData(emitOnChange = false) {
        Object.values(this.formConfig).forEach((row) => {
          !row.resetType && (row.value = deepCopy(row.defaultValue))
          row.inputValue = deepCopy(row.defaultInputValue)
          row.selectValue = deepCopy(row.defaultSelectValue)
          row.selectedLabel = deepCopy(row.defaultSelectedLabel)

          emitOnChange &&
            row.onChange &&
            row.onChange(row.value, this.formConfig)
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  // .a-form {
  //   ::v-deep .a-form-item__content {
  //     height: 32px;
  //   }
  // }

  .batch-search {
    padding: 12px 16px;
    background: #f6f6f6;
    border-radius: 4px;
    margin-bottom: 18px;

    .radio-wrap {
      display: flex;

      > span {
        white-space: nowrap;
        line-height: normal;
      }

      .a-radio {
        margin-right: 16px;

        height: 14px;

        line-height: 14px;
        margin-bottom: 8px;

        ::v-deep .a-radio__label {
          font-size: 13px;
          padding-left: 8px;
          font-weight: 400;
        }
      }
    }
  }

  .title {
    font-size: 12px;
    font-weight: 500;
    color: #3b6dff;
    margin-top: 6px;

    .a-divider {
      margin: 4px 0 24px;
    }
  }

  .selectinput {
    // height: 33px;
    /deep/.a-input__inner {
      border-radius: 0 2px 2px 0 !important;
      padding: 0 0 0 17px;
    }

    /deep/.a-input-group__prepend {
      background-color: #ffffff;
      border-radius: 2px 0 0 2px;
      padding: 0 12px;
    }
  }

  .a-form-item--small.a-form-item {
    margin-bottom: 12px;
  }

  .a-form-item--small ::v-deep .a-form-item__content {
    min-height: 33px;
  }

  .empty {
    height: 49px;
  }

  .a-range-editor.a-input__inner {
    width: 100%;
  }

  // 多选 tag长度限制，因为有name 有+3 有输入，暂时设置43%
  .a-select /deep/ .a-tag {
    max-width: 81%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // textarea
  .config-text-area /deep/ textarea {
    min-height: 50px !important;
    border-radius: 2px;

    @media screen and (max-width: 1632px) {
      min-height: 66px !important;
    }
  }
</style>
