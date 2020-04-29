import React from 'react'
import { httpConsole, cdn } from 'auto-libs'
import './style'
import { message, Popconfirm, Icon, Button } from 'antd'
import classnames from 'classnames'

/*
 * 参数 signApi 获取上传签名的地址
 * value 图片地址
 * onChange 上传完成后的callback
 * thumb 是否显示缩略图
 * thumbAddon function,返回一个组件 缩略图位置的扩展
 */
class Upload extends React.PureComponent {
  getSign = async () => {
    try {
      // 处理接口与请求方式
      let api = this.props.signApi
      if (!api) {
        message.error('请配置signApi地址')
        return
      }
      let method = 'get'
      if (api.indexOf(':') !== -1) {
        const v = api.split(':')
        api = v[1]
        method = v[0]
      }

      let res = await httpConsole.request({
        url: api,
        method: method,
      })

      // 接口有可能给string格式的json串，转为真的json
      if (typeof res === 'string') {
        res = JSON.parse(res)
      }

      return res
    } catch (e) {
      message.error('获取上传签名失败')
    }
  }

  // 文件变动handler
  fileChange = async e => {
    const [file] = e.target.files

    if (!file.type.match('image.*')) {
      this.props.onError({
        msg: '图片格式不正确',
      })
    }

    const oldName = file.name
    const suffix = oldName.slice(oldName.lastIndexOf('.'))
    const filename = Date.now() + suffix

    try {
      const sign = await this.getSign()
      if (sign) {
        const form = this.createForm(filename, file, sign)
        const { host, dir } = sign
        const xhr = new XMLHttpRequest()

        xhr.addEventListener('load', e => {
          if (xhr.status === 204) {
            this.props.onChange(dir + filename)
            this.filebtn.value = '' // 重置上传插件的value值，以便于可以重复上传同张同片而不会没有反应
          } else {
            message.error('上传失败')
          }
        })
        xhr.open('post', host)
        xhr.send(form)
      } else {
        message.error('获取上传签名失败')
      }
    } catch (e) {
      message.error(e.msg || '系统错误')
    }
  }

  // 生成dataForm
  createForm = (filename, file, sign) => {
    const fileForm = new FormData()

    fileForm.append('key', sign.dir + filename)
    fileForm.append('OSSAccessKeyId', sign['accessId'])
    fileForm.append('policy', sign['policy'])
    fileForm.append('Signature', sign['signature'])
    fileForm.append('file', file)

    return fileForm
  }

  onDel = e => {
    this.props.onChange('')
  }

  onUpload = e => {
    if (this.filebtn) {
      this.filebtn.click()
    } else {
      message.error('上传组件加载失败')
    }
  }

  render() {
    const css = classnames('auto-imgupload', this.props.className)

    return (
      <div className={css}>
        {this.props.thumb !== false ? (
          <div className="auto-imgupload__thumb">
            {this.props.value ? (
              <div
                className="auto-imgupload__img"
                style={{ backgroundImage: `url(${cdn + '/' + this.props.value})` }}
              >
                <Popconfirm okText="是" cancelText="否" title="确认删除吗？" onConfirm={this.onDel}>
                  <a href="javascript:;">删除</a>
                </Popconfirm>
                {this.props.thumbAddon && this.props.thumbAddon()}
              </div>
            ) : (
              <p>请上传图片</p>
            )}
          </div>
        ) : null}
        <Button onClick={this.onUpload}>
          <Icon type="cloud-upload-o" />
          上传图片
        </Button>
        <input
          ref={e => {
            this.filebtn = e
          }}
          className="auto-imgupload__file-button"
          type="file"
          accept="image/*"
          onChange={this.fileChange}
        />
      </div>
    )
  }
}

export default Upload
