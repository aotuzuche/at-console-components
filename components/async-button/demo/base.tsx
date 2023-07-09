import { AsyncButton } from 'at-console-components'
import React from 'react'

export default function Base() {
  // eslint-disable-next-line no-promise-executor-return
  return <AsyncButton onClick={() => new Promise(res => setTimeout(res, 1000))}>Click</AsyncButton>
}
