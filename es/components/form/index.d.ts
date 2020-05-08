import React, { ReactElement, FC, ReactNode } from 'react';
import { Form as AntdForm } from 'antd';
import { FormProps as AntdFormProps, FormItemProps as AntdFormItemProps, FormInstance } from 'antd/lib/form';
import { StoreValue, Store } from 'antd/lib/form/interface';
import { ColProps } from 'antd/lib/col';
import { CardProps } from 'antd/lib/card';
export declare type OutputPipeline = (fieldValue: StoreValue) => StoreValue;
export declare type InputPipeline = (fieldValue: StoreValue) => StoreValue;
interface FormCommonProps {
    /**
     * If show when data nullish in View mode
     * @default -
     */
    placeholder?: string;
    /**
     * Priority is greater than Form isView
     * @default false
     */
    isView?: boolean;
    /**
     * Set form item layout
     * Priority is greater than Form layoutCol
     * @default { span: 24 }
     * @see https://ant.design/components/grid/#Col
     */
    layoutCol?: ColProps;
}
export interface FormItemProps extends Omit<AntdFormItemProps, 'children'>, FormCommonProps {
    /**
     * @example () => <Input />
     */
    render?: (fieldValue: StoreValue, fieldsValue: Store, form: FormInstance) => ReactElement;
    /**
     * @example (fieldValue) => fieldValue + 1
     */
    renderView?: (fieldValue: StoreValue, fieldsValue: Store, form: FormInstance) => ReactNode;
    /**
     * Format initial or onFinish value
     * Like Switch component value onFinish maybe Number(true | false)
     * @example (date) => date.format()
     */
    pipeline?: OutputPipeline | [InputPipeline, OutputPipeline];
    /**
     * Hide Form item by condition
     * @example (fieldValue) => !!fieldValue
     */
    isHidden?: (fieldValue: StoreValue, fieldsValue: Store) => boolean;
    tip?: ReactNode | ((fieldValue: StoreValue, fieldsValue: Store, form: FormInstance) => ReactNode);
    extra?: ReactNode | ((fieldsValue: Store) => ReactNode);
}
export interface FormProps extends AntdFormProps, FormCommonProps {
    items: FormItemProps[];
    children?: React.ReactNode;
    /** Enhance initialValues, but only trigger once  */
    initialValues?: Store | (() => Promise<Store>);
    /** Show mode */
    mode?: 'card';
    /** Effective in card mode */
    cardProps?: CardProps;
    onFinish?: (values: Store) => void | Promise<unknown>;
}
declare const InternalForm: FC<FormProps>;
declare type InternalForm = typeof InternalForm;
declare type Form = InternalForm & Pick<typeof AntdForm, 'Item' | 'List' | 'useForm' | 'Provider'>;
declare const Form: Form;
export default Form;
