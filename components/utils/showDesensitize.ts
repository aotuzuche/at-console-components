import { ReactNode } from 'react'
import Desensitize from '../utils/desensitize'
import { isFunc } from './is'

export type DesensitizeType =
  | 'idCard'
  | 'mobile'
  | 'name'
  | 'vin'
  | 'plateCode'
  | 'bankCard'
  | 'email'

export default function showDesensitize(value: ReactNode, type: DesensitizeType | string) {
  if (!value || !type || type === 'custom') {
    return value
  }

  if (isFunc((Desensitize as any)[type])) {
    return (Desensitize as any)[type](value.toString())
  }

  return value
}
