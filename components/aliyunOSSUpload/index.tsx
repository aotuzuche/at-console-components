/* eslint-disable no-param-reassign */
import React from 'react'
import { Upload, message, Button } from 'antd'
import { Icon } from '@ant-design/compatible'
import { httpConsole } from 'auto-libs'

interface IProps {
  ticket: any
  value: any
  onChange: (params: any) => void
}

interface IState {
  OSSData: any
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
export default class AliyunOSSUpload extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      OSSData: {},
    }
  }

  async componentDidMount() {
    await this.init()
  }

  init = async () => {
    try {
      const { ticket } = this.props
      const OSSData = await httpConsole.get(ticket)

      this.setState({
        OSSData,
      })
    } catch (error) {
      message.error(error)
    }
  }

  onChange = (obj: any) => {
    const { onChange } = this.props
    const { fileList } = obj
    if (onChange) {
      onChange([...fileList])
    }
  }

  onRemove = (file: any) => {
    const { value, onChange } = this.props

    const files = value.filter((v: any) => v.url !== file.url)

    if (onChange) {
      onChange(files)
    }
  }

  transformFile = (file: any) => {
    const { OSSData } = this.state

    const suffix = file.name.slice(file.name.lastIndexOf('.'))
    const filename = Date.now() + suffix
    file.url = OSSData.dir + filename

    return file
  }

  getExtraData = (file: any) => {
    const { OSSData } = this.state

    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessId,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    }
  }

  beforeUpload = async () => {
    const { OSSData } = this.state
    const expire = OSSData.expire * 1000

    if (expire < Date.now()) {
      await this.init()
    }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, onChange, ticket, children, ...otherProps } = this.props
    const { OSSData } = this.state
    const props = {
      name: 'file',
      fileList: value,
      action: OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      transformFile: this.transformFile,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      ...otherProps,
    }
    return (
      <Upload {...props}>
        {children || (
          <Button>
            <Icon type="upload" /> 上传
          </Button>
        )}
      </Upload>
    )
  }
}
