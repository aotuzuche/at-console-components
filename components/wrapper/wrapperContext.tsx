import { createContext } from 'react'
import { IMenu } from '../utils/menusHandler'

const WrapperContext = createContext<{
  menus: IMenu[]
  title: string
}>({
  menus: [],
  title: '',
})

export default WrapperContext
