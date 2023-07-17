import Cookie from 'js-cookie'
import qs from 'qs'

const consoleToken = '_app_console_token_'
const oldConsoleToken = 'auto_system_token'
const consoleInfoToken = '_app_console_userinfo_'
const oldConsoleInfoToken = 'auto_system_userData'
const ls = window.localStorage

// 获取管理后台token方法，即jwt
const getConsoleToken = () => ls.getItem(consoleToken)
const setConsoleToken = (e: string) => ls.setItem(consoleToken, e)
const clearConsoleToken = () => {
  ls.removeItem(oldConsoleToken)
  ls.removeItem(consoleToken)
}

// 跳转管理后台登录
const toConsoleLogin = () => {
  clearConsoleToken()
  const search = {
    redirect: window.location.href,
  }
  window.location.href = '/system/login/?' + qs.stringify(search)
}

// 获取管理后台登录cookie
const getConsoleCookie = () => Cookie.get(consoleToken)
const setConsoleCookie = (e: string) => Cookie.set(consoleToken, e)
const clearConsoleCookie = () => {
  Cookie.remove(oldConsoleToken)
  Cookie.remove(consoleToken)
}

const getConsoleLoginInfo = () => {
  const value = window.localStorage.getItem(consoleInfoToken)
  const oldValue = window.localStorage.getItem(oldConsoleInfoToken)
  const emptyObj = {}

  try {
    return value ? JSON.parse(value) : oldValue ? JSON.parse(oldValue) : emptyObj
  } catch (error) {
    return emptyObj
  }
}

export {
  getConsoleToken,
  setConsoleToken,
  clearConsoleToken,
  toConsoleLogin,
  getConsoleCookie,
  setConsoleCookie,
  clearConsoleCookie,
  getConsoleLoginInfo,
}
