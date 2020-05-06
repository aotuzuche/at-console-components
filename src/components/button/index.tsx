import React, { useState } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
interface IProps {
  children: any
  onClick: () => void
}

export default function ATButton(props: IProps & ButtonProps) {
  const { children, onClick: atOnClick, ...otherProps } = props
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    try {
      setLoading(true)
      atOnClick && (await atOnClick())
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button loading={loading} onClick={onClick} {...otherProps}>
      {children}
    </Button>
  )
}
