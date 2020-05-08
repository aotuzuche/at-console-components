import React, { ReactNode } from 'react';
import { TableProps as AntdTableProps } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import { Store } from 'antd/lib/form/interface';
import { SorterResult, TableCurrentDataSource, Key, ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { FormProps } from '../form';
interface TableCommonProps {
    /**
     * If show when data nullish
     * @default -
     */
    placeholder?: string;
}
export interface TableSearchProps extends FormProps {
    /**
     * Show search form item count
     * @default 3
     */
    initialCount?: number;
}
interface TablePaginationName {
    /**
     * @default total
     */
    totalName?: string;
    /**
     * @default pageSize
     */
    pageSizeName?: string;
    /**
     * @default pageNum
     */
    pageNumName?: string;
    /**
     * @default data
     */
    dataName?: string;
    /**
     * @default 20
     */
    pageSize?: number;
    /**
     * @default 1
     */
    pageNum?: number;
}
export interface TableData<RecordType> {
    data: RecordType[];
    [key: string]: any;
}
export declare type TableColumnsType<RecordType> = TableCommonProps & (ColumnGroupType<RecordType> | ColumnType<RecordType>);
export interface TableOnSearchChangeState<RecordType> {
    paginationConfig?: PaginationConfig;
    filters?: Record<string, Key[] | null>;
    sorter?: SorterResult<RecordType> | SorterResult<RecordType>[];
    extra?: TableCurrentDataSource<RecordType>;
    isInit?: boolean;
}
export interface TableProps<RecordType> extends Omit<AntdTableProps<RecordType>, 'title'>, TablePaginationName, TableCommonProps {
    searchProps?: TableSearchProps;
    onSearch: (params: Store, changeState?: TableOnSearchChangeState<RecordType>) => TableData<RecordType> | Promise<TableData<RecordType>>;
    columns?: TableColumnsType<RecordType>[];
    /**
     * Show Table quick tools (refresh ...)
     */
    showTools?: boolean;
    isKeepAlive?: boolean;
    title?: (data: TableData<RecordType>) => ReactNode;
}
export interface TableRef {
    /**
     * Refresh Table data with existing search params
     */
    refresh: () => Promise<unknown>;
}
declare const _default: <RecordType extends object>(p: TableProps<RecordType> & {
    ref?: ((instance: TableRef | null) => void) | React.RefObject<TableRef> | null | undefined;
}) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default _default;
