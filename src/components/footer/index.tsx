import React, { PureComponent } from 'react'
import './style.scss'

import { Layout } from 'antd'

const { Footer } = Layout

class FooterView extends PureComponent {
  render() {
    return <Footer className="footer">Created By Atzuche</Footer>
  }
}

export default FooterView
