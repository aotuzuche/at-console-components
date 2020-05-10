import './style'
import React from 'react'
import { Upload } from '../../../../components/index'

const Page = () => {
  return (
    <div className="page">
      <Upload
        value={[]}
        onChange={(e: any) => {
          console.log(e)
        }}
        ticket="test1"
      />
    </div>
  )
}

export default Page
