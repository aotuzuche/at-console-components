import { FC } from 'react';
import { ModalProps } from 'antd/lib/modal';
import { Store } from 'antd/lib/form/interface';
import { FormProps } from '../form';
export interface ModalFormProps extends ModalProps {
    formProps: FormProps;
    onOk?: (values: Store) => Promise<unknown> | false | void;
    onCancel?: () => void;
}
declare const ModalForm: FC<ModalFormProps>;
export default ModalForm;
