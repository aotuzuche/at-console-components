import './style'
import React from 'react'
import DevLogin from '../../../../components/_devLogin'
import { withRouter } from 'react-router-dom'
const Page = (props: any) => {
  return (
    <div className="page">
      <DevLogin history={props.history} />
    </div>
  )
}

export default withRouter(Page)
