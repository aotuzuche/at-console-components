import { createContext, Dispatch, SetStateAction } from 'react'
import { IMenu } from '../utils/menusHandler'

const WrapperContext = createContext<{
  menus: IMenu[]
  title: string
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}>({
  menus: [],
  title: '',
  collapsed: false,
  setCollapsed: () => undefined,
})

export default WrapperContext
