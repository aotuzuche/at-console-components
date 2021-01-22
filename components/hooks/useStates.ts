import { useReducer, Dispatch } from 'react'

export default function useStates<T>(initialValue: T): [T, Dispatch<Partial<T>>] {
  const reducer = (state: T, data: T) => ({ ...state, ...data })
  return useReducer(reducer, initialValue) as [T, Dispatch<Partial<T>>]
}
