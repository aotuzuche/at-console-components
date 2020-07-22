interface LoginInfo {
  loginName?: string
  /**
   * YYYYMMDDHHmmss
   */
  loginTime?: string
}

const key = 'auto_system_userData'

export default function getLoginInfo(): LoginInfo {
  const value = window.localStorage.getItem(key)
  const emptyObj = {}

  try {
    return value ? JSON.parse(value) : emptyObj
  } catch (error) {
    return emptyObj
  }
}
