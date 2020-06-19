import React, { FC, useState, MouseEvent } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'

export interface AsyncButtonProps extends ButtonProps {
  loading?: boolean
  onClick?: (e: MouseEvent) => void | Promise<unknown>
}

const AsyncButton: FC<AsyncButtonProps> = ({
  loading: buttonLoading = false,
  onClick: buttonOnClick,
  ...props
}) => {
  const [loading, setLoading] = useState<boolean>(buttonLoading)

  const onClick = async (e: MouseEvent) => {
    try {
      if (typeof buttonOnClick !== 'function') {
        return
      }

      setLoading(true)
      await buttonOnClick(e)
    } finally {
      setLoading(false)
    }
  }

  return <Button loading={loading} onClick={onClick} {...props} />
}

export default AsyncButton
