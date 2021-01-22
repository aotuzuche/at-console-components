import { groupBy } from 'lodash'
import { matchPath } from 'react-router-dom'

export interface IMenu {
  icon?: string | null
  id: number
  name: string
  pid?: number
  url?: string
  children?: IMenu[]
  systemId?: number
  code?: string
  isMfe?: boolean
  isEmpty?: boolean
}

/**
 * {
 * 0: IMenu[],
 * 1: IMenu
 * }
 *
 * To
 *
 * [
 * {..., children: IMenu:[]},
 * {..., children: IMenu:[]}
 * ]
 */
function transformToMenusTree(menus: IMenu[], gruopMenus: { [key: number]: IMenu[] }): IMenu[] {
  return menus.map(menu => {
    if (gruopMenus[menu.id]) {
      return {
        ...menu,
        children: transformToMenusTree(gruopMenus[menu.id], gruopMenus),
      }
    }
    return menu
  })
}

export function getMenusTree(menus: IMenu[]) {
  if (!menus?.length) {
    return []
  }
  const gruopMenus = groupBy(menus, menu => menu.pid)

  return transformToMenusTree(gruopMenus[0], gruopMenus)
}

export function isHiddenedMenu(icon: any) {
  return ['false', false, 0, '0'].includes(icon as string)
}

/**
 * [ IMenu, IMenu, { children: [ IMenu, IMenu, { children: IMenu[] } ] } ]
 *
 * ->>>>>>>>
 *
 * [ IMenu, IMenu, IMenu ]
 *
 */
export function getMenuPaths(pathname: string, menus: IMenu[]): IMenu[] {
  let result: IMenu[] = []

  // eslint-disable-next-line no-restricted-syntax
  for (const iMenu of menus) {
    if (
      matchPath(pathname, {
        path: iMenu.url,
        exact: true,
      })
    ) {
      result = [iMenu]
      break
    }
    if (iMenu.children) {
      const findChildMenu = getMenuPaths(pathname, iMenu.children)

      if (findChildMenu.length) {
        result = [iMenu].concat(findChildMenu)
      }
    }
  }

  return result
}

export function filterMenusByKeyword(
  menus: IMenu[],
  keyword: string,
  openKeys: string[] = [],
): { filteredMenus: IMenu[]; filteredOpenKeys: string[] } {
  const filteredOpenKeys: string[] = openKeys

  const filteredMenus = menus?.filter(({ name, children, id, icon }) => {
    // eslint-disable-next-line no-nested-ternary
    let isInclude = true

    if (isHiddenedMenu(icon)) {
      isInclude = false
    } else {
      // eslint-disable-next-line no-nested-ternary
      isInclude = new RegExp(keyword, 'i').test(name)
        ? true
        : children?.length
        ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
          !!filterMenusByKeyword(children, keyword, filteredOpenKeys).filteredMenus.length
        : false
    }

    isInclude && filteredOpenKeys.push(String(id))

    return isInclude
  })

  return { filteredMenus, filteredOpenKeys }
}
