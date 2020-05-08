import './style';
import React from 'react';
interface IProps {
    breakpoint: boolean;
    collapsed: boolean;
    onCollapse: (collapsed: boolean, breakpoint: boolean) => void;
}
interface IState {
    hello: string;
    collapsed: boolean;
    triggerIcon: string;
    loginName: string;
}
declare class HeaderView extends React.PureComponent<IProps, IState> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): any;
    userInfo: any;
    constructor(props: IProps);
    componentDidMount(): void;
    onTrigger: () => void;
    onGoMain: () => void;
    onLogout: () => void;
    render(): JSX.Element;
}
export default HeaderView;
