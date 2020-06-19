/* eslint-disable no-param-reassign */
function isType(target: any, type: any) {
  const targetType = {}.toString.call(target).toLowerCase()
  type = `[object ${type}]`.toLowerCase()

  return targetType === type
}

function ignore(target: any, rule: any) {
  if (!target) {
    throw new TypeError('"target" is null or not defined.')
  } else if (!rule) {
    throw new TypeError('"rule" is null or not defined.')
  } else if (!isType(target, 'object')) {
    throw new TypeError('"target" must be typeof object.')
  } else if (!isType(rule, 'string') && !isType(rule, 'array')) {
    throw new TypeError('"rule" must be typeof string or array.')
  }

  if (isType(rule, 'string')) {
    rule = [rule]
  }

  // default: ignore 'children' and 'className' props
  rule.push('children')
  rule.push('className')

  const resObject: any = {}

  Object.entries(target).forEach((item) => {
    if (rule.indexOf(item[0]) === -1) {
      // eslint-disable-next-line prefer-destructuring
      resObject[item[0]] = item[1]
    }
  })

  return resObject
}

export default ignore
