import './style';
import React from 'react';
interface IState {
    selectedKeys: Array<string>;
    openKeys: Array<string>;
    list: any;
    defaultMenu?: any;
}
interface IProps {
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    collapsed: boolean;
    screens: any;
    title?: string;
    fixedAside: any;
    defaultMenu: string;
    list: Array<any>;
    onMaskerClick: (collapsed: boolean, fixedAside: boolean) => void;
    onMenuHandle: (url: string) => void;
    onCollapse: (collapsed: boolean) => void;
}
declare class AsideView extends React.PureComponent<IProps, IState> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        list: any;
        defaultMenu: any;
        openKeys: any[];
        selectedKeys: any[];
    } | null;
    maskerRef: any;
    constructor(props: IProps);
    componentDidMount(): void;
    onAsideMaskerClick: () => void;
    onMenuHandle: (e: any) => void;
    onMenuSelect: (e: any) => void;
    onCollapse: (collapsed: boolean) => void;
    recursionMenu: (obj: any) => (JSX.Element | null)[] | null;
    render(): JSX.Element;
}
export default AsideView;
