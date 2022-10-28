import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import { Card, Col, Divider, Form as AntdForm, Input, Popover, Row, Skeleton, Spin } from 'antd'
import { CardProps } from 'antd/lib/card'
import { ColProps } from 'antd/lib/col'
import { Store, StoreValue } from 'antd/lib/form/interface'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import useForceUpdate from '../hooks/useForceUpdate'
import useStates from '../hooks/useStates'
import { isFunc } from '../utils/is'
import showDesensitize, { DesensitizeType } from '../utils/showDesensitize'
import showPlaceHolder from '../utils/showPlaceholder'
import usePrevious from './usePrevious'
import React, {
  ReactElement,
  FC,
  ReactNode,
  useEffect,
  useState,
  FormEvent,
  isValidElement,
  cloneElement,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import {
  FormProps as AntdFormProps,
  FormItemProps as AntdFormItemProps,
  FormInstance,
} from 'antd/lib/form'

export type OutputPipeline = (fieldValue: StoreValue) => StoreValue
export type InputPipeline = (fieldValue: StoreValue) => StoreValue

interface FormCommonProps {
  /**
   * If show when data nullish in View mode
   * @default -
   */
  placeholder?: string
  /**
   * Priority is greater than Form isView
   * @default false
   */
  isView?: boolean
  /**
   * Set form item layout
   * Priority is greater than Form layoutCol
   * @default { span: 24 }
   * @see https://ant.design/components/grid/#Col
   */
  layoutCol?: ColProps

  // 信息脱敏
  desensitize?: DesensitizeType | string
}

export interface FormItemProps extends Omit<AntdFormItemProps, 'children'>, FormCommonProps {
  /**
   * @example () => <Input />
   */
  render?: (fieldValue: StoreValue, fieldsValue: Store, form: FormInstance) => ReactElement
  /**
   * @example (fieldValue) => fieldValue + 1
   */
  renderView?: (fieldValue: StoreValue, fieldsValue: Store, form: FormInstance) => ReactNode
  /**
   * Hide Form item by condition
   * @example (fieldValue) => !!fieldValue
   */
  isHidden?: (fieldValue: StoreValue, fieldsValue: Store) => boolean
  tip?: ReactNode | ((fieldValue: StoreValue, fieldsValue: Store, form: FormInstance) => ReactNode)
  extra?: ReactNode | ((fieldsValue: Store) => ReactNode)
  suffix?: ReactNode | ((fieldsValue: Store) => ReactNode)

  // Default render
  type?: 'divider'

  // disabled
  disabled?: boolean
}

export interface FormProps extends AntdFormProps, FormCommonProps {
  items: FormItemProps[]
  children?: React.ReactNode
  /** Enhance initialValues, but only trigger once  */
  initialValues?: Store | (() => Promise<Store>)
  /** Show mode */
  mode?: 'card'
  /** Effective in card mode */
  cardProps?: CardProps
  onFinish?: (values: Store) => Promise<unknown> | any
  childrenProps?: {
    single?: boolean
  }
}

const RenderChild: FC<Pick<FormItemProps, 'suffix' | 'type' | 'label' | 'disabled'>> = ({
  suffix,
  children,
  type,
  label,
  ...props
}) =>
  type === 'divider' ? (
    <Divider orientation="left">{label}</Divider>
  ) : (
    <>
      {isValidElement(children) ? cloneElement(children, props) : children}
      {suffix}
    </>
  )

const { Item, useForm, List, Provider } = AntdForm

const InternalForm: ForwardRefRenderFunction<FormInstance, FormProps> = (
  {
    items,
    children,
    onFinish: onFinishInternal,
    onReset: onResetInternal,
    isView = false,
    form,
    layoutCol = { span: 24 },
    initialValues: initialValuesInternal,
    placeholder: placeholderInternal = '-',
    onValuesChange: onValuesChangeInternal,
    mode,
    cardProps,
    childrenProps,
    ...props
  },
  ref,
) => {
  const [formInsatce] = useForm(form)
  const forceUpdate = useForceUpdate()
  const isLoadinginitialValues = isFunc(initialValuesInternal)
  const [initialStates, setInitialStates] = useStates<{
    isLoadinginitialValues: boolean
    initialValues?: Store
  }>({
    isLoadinginitialValues,
    initialValues: isLoadinginitialValues ? {} : initialValuesInternal,
  })
  const prevFormInitialValues = usePrevious(initialValuesInternal)
  const [loading, setLoading] = useState(false)

  const getInitialValues = async () => {
    let values: Store = {}
    try {
      values = await (initialValuesInternal as () => Promise<Store>)()
    } finally {
      setInitialStates({
        isLoadinginitialValues: false,
        initialValues: values,
      })
      // Fix if Form instance destory but useForm from external.
      formInsatce.resetFields()
    }
  }

  useImperativeHandle(ref, () => formInsatce)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (initialStates.isLoadinginitialValues) {
      getInitialValues()
    } else {
      // Fix if external form instance save Store
      if (form) {
        formInsatce.resetFields()
      }
      // Todo: Initial value cannot get when first mount
      forceUpdate()
    }
    return () => {
      // Todo: getInitialValues mayby remove formInsatce.resetFields()?
      if (form) {
        formInsatce.resetFields()
      }
    }
  }, [])

  // If promise initialValues update need rerenader?
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    forceUpdate()
  }, [initialStates])

  useEffect(() => {
    if (!isLoadinginitialValues && !isEqual(prevFormInitialValues, initialValuesInternal)) {
      formInsatce.setFieldsValue(initialValuesInternal as Store)
      setInitialStates({
        initialValues: initialValuesInternal,
      })
    }
  }, [initialValuesInternal])

  if (!items || items.length === 0) {
    return null
  }

  if (initialStates.isLoadinginitialValues) {
    return <Skeleton />
  }

  const onFinish = async (values: Store) => {
    try {
      setLoading(true)
      if (onFinishInternal) {
        await onFinishInternal(values)
      }
    } finally {
      setLoading(false)
    }
  }

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    formInsatce.resetFields()
    isFunc(onResetInternal) && onResetInternal(e)
  }

  const renderItems = (
    {
      render,
      renderView,
      isView: isItemView = isView,
      isHidden,
      layoutCol: itemLayoutCol,
      label,
      tip,
      placeholder = placeholderInternal,
      extra,
      suffix,
      name,
      type,
      noStyle = !!type,
      hidden,
      desensitize,
      disabled,
      ...itemProps
    }: FormItemProps,
    index: number,
  ) => {
    let Comp: ReactNode
    const { getFieldsValue } = formInsatce
    const fieldsValue = {
      ...initialValuesInternal,
      ...initialStates.initialValues,
      ...getFieldsValue(),
    }
    const fieldValue: StoreValue = get(fieldsValue, name as string)
    const itemLayoutColCombination = hidden
      ? { span: 0 }
      : itemLayoutCol ?? (type ? { span: 24 } : layoutCol)

    if (isFunc(isHidden) && isHidden(fieldValue, fieldsValue)) {
      return null
    }

    const key = `form-item-${(name || index).toString()}`

    const LabelWrap = tip ? (
      <>
        {label}
        <Popover content={isFunc(tip) ? () => tip(fieldValue, fieldsValue, formInsatce) : tip}>
          <QuestionCircleOutlined
            style={{
              marginLeft: 4,
            }}
          />
        </Popover>
      </>
    ) : (
      label
    )

    if (isItemView) {
      Comp = showPlaceHolder(
        renderView && isFunc(renderView)
          ? renderView(fieldValue, fieldsValue, formInsatce)
          : desensitize
          ? showDesensitize(fieldValue, desensitize)
          : fieldValue,
        name ? placeholder : undefined,
      )
    } else {
      Comp =
        render && isFunc(render) ? (
          render(fieldValue, fieldsValue, formInsatce)
        ) : (
          <Input allowClear placeholder={`请输入${label}`} />
        )
    }

    return (
      <Col key={key} {...itemLayoutColCombination}>
        <Item
          label={type ? undefined : LabelWrap}
          extra={isFunc(extra) ? extra(fieldsValue) : extra}
          name={isItemView ? undefined : name}
          noStyle={noStyle}
          hidden={hidden}
          {...itemProps}
        >
          <RenderChild
            {...(isValidElement(Comp) ? (Comp as any).props : {})}
            suffix={isFunc(suffix) ? suffix(fieldsValue) : suffix}
            type={type}
            disabled={!!disabled}
            label={LabelWrap}
          >
            {Comp}
          </RenderChild>
        </Item>
      </Col>
    )
  }

  const onValuesChange = (changeValues: Store, values: Store) => {
    forceUpdate()
    isFunc(onValuesChangeInternal) && onValuesChangeInternal(changeValues, values)
  }

  const FormChildren = (
    <Row gutter={24}>
      {items.map((item, index) => renderItems(item, index))}
      {children && (
        <Col
          style={{
            flex: '1',
            flexBasis: childrenProps?.single ? '100%' : 'auto',
          }}
        >
          <Item label={<span />} colon={false}>
            {children as ReactElement}
          </Item>
        </Col>
      )}
    </Row>
  )

  // Better use Button loading when submit, but we can't control button
  return (
    <Spin spinning={loading}>
      <AntdForm
        form={formInsatce}
        onFinish={onFinish}
        onReset={onReset}
        onValuesChange={onValuesChange}
        initialValues={initialStates.initialValues}
        {...props}
      >
        {mode === 'card' ? (
          <Card
            headStyle={{
              backgroundColor: '#fafafa',
            }}
            {...cardProps}
          >
            {FormChildren}
          </Card>
        ) : (
          FormChildren
        )}
      </AntdForm>
    </Spin>
  )
}

const WrapperForm = forwardRef<FormInstance, FormProps>(InternalForm)

type Form = typeof WrapperForm & Pick<typeof AntdForm, 'Item' | 'List' | 'useForm' | 'Provider'>

const Form: Form = WrapperForm as Form

Form.Item = Item
Form.List = List
Form.useForm = useForm
Form.Provider = Provider

export default Form
