import React from 'react'
import { Upload, message, Button, Icon } from 'antd'
import { httpConsole } from 'auto-libs'

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
export default class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
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

  onChange = ({ fileList }) => {
    const { onChange } = this.props
    if (onChange) {
      onChange([...fileList])
    }
  }

  onRemove = file => {
    const { value, onChange } = this.props

    const files = value.filter(v => v.url !== file.url)

    if (onChange) {
      onChange(files)
    }
  }

  transformFile = file => {
    const { OSSData } = this.state

    const suffix = file.name.slice(file.name.lastIndexOf('.'))
    const filename = Date.now() + suffix
    file.url = OSSData.dir + filename

    return file
  }

  getExtraData = file => {
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
    return true
  }

  render() {
    const { value, onChange, ticket, children, ...otherProps } = this.props
    const props = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
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
