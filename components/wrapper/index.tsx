import React, { FC, useEffect, useState } from 'react'
import { message, Breadcrumb, Skeleton } from 'antd'
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
  const [collapsed, setCollapsed] = useState(false)

  const init = async () => {
    try {
      setState({
        loading: true,
      })

      // micro frontend menu config
      if (Array.isArray(systemCode)) {
        setState({
          menus: systemCode,
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
    const breadcrumbs = matchMenu ? getMenuPaths(matchMenu, state.menus) : []
    setState({
      breadcrumbs,
    })
  }

  useEffect(() => {
    init()
  }, [systemCode])

  useEffect(() => {
    getBreadcrumbs()
  }, [localtion.pathname, state.menus])

  return (
    <WrapperContext.Provider
      value={{
        menus: state.menus,
        title,
        collapsed,
        setCollapsed,
      }}
    >
      <Skeleton loading={state.loading}>
        <div
          className="at-cc-wrapper"
          style={{
            paddingLeft: collapsed ? 80 : 256,
          }}
        >
          <Aside breadcrumbs={state.breadcrumbs} />
          <div className="at-cc-wrapper-main">
            {state.breadcrumbs?.length !== 0 && (
              <Breadcrumb className="at-cc-wrapper-breadcrumbs">
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
      </Skeleton>
    </WrapperContext.Provider>
  )
}

export default Wrapper
