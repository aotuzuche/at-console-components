/// <reference types="react" />
import { ModalProps } from 'antd/lib/modal';
import { TableProps } from '../table';
export interface ModalTablePorps<RecordType> extends ModalProps {
    tableProps: TableProps<RecordType>;
}
export default function ModalTable<RecordType extends object>({ tableProps, ...props }: ModalTablePorps<RecordType>): JSX.Element;
