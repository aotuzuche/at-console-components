import { Button, Drawer, Form as AntdForm, Space } from 'antd'
import { DrawerProps } from 'antd/lib/drawer'
import { Store } from 'antd/lib/form/interface'
import React, { FC, MouseEventHandler, useState } from 'react'
import Form, { FormProps } from '../form'
import { isFunc } from '../utils/is'

const { useForm } = AntdForm

export interface DrawerFormProps extends DrawerProps {
  formProps: FormProps
  /**
   * Trigger after form finish, return false can prevent Modal cancel
   */
  onOk?: (values: Store) => Promise<unknown> | false
  okText?: string // 提交文字
  onCancel?: () => void
  cancelText?: string // 取消的文字
  /**
   * Trigger before form finish, return reject can prevent form finish
   */
  onBeforeOk?: (values: Store) => Promise<unknown>
}

const DrawerForm: FC<DrawerFormProps> = ({ formProps, onOk, visible, onBeforeOk, ...props }) => {
  const [form] = useForm(formProps?.form)
  const [loading, setLoading] = useState(false)

  const onModalOk: MouseEventHandler = async () => {
    form.submit()
  }

  const onModalFormFinish = async (values: Store) => {
    try {
      setLoading(true)
      if (isFunc(onBeforeOk)) {
        await onBeforeOk(values)
      }
      let isNeedCloseWhenOnFinish = true
      const { onCancel } = props
      if (isFunc(formProps.onFinish)) {
        await formProps.onFinish(values)
      }
      if (isFunc(onOk)) {
        const result = await onOk(values)
        result === false && (isNeedCloseWhenOnFinish = result)
      }

      if (isNeedCloseWhenOnFinish && isFunc(onCancel)) {
        onCancel()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer
      visible={visible}
      destroyOnClose
      {...props}
      footer={
        <Space>
          {isFunc(props.onCancel) && (
            <Button onClick={props.onCancel} disabled={loading}>
              {props.cancelText || '取消'}
            </Button>
          )}
          {isFunc(onOk) && (
            <Button type="primary" onClick={onModalOk} loading={loading}>
              {props.okText || '提交'}
            </Button>
          )}
        </Space>
      }
    >
      <Form {...formProps} form={form} onFinish={onModalFormFinish} />
    </Drawer>
  )
}

export default DrawerForm
