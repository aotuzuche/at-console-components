import { groupBy } from 'lodash'

export interface IMenu {
  icon: string | null
  id: number
  name: string
  pid: number
  systemId: number
  url: string | null
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
