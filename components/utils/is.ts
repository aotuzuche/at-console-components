// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunc(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export function isCanUseWindow() {
  return typeof window !== undefined
}
