import { groupBy } from 'lodash'

export interface IMenu {
  icon?: string | null
  id: number
  name: string
  pid?: number
  url?: string | null
  children?: IMenu[]
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
function transformToMenusTree(
  menus: IMenu[],
  gruopMenus: { [key: number]: IMenu[] }
): IMenu[] {
  return menus.map((menu) => {
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
  const gruopMenus = groupBy(menus, (menu) => menu.pid)

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
export function getMenuPaths(menu: IMenu, menus: IMenu[]): IMenu[] {
  let result: IMenu[] = []

  // eslint-disable-next-line no-restricted-syntax
  for (const iMenu of menus) {
    if (iMenu.id === menu.id) {
      result = [iMenu]
      break
    }
    if (iMenu.children) {
      const findChildMenu = getMenuPaths(menu, iMenu.children)

      if (findChildMenu.length) {
        result = [iMenu].concat(findChildMenu)
      }
    }
  }

  return result
}
