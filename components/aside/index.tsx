import React, { useContext, useMemo, useState, useEffect, FC } from 'react'
import { Input, Menu } from 'antd'
import { FolderOutlined, FileOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Icon from '@ant-design/compatible/lib/icon'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { OpenEventHandler, SelectEventHandler } from 'rc-menu/lib/interface'
import { isEqual } from 'lodash'
import WrapperContext from '../wrapper/wrapperContext'
import { filterMenusByKeyword, IMenu, isHiddenedMenu } from '../utils/menusHandler'
import Footer from './footer'
import Logo from './logo'
import { isCanUseWindow } from '../utils/is'

interface AsideProps {
  breadcrumbs: IMenu[]
  showSearch?: boolean
}

const Aside: FC<AsideProps> = ({ breadcrumbs, showSearch }) => {
  const {
    menus,
    title,
    collapsed,
    setCollapsed,
    initialMenus,
    setMenus,
    loginUrl,
    homeUrl,
  } = useContext(WrapperContext)
  const screens = useBreakpoint()
  const [openKeys, setOpenKeys] = useState<React.Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (screens.lg === false) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [screens])

  const setIfChangeCollapsed = () => {
    const len = breadcrumbs.length
    const defaultOpenKeys: string[] =
      len > 1 ? breadcrumbs.slice(0, len - 1).map(breadcrumb => String(breadcrumb.id)) : []

    setOpenKeys(defaultOpenKeys)
  }

  useEffect(() => {
    const len = breadcrumbs.length
    // If last one hidden,should be take the previou
    const lastBreadcrumbIndex = isHiddenedMenu(breadcrumbs[len - 1]?.icon) ? -2 : -1
    const lastBreadcrumb = breadcrumbs.slice(lastBreadcrumbIndex)[0]
    const defaultOpenKeys: string[] =
      len > 1 ? breadcrumbs.slice(0, len - 1).map(breadcrumb => String(breadcrumb.id)) : []
    const defaultSelectedKeys: string[] = lastBreadcrumb ? [String(lastBreadcrumb.id)] : []

    if (!isEqual(defaultOpenKeys, openKeys) && !searchValue) {
      setOpenKeys(defaultOpenKeys)
    }

    if (!isEqual(defaultSelectedKeys, selectedKeys)) {
      setSelectedKeys(defaultSelectedKeys)
    }

    if (isCanUseWindow()) {
      setTimeout(() => {
        const activeMenu = document.querySelector('.at-cc-aside .ant-menu-submenu-selected')

        if (activeMenu && (activeMenu as any).scrollIntoViewIfNeeded) {
          ;(activeMenu as any).scrollIntoViewIfNeeded()
        }
      }, 0)
    }
  }, [breadcrumbs])

  const renderMenusTree = useMemo(() => {
    const isSubmenu = (menu?: IMenu[]) =>
      menu?.length && menu.every(({ icon }) => !isHiddenedMenu(icon))

    const flatChildren = (childrenMenes?: IMenu[], isChildren?: boolean) => {
      if (!childrenMenes) {
        return null
      }

      return childrenMenes
        .map(currentMenu => {
          const { icon, name, id, url, children, isMfe = true } = currentMenu
          if (isHiddenedMenu(icon)) {
            return null
          }

          const isSubmeuFlag = isSubmenu(children)

          const subMenuIcon = icon ? <Icon type={icon} /> : <FolderOutlined />
          const menuIcon = icon ? <Icon type={icon} /> : <FileOutlined />
          const highlightName = searchValue ? (
            <span
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: name.replace(
                  new RegExp(searchValue, 'i'),
                  '<span class="at-cc-aside-item-highlight">$&</span>',
                ),
              }}
            />
          ) : (
            name
          )
          const AnchorCom =
            url && isMfe ? (
              <Link to={url}>{highlightName}</Link>
            ) : (
              <a href={`/system${url}`} target="_blank" rel="noreferrer">
                {highlightName}
              </a>
            )
          const menuItem = url ? AnchorCom : highlightName

          if (isSubmeuFlag) {
            return (
              <Menu.SubMenu
                title={highlightName}
                key={id}
                icon={isChildren ? undefined : subMenuIcon}
              >
                {flatChildren(children, true)}
              </Menu.SubMenu>
            )
          }
          return (
            <Menu.Item key={id} icon={isChildren ? undefined : menuIcon}>
              {menuItem}
            </Menu.Item>
          )
        })
        .filter(Boolean)
    }

    return flatChildren(menus)
  }, [menus, searchValue])

  const onOpenChange = (keys: React.Key[]) => {
    setOpenKeys(keys)
  }

  const onSelect: SelectEventHandler = ({ selectedKeys: keys }) => {
    setSelectedKeys(keys)
  }

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setSearchValue(value)

    if (!value) {
      setMenus(initialMenus)
      return
    }
    const { filteredMenus, filteredOpenKeys } = filterMenusByKeyword(initialMenus, value)

    setMenus(filteredMenus)
    setOpenKeys(filteredOpenKeys)
  }

  useEffect(() => {
    if (!collapsed) {
      setIfChangeCollapsed()
    }
  }, [collapsed])

  return (
    <div
      className="at-cc-aside"
      style={{
        width: collapsed ? 80 : 256,
      }}
    >
      <div className="at-cc-aside-body">
        <Logo title={title} />
        {showSearch && (
          <div className="at-cc-aside-search">
            <Input allowClear placeholder="请输入......" onChange={onSearch} />
          </div>
        )}
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
      <Footer collapsed={collapsed} loginUrl={loginUrl} homeUrl={homeUrl} />
    </div>
  )
}

export default Aside
