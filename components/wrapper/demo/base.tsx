import React from 'react'
import { Wrapper } from 'at-console-components'
import { IMenu } from 'at-console-components/lib/utils/menusHandler'
import Table from '../../table/demo/base'

const list: IMenu[] = [
  {
    id: 382,
    name: '调度管理',
    icon: 'car',
    url: '',
    pid: 0,
    systemId: 37,
  },
  {
    id: 383,
    name: '调度-普通订单',
    icon: 'car',
    url: '/dispatch/ordinary',
    pid: 382,
    systemId: 37,
  },
  {
    id: 384,
    name: '调度处理',
    icon: 'false',
    url: '/dispatch/ordinary/:orderNo',
    pid: 383,
    systemId: 37,
  },
  {
    id: 385,
    name: '订单管理',
    icon: 'car',
    url: '',
    pid: 0,
    systemId: 37,
  },
  {
    id: 386,
    name: '订单-普通订单',
    icon: 'car',
    url: '/order/ordinary',
    pid: 385,
    systemId: 37,
  },
  {
    id: 387,
    name: '订单详情',
    icon: 'false',
    url: '/order/ordinary/detail/:tab/:orderNo',
    pid: 386,
    systemId: 37,
  },
  {
    id: 388,
    name: '订单照片',
    icon: 'false',
    url: '/order/ordinary/photo/:orderNo',
    pid: 386,
    systemId: 37,
  },
  {
    id: 389,
    name: '审核管理',
    icon: 'check',
    url: '',
    pid: 0,
    systemId: 37,
  },
  {
    id: 390,
    name: '订单审核',
    icon: '',
    url: '/riskCheck/order',
    pid: 389,
    systemId: 37,
  },
  {
    id: 391,
    name: '订单审核详情',
    icon: 'false',
    url: '/riskCheck/order/detail/:tab/:memNo/:orderNo',
    pid: 390,
    systemId: 37,
  },
  {
    id: 392,
    name: '延时审核详情',
    icon: 'false',
    url: '/riskCheck/order/delayAuditDetail/:memNo/:orderNo',
    pid: 390,
    systemId: 37,
  },
  {
    id: 393,
    name: '用户审核',
    icon: '',
    url: '/riskCheck/user',
    pid: 389,
    systemId: 37,
  },
  {
    id: 394,
    name: '用户审核详情',
    icon: 'false',
    url: '/riskCheck/user/detail/:tab/:memNo/:auditFlowNumber',
    pid: 393,
    systemId: 37,
  },
  {
    id: 395,
    name: 'C级车辆',
    icon: '',
    url: '/riskCheck/cLevelCar',
    pid: 389,
    systemId: 37,
  },
  {
    id: 396,
    name: 'C级车辆详情',
    icon: 'false',
    url: '/riskCheck/cLevelcar/detail/:orderNo',
    pid: 395,
    systemId: 37,
  },
  {
    id: 435,
    name: '违章管理',
    icon: '',
    url: '/violateRegulation',
    pid: 0,
    systemId: 37,
  },
  {
    id: 436,
    name: '违章信息编辑',
    icon: 'false',
    url: '/violateRegulation/info/:orderNo',
    pid: 435,
    systemId: 37,
  },
  {
    id: 437,
    name: '扣款处理',
    icon: 'false',
    url: '/violateRegulation/deduction/:orderNo',
    pid: 435,
    systemId: 37,
  },
  {
    id: 438,
    name: '下单管理',
    icon: 'car',
    url: '',
    pid: 0,
    systemId: 37,
  },
  {
    id: 439,
    name: '下单-普通订单',
    icon: 'car',
    url: '/placeOrder/ordinary',
    pid: 438,
    systemId: 37,
  },
  {
    id: 440,
    name: '确定车辆',
    icon: 'false',
    url: '/placeOrder/ordinary/:carNo',
    pid: 439,
    systemId: 37,
  },
  {
    id: 441,
    name: '提现审核',
    icon: 'file',
    url: '/riskCheck/withdrawal',
    pid: 389,
    systemId: 37,
  },
  {
    id: 442,
    name: '收益审核',
    icon: 'file',
    url: '/riskCheck/revenue',
    pid: 389,
    systemId: 37,
  },
  {
    id: 443,
    name: '收益审核调度',
    icon: 'false',
    url: '/riskCheck/revenue/adjustmentDebt/:examineId',
    pid: 442,
    systemId: 37,
  },
  {
    id: 454,
    name: '下单-长租订单',
    icon: 'car',
    url: '/placeOrder/longrent',
    pid: 438,
    systemId: 37,
  },
  {
    id: 455,
    name: '长租确定车辆',
    icon: 'false',
    url: '/placeOrder/longrent/:carNo',
    pid: 454,
    systemId: 37,
  },
  {
    id: 456,
    name: '订单-长租订单',
    icon: 'car',
    url: '/order/longrent',
    pid: 385,
    systemId: 37,
  },
  {
    id: 457,
    name: '长租订单详情',
    icon: 'false',
    url: '/order/longrent/detail/:tab/:orderNo',
    pid: 456,
    systemId: 37,
  },
  {
    id: 458,
    name: '调度-长租订单',
    icon: null,
    url: '/dispatch/longrent',
    pid: 382,
    systemId: 37,
  },
  {
    id: 459,
    name: '调度处理',
    icon: 'false',
    url: '/dispatch/longrent/:orderNo',
    pid: 458,
    systemId: 37,
  },
  {
    id: 494,
    name: '追加收益审核',
    icon: null,
    url: '/riskCheck/additionalIncome',
    pid: 389,
    systemId: 37,
  },
  {
    id: 31,
    name: '财务数据系统',
    icon: null,
    url: '',
    children: [
      {
        id: 32,
        name: '资金管理',
        icon: null,
        url: '',
        pid: 0,
        systemId: 31,
        children: [
          {
            id: 33,
            name: '基础资金管理',
            icon: null,
            url: '',
            pid: 32,
            systemId: 31,
            children: [
              { id: 34, name: '基础资金明细', icon: 'false', url: '', pid: 33, systemId: 31 },
              { id: 35, name: '资金导入', icon: null, url: '', pid: 33, systemId: 31 },
            ],
          },
        ],
      },
    ],
  },
]

export default function BaseWrapperDemo() {
  return (
    <Wrapper systemCode={list} showMenuSearch hasRemoteRoutes>
      <Table />
    </Wrapper>
  )
}
