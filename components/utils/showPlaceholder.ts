import { ReactNode } from 'react'

export default function showPlaceHolder(value: ReactNode, placeholder: string) {
  if (value === null || value === void 0 || value === '') {
    return placeholder
  }
  return value
}
