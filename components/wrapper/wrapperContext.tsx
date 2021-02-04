import { createContext, Dispatch, SetStateAction } from 'react'
import { IMenu } from '../utils/menusHandler'

const WrapperContext = createContext<{
  menus: IMenu[]
  initialMenus: IMenu[]
  title: string
  loginUrl?: string
  homeUrl?: string
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
  setMenus: Dispatch<SetStateAction<IMenu[]>>
}>({
  menus: [],
  initialMenus: [],
  title: '',
  loginUrl: '',
  homeUrl: '',
  collapsed: false,
  setCollapsed: () => undefined,
  setMenus: () => undefined,
})

export default WrapperContext
