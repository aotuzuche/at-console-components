import axios, { AxiosError, AxiosResponse } from 'axios'
import Cookie from 'js-cookie'
import { clearConsoleCookie, clearConsoleToken, getConsoleToken, toConsoleLogin } from './token'

export type ToLoginType = ((config?: AxiosResponse) => boolean) | undefined
let toLogin: ToLoginType

interface HttpConfig {
  resCode?: string
  resMsg?: string
  data?: any
}

class HttpError extends Error {
  msg: string
  name = 'HttpError'
  data: any
  code = '0'
  constructor(message: string, data?: HttpConfig) {
    super(message)

    this.msg = message
    if (data) {
      this.data = data ? (data.data ? data.data : data) : null
      this.code = data.resCode || ''
    }
  }

  toString() {
    return this.message
  }
}

export interface HttpConsoleExtendParams {
  /**
   * return true 不执行下一步
   */
  toLogin: ToLoginType
}

export function httpConsoleExtend(params: HttpConsoleExtendParams) {
  const { toLogin: initialToLogin } = params || {}

  if (initialToLogin) {
    toLogin = initialToLogin
  }
}

/**
 * 配置axios
 */

const httpConsole = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/json;version=3.0;compress=false',
    'Content-Type': 'application/json;charset=utf-8',
  },
  data: {},
})

/**
 * 请求拦截器，在发起请求之前
 */
httpConsole.interceptors.request.use(config => {
  const token = getConsoleToken()
  const utmSource = Cookie.get('utm_source')
  const utmMedium = Cookie.get('utm_medium')
  const utmCampaign = Cookie.get('utm_campaign')
  const utmTerm = Cookie.get('utm_term')

  const method = (config.method as string).toLocaleLowerCase()
  if (token) {
    config.headers.Authorization = token
  }
  if (method === 'get') {
    if (typeof config.params !== 'object') {
      config.params = {}
    }

    // 兼容appserver的接口，appserver的接口token需要带在参数中，post请求也是一样
    if (token) {
      config.params.token = token
    }
    if (utmSource) {
      config.params.utmSource = utmSource
    }
    if (utmMedium) {
      config.params.utmMedium = utmMedium
    }
    if (utmCampaign) {
      config.params.utmCampaign = utmCampaign
    }
    if (utmTerm) {
      config.params.utmTerm = utmTerm
    }

    config.params.requestId = Number(new Date())
  }

  const methods: string[] = ['post', 'put', 'patch', 'delete']
  if (methods.indexOf(method) > -1 && typeof config.data !== 'string') {
    if (token) {
      config.data.token = token
    }
    if (utmSource) {
      config.data.utmSource = utmSource
    }
    if (utmMedium) {
      config.data.utmMedium = utmMedium
    }
    if (utmCampaign) {
      config.data.utmCampaign = utmCampaign
    }
    if (utmTerm) {
      config.data.utmTerm = utmTerm
    }
    config.data.requestId = Number(new Date())
  }

  ;(config as any).____t = new Date().valueOf()

  return config
})

/**
 * 接口响应拦截器，在接口响应之后
 */
httpConsole.interceptors.response.use(
  config => {
    let strictModel = true // 严格模式
    const data = config.data || {}

    if (toLogin && toLogin(config) === true) {
      return
    }

    // 目前的判断方式：因为resCode与resMsg是java端必给的字段，所以认为没有该两个字段时，走标准的http status模式
    if (typeof data.resCode !== 'undefined' && typeof data.resMsg !== 'undefined') {
      strictModel = false
    }

    if (strictModel) {
      if (config.status >= 200 && config.status < 300) {
        return data
      } else {
        if (config.status === 401) {
          clearConsoleCookie()
          clearConsoleToken()
          toConsoleLogin()
          return false
        }

        return Promise.reject(new HttpError(data.message || '', data))
      }
    }

    // atcz java端的模式

    // 响应正常
    if (data.resCode === '000000') {
      return data.data
    }
    // 需要登录（没登录或登录过期）
    else if (data.resCode === '200008') {
      clearConsoleCookie()
      clearConsoleToken()
      toConsoleLogin()
      return false
    }

    // reject错误处理
    return Promise.reject(new HttpError(data.resMsg || data.msg || data.message, data))
  },
  (error: AxiosError) => {
    console.error('http:reject', error)

    if (toLogin && toLogin(error.response) === true) {
      return
    }

    if (error.response && error.response.status === 401) {
      clearConsoleCookie()
      clearConsoleToken()
      toConsoleLogin()
      return false
    }

    // reject错误处理
    const { data } = error.response || {}

    // @ts-ignore
    const { message = '系统错误', msg, resMsg } = data || {}
    return Promise.reject(new HttpError(resMsg || msg || message))
  },
)

export default httpConsole
