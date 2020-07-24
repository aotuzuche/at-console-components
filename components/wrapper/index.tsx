import React, { FC, useEffect } from 'react'
import { Spin, message, Breadcrumb } from 'antd'
import { httpConsole } from 'auto-libs'
import { css } from 'linaria'
import { useLocation, Link, matchPath } from 'react-router-dom'
import Aside from '../aside'
import useStates from '../hooks/useStates'
import { IMenu, getMenusTree, getMenuPaths } from '../utils/menusHandler'
import WrapperContext from './wrapperContext'
import styles from '../styles'

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
        matchPath('/dispatch/ordinary/:orderNo', {
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
      <Spin
        spinning={state.loading}
        wrapperClassName={css`
          height: 100%;
          .ant-spin-container {
            height: 100%;
          }
        `}
      >
        <div
          className={css`
            display: flex;
            height: 100%;
          `}
        >
          <Aside />
          <div
            className={css`
              overflow-y: scroll;
              overflow-x: hidden;
              padding: 0px ${styles.padding} ${styles.padding} 32px;
              min-width: 575px;
            `}
          >
            {state.breadcrumbs?.length !== 0 && (
              <Breadcrumb
                className={css`
                  height: 60px;
                  padding: 0 ${styles.padding} 0 32px;
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                  box-shadow: 0 1px 2px 0 rgba(9, 30, 66, 0.25);
                  margin: 0 -${styles.padding} 0 -32px;
                `}
              >
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
            <main
              className={css`
                margin-top: 12px;
              `}
            >
              {children}
            </main>
          </div>
        </div>
      </Spin>
    </WrapperContext.Provider>
  )
}

export default Wrapper
