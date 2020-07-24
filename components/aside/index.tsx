import React, { useContext, useMemo, useState, useEffect } from 'react'
import { Menu } from 'antd'
import { FolderOutlined, FileOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Icon from '@ant-design/compatible/lib/icon'
import { css } from 'linaria'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import WrapperContext from '../wrapper/wrapperContext'
import { IMenu, isHiddenedMenu } from '../utils/menusHandler'
import Border from './border'
import Footer from './footer'
import Logo from './logo'
import styles from '../styles'

const Aside = () => {
  const { menus, title } = useContext(WrapperContext)
  const [collapsed, setCollapsed] = useState(false)
  const screens = useBreakpoint()

  useEffect(() => {
    if (screens.lg === false) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [screens])

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

  const onSetCollapsed = () => {
    setCollapsed((value) => !value)
  }

  return (
    <div
      className={css`
        position: relative;
        transition: width 0.3s ${styles.cubicClose} 0s;
        height: 100%;
        flex-shrink: 0;
      `}
      style={{
        width: collapsed ? 80 : 256,
      }}
    >
      <Logo title={title} />
      <Border onClick={onSetCollapsed} collapsed={collapsed} />
      <div
        className={css`
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          bottom: 80px;
          overflow-x: hidden;
          overflow-y: auto;
        `}
      >
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          className={css`
            border: none;
          `}
        >
          {renderMenusTree}
        </Menu>
      </div>
      <Footer collapsed={collapsed} />
    </div>
  )
}

export default Aside
