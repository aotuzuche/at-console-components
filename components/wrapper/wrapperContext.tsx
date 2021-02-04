import { createContext, Dispatch, SetStateAction } from 'react'
import { IMenu } from '../utils/menusHandler'

const WrapperContext = createContext<{
  menus: IMenu[]
  initialMenus: IMenu[]
  title: string
  logOut: () => void
  backHome: () => void
  showHome: boolean
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
  setMenus: Dispatch<SetStateAction<IMenu[]>>
}>({
  menus: [],
  initialMenus: [],
  title: '',
  logOut: () => {},
  backHome: () => {},
  showHome: true,
  collapsed: false,
  setCollapsed: () => undefined,
  setMenus: () => undefined,
})

export default WrapperContext
