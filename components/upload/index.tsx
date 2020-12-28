/* eslint-disable no-param-reassign */
import React, { FC, useEffect, useState } from 'react'
import { Upload as AntdUpload, message, Button } from 'antd'
import { httpConsole } from 'auto-libs'
import { UploadOutlined } from '@ant-design/icons'
import { UploadProps as AntdUploadProps } from 'antd/lib/upload'

export interface UploadProps extends AntdUploadProps {
  ticket: string
  value?: any
  onChange?: (params: any) => void
  max?: number
}

export interface IOssData {
  accessId: string
  policy: string
  signature: string
  dir: string
  host: string
  expire: number
}

/**
 * Aliyun OSS 上传组件
 * 基于 https://ant.design/components/upload-cn 二次封装
 *
 * @export
 * @class AliyunOSSUpload
 * @extends {React.Component}
 *
 * @prop {File[]} value 受控的 FileList
 * @prop {(value) => void} onChange FileList 变化的监听事件
 * @prop {string} ticket 获取上传信息的 API
 * 返回格式
 * {
      dir: 'user-dir/',
      expire: '1577811661',
      host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
      accessId: 'c2hhb2RhaG9uZw==',
      policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
      signature: 'ZGFob25nc2hhbw==',
    }
 */
const Upload: FC<UploadProps> = ({
  ticket,
  max = -1,
  value,
  onChange: onInitialOnChange,
  children,
  ...otherProps
}) => {
  const [OSSData, setOssData] = useState<IOssData>({
    accessId: '',
    policy: '',
    signature: '',
    dir: '',
    host: '',
    expire: 0,
  })

  const init = async () => {
    try {
      if (!ticket) {
        return
      }
      const result = await httpConsole.get(ticket)

      setOssData((result as unknown) as IOssData)
    } catch (error) {
      message.error(error.msg || error.message)
    }
  }

  useEffect(() => {
    init()
  }, [ticket])

  const onChange = (obj: any) => {
    const { fileList } = obj
    if (onInitialOnChange) {
      onInitialOnChange([...fileList])
    }
  }

  const onRemove = (file: any) => {
    const files = value.filter((v: any) => v.url !== file.url)
    if (onInitialOnChange) {
      onInitialOnChange(files)
    }
  }

  const transformFile = (file: any) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'))
    const filename = Date.now() + suffix
    file.url = OSSData.dir + filename
    return file
  }

  const getExtraData = (file: any) => ({
    key: file.url,
    OSSAccessKeyId: OSSData.accessId,
    policy: OSSData.policy,
    Signature: OSSData.signature,
  })

  const beforeUpload = async () => {
    const expire = OSSData.expire * 1000
    if (expire < Date.now()) {
      await init()
    }
  }

  const props = {
    name: 'file',
    fileList: value,
    action: OSSData.host,
    onChange,
    onRemove,
    transformFile,
    data: getExtraData,
    beforeUpload,
    ...otherProps,
  }

  return (
    <AntdUpload {...props}>
      {value?.length === max
        ? null
        : children || (
            <Button>
              <UploadOutlined /> 上传
            </Button>
          )}
    </AntdUpload>
  )
}

export default Upload
