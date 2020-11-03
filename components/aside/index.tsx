import React, { useContext, useMemo, useState, useEffect, FC } from 'react'
import { Menu } from 'antd'
import { FolderOutlined, FileOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Icon from '@ant-design/compatible/lib/icon'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { OpenEventHandler, SelectEventHandler } from 'rc-menu/lib/interface'
import { isEqual } from 'lodash'
import WrapperContext from '../wrapper/wrapperContext'
import { IMenu, isHiddenedMenu } from '../utils/menusHandler'
import Footer from './footer'
import Logo from './logo'
import { isCanUseWindow } from '../utils/is'

const Aside: FC<{
  breadcrumbs: IMenu[]
}> = ({ breadcrumbs }) => {
  const { menus, title, collapsed, setCollapsed } = useContext(WrapperContext)
  const screens = useBreakpoint()
  const [openKeys, setOpenKeys] = useState<React.Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>()

  useEffect(() => {
    if (screens.lg === false) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [screens])

  useEffect(() => {
    const len = breadcrumbs.length
    // If last one hidden,should be take the previou
    const lastBreadcrumbIndex = isHiddenedMenu(breadcrumbs[len - 1]?.icon)
      ? -2
      : -1
    const lastBreadcrumb = breadcrumbs.slice(lastBreadcrumbIndex)[0]
    const defaultOpenKeys: string[] =
      len > 1
        ? breadcrumbs
            .slice(0, len - 1)
            .map((breadcrumb) => String(breadcrumb.id))
        : []
    const defaultSelectedKeys: string[] = lastBreadcrumb
      ? [String(lastBreadcrumb.id)]
      : []

    if (!isEqual(defaultOpenKeys, openKeys)) {
      setOpenKeys(defaultOpenKeys)
    }

    if (!isEqual(defaultSelectedKeys, selectedKeys)) {
      setSelectedKeys(defaultSelectedKeys)
    }

    if (isCanUseWindow()) {
      setTimeout(() => {
        const activeMenu = document.querySelector(
          '.at-cc-aside .ant-menu-submenu-selected'
        )

        if (activeMenu && (activeMenu as any).scrollIntoViewIfNeeded) {
          ;(activeMenu as any).scrollIntoViewIfNeeded()
        }
      }, 0)
    }
  }, [breadcrumbs])

  const renderMenusTree = useMemo(() => {
    const isSubmenu = (menu?: IMenu[]) => {
      return menu?.length && menu.every(({ icon }) => !isHiddenedMenu(icon))
    }

    const flatChildren = (childrenMenes?: IMenu[], isChildren?: boolean) => {
      if (!childrenMenes) {
        return null
      }

      return childrenMenes
        .map(({ icon, name, id, url, children }) => {
          if (isHiddenedMenu(icon)) return null

          const subMenuIcon = icon ? <Icon type={icon} /> : <FolderOutlined />
          const menuIcon = icon ? <Icon type={icon} /> : <FileOutlined />

          return isSubmenu(children) ? (
            <Menu.SubMenu
              title={name}
              key={id}
              icon={isChildren ? undefined : subMenuIcon}
            >
              {flatChildren(children, true)}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={id} icon={isChildren ? undefined : menuIcon}>
              {url ? <Link to={url}>{name}</Link> : name}
            </Menu.Item>
          )
        })
        .filter(Boolean)
    }

    return flatChildren(menus)
  }, [menus])

  const onOpenChange = (keys: React.Key[]) => {
    setOpenKeys(keys)
  }

  const onSelect: SelectEventHandler = ({ selectedKeys: keys }) => {
    setSelectedKeys(keys)
  }

  return (
    <div
      className="at-cc-aside"
      style={{
        width: collapsed ? 80 : 256,
      }}
    >
      <div className="at-cc-aside-body">
        <Logo title={title} />
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          style={{
            border: 'none',
          }}
          onOpenChange={onOpenChange as OpenEventHandler}
          openKeys={openKeys as string[]}
          onSelect={onSelect as SelectEventHandler}
          selectedKeys={selectedKeys as string[]}
        >
          {renderMenusTree}
        </Menu>
      </div>
      <Footer collapsed={collapsed} />
    </div>
  )
}

export default Aside
