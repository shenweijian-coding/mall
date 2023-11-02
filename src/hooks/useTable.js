import { reactive, toRefs } from 'vue'
import { debounce } from '@/utils'

/**
 * @description table操作方法封装
 * @param {Function} api 表格列表数据接口
 * @param {Object} searchParam 表格查询参数
 */
export const useTable = (api, searchParam = {}) => {
  const state = reactive({
    loading: false,
    tableData: [],
    page: {
      current: 1,
      total: 1,
      pageSize: 15,
      showQuickJumper: true,
      size: 'default',
    },
  })

  // 获取表格列表数据
  const getTableData = async (
    params = {
      current: state.page.current,
      size: state.page.pageSize,
      ...searchParam,
    }
  ) => {
    state.loading = true
    const { data } = await api(params).catch((e) => e)
    state.loading = false
    if (data) {
      state.tableData = data
      state.page.total = 100
    }
  }

  // 分页切换方法
  const handleSizeChange = (val) => {
    state.page = val
    getTableData()
  }

  // 表格数据搜索, 防抖(需安装lodash)
  const searchData = debounce((getTableData) => {
    getTableData()
  }, 500)

  getTableData()
  // 返回相关变量与方法
  return {
    ...toRefs(state),
    getTableData,
    handleSizeChange,
    searchData,
  }
}
