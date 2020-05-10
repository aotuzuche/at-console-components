/* eslint-disable no-underscore-dangle */
import { mapValues, isPlainObject } from 'lodash'
import moment from 'moment'

const key = '_query'
const { history, location } = window

const handler = (values: any, isSet?: boolean): any => {
  return mapValues(values, (value: any) => {
    if (value && value._isAMomentObject) {
      const v = {
        _isAMomentObject: true,
        value: value.format(),
      }
      return !isSet ? moment(value.value) : v
    }
    if (
      Array.isArray(value) &&
      value.length === 2 &&
      (value[0]._isAMomentObject || value[1]._isAMomentObject)
    ) {
      const v0 = {
        _isAMomentObject: true,
        value: value[0]?.format(),
      }
      const v1 = {
        _isAMomentObject: true,
        value: value[1]?.format(),
      }
      return [isSet ? v0 : moment(value[0]?.value), isSet ? v1 : moment(value[1]?.value)]
    }

    if (isPlainObject(value)) {
      return handler(value, isSet)
    }
    return value
  })
}

export function getHistoryState() {
  const { state = {} } = history

  if (!state[key] || !isPlainObject(state[key])) {
    return {}
  }

  return handler(state[key])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setHistoryState(query: { [key: string]: any }) {
  if (!query || !isPlainObject(query)) {
    return
  }

  const { pathname, search } = location
  const { state } = history
  history.replaceState(
    {
      ...state,
      [key]: handler(query, true),
    },
    '',
    pathname + search,
  )
}
