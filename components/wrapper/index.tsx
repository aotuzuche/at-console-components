import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { message, Breadcrumb, Skeleton } from 'antd'
import { httpConsole } from 'auto-libs'
import { useLocation, Link } from 'react-router-dom'
import Aside from '../aside'
import useStates from '../hooks/useStates'
import { IMenu, getMenusTree, getMenuPaths } from '../utils/menusHandler'
import WrapperContext from './wrapperContext'
import { isFunc } from '../utils/is'

export interface WrapperProps {
  /**
   * System code
   */
  systemCode: string | IMenu[] | (() => Promise<IMenu[]>)
  title?: string
  hasRemoteRoutes: boolean
  showMenuSearch?: boolean
  logOut?: () => void
  backHome?: () => void
  showHome?: boolean
}

/**
 * App Wrapper
 */
const Wrapper: FC<WrapperProps> = ({
  title = '凹凸租车',
  systemCode,
  children,
  showMenuSearch,
  logOut,
  backHome,
  hasRemoteRoutes = false,
  showHome = true,
}) => {
  const [state, setState] = useStates<{
    loading: boolean
    collapsed: boolean
    initialMenus: IMenu[]
    breadcrumbs: IMenu[]
  }>({
    loading: true,
    collapsed: false,
    breadcrumbs: [],
    initialMenus: [],
  })
  const localtion = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [menus, setMenus] = useState<IMenu[]>([])

  const init = async () => {
    try {
      setState({
        loading: true,
      })

      // micro frontend menu config
      if (Array.isArray(systemCode)) {
        setMenus(systemCode)
        setState({
          initialMenus: systemCode,
        })
      } else if (isFunc(systemCode)) {
        const result = await systemCode()
        setMenus(result)
        setState({
          initialMenus: result,
        })
      } else {
        const result: any = await httpConsole.get(
          `/apigateway/auth/console/auth/menu/${systemCode}`,
        )

        setMenus(getMenusTree(result?.list))

        setState({
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
    const breadcrumbs = getMenuPaths(localtion.pathname, menus) || []
    setState({
      breadcrumbs,
    })
  }

  useEffect(() => {
    init()
  }, [systemCode])

  useEffect(() => {
    getBreadcrumbs()
  }, [localtion.pathname, menus])

  useLayoutEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <WrapperContext.Provider
      value={{
        menus,
        title,
        collapsed,
        setCollapsed,
        setMenus,
        initialMenus: state.initialMenus,
        logOut,
        backHome,
        showHome,
      }}
    >
      <Skeleton loading={state.loading}>
        <div
          className={isLoaded ? 'at-cc-wrapper at-cc-wrapper-animation' : 'at-cc-wrapper'}
          style={{
            paddingLeft: collapsed ? 80 : 256,
          }}
        >
          <Aside breadcrumbs={state.breadcrumbs} showSearch={showMenuSearch} />
          <div className="at-cc-wrapper-main">
            {state.breadcrumbs?.length !== 0 && (
              <Breadcrumb className="at-cc-wrapper-breadcrumbs">
                {state.breadcrumbs.map(({ url, name }, index) => (
                  <Breadcrumb.Item key={index}>
                    {index === state.breadcrumbs.length - 1 || !url ? (
                      name
                    ) : (
                      <Link to={url}>{name}</Link>
                    )}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            )}
            <main className="at-cc-wrapper-body">
              {hasRemoteRoutes ? (
                children
              ) : (
                <>
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                </>
              )}
            </main>
          </div>
        </div>
      </Skeleton>
    </WrapperContext.Provider>
  )
}

export default Wrapper
