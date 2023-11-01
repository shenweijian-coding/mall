export const getFormConfigParams = formConfig => {
  const params = {}

  for (const prop in formConfig) {
    const formItem = formConfig[prop]

    // 需要有value属性
    if (formItem.hasOwnProperty('value') || formItem.hasOwnProperty('inputValue')) {
      const { value, type, getValue, label, inputValue, selectValue } = formItem

      if (getValue) {
        getValue(params, formItem)
      } else {
        switch (type) {
          case 'numrange':
            params[prop + 'Start'] = value[0]
            params[prop + 'End'] = value[1]
            break

          case 'daterange':
            params[prop + 'Begin'] = (value || [])[0]
            params[prop + 'End'] = (value || [])[1]
            break

          case 'quick-date-range':
            params[prop + 'Begin'] = (value || [])[0]
            params[prop + 'End'] = (value || [])[1]
            params.checkTimeType = selectValue
            break

          case 'date-time-range':
            params[prop + 'Begin'] = (value || [])[0]
            params[prop + 'End'] = (value || [])[1]
            break

          case 'selectinput':
            if (label) {
              params[prop] = inputValue
            } else {
              params[selectValue] = inputValue
            }
            break

          case 'batch':
            var content = inputValue ? inputValue.split(/\r|\n/) : undefined
            if (content) {
              params[prop + 'Content'] = content.map(o => o.trim()).filter(o => o.length)
              params[prop + 'Type'] = selectValue
            }
            break

          default:
            params[prop] = value
        }
      }
    }
  }

  return params
}
