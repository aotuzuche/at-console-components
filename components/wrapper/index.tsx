import React, { FC, useEffect } from 'react'
import { Spin, message, Breadcrumb } from 'antd'
import { httpConsole } from 'auto-libs'
import { useLocation, Link, matchPath } from 'react-router-dom'
import Aside from '../aside'
import useStates from '../hooks/useStates'
import { IMenu, getMenusTree, getMenuPaths } from '../utils/menusHandler'
import WrapperContext from './wrapperContext'

export interface WrapperProps {
  /**
   * System code
   */
  systemCode: string | IMenu[]
  title?: string
}

/**
 * App Wrapper
 */
const Wrapper: FC<WrapperProps> = ({
  title = '凹凸租车',
  systemCode,
  children,
}) => {
  const [state, setState] = useStates<{
    loading: boolean
    collapsed: boolean
    menus: IMenu[]
    initialMenus: IMenu[]
    breadcrumbs: IMenu[]
  }>({
    loading: true,
    collapsed: false,
    menus: [],
    breadcrumbs: [],
    initialMenus: [],
  })
  const localtion = useLocation()

  const init = async () => {
    try {
      setState({
        loading: true,
      })

      if (Array.isArray(systemCode)) {
        setState({
          menus: getMenusTree(systemCode),
          initialMenus: systemCode,
        })
      } else {
        const result: any = await httpConsole.get(
          `/apigateway/auth/console/auth/menu/${systemCode}`
        )

        setState({
          menus: getMenusTree(result?.list),
          initialMenus: result?.list,
        })
      }
    } catch (error) {
      message.error(error.msg || '初始菜单信息失败')
    } finally {
      setState({
        loading: false,
      })
    }
  }

  const getBreadcrumbs = () => {
    const matchMenu = state.initialMenus.find(
      (menus) =>
        menus.url &&
        matchPath(localtion.pathname, {
          path: menus.url,
          exact: true,
        })
    )
    if (matchMenu) {
      setState({
        breadcrumbs: getMenuPaths(matchMenu, state.menus),
      })
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    getBreadcrumbs()
  }, [localtion.pathname, state.menus])

  return (
    <WrapperContext.Provider
      value={{
        menus: state.menus,
        title,
      }}
    >
      <Spin spinning={state.loading} wrapperClassName="at-cc-wrapper">
        <div className="at-cc-wrapper-container">
          <Aside />
          <div className="at-cc-wrapper-breadcrumbs">
            {state.breadcrumbs?.length !== 0 && (
              <Breadcrumb className="at-cc-wrapper-breadcrumbs-content">
                {state.breadcrumbs.map(({ url, name }, index) => (
                  <Breadcrumb.Item>
                    {index === state.breadcrumbs.length - 1 || !url ? (
                      name
                    ) : (
                      <Link to={url}>{name}</Link>
                    )}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            )}
            <main className="at-cc-wrapper-body">{children}</main>
          </div>
        </div>
      </Spin>
    </WrapperContext.Provider>
  )
}

export default Wrapper
