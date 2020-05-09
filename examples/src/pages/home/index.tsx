import React from 'react'
import ModalTable from './modalTableDemo'
import ModalForm from './modalFormDemo'
import AsyncButton from '../../components/button'

const page = () => {
  const aysncButton = async () => {
    return new Promise(res => setTimeout(res, 3000))
  }

  return (
    <div className="page-home">
      <div style={{ margin: '20px' }}>
        <ModalTable />
      </div>

      <div style={{ margin: '20px' }}>
        <ModalForm />
      </div>

      <div style={{ margin: '20px' }}>
        <AsyncButton onClick={aysncButton}>异步按钮</AsyncButton>
      </div>
    </div>
  )
}

export default page
