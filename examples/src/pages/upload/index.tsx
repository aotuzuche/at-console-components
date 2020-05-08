import './style'
import React from 'react'
import Upload from '../../../../components/aliyunOSSUpload'
const Page = () => {
  return (
    <div className="page">
      <Upload
        value={[]}
        onChange={e => {
          console.log(e)
        }}
        ticket="test1"
      />
    </div>
  )
}

export default Page
