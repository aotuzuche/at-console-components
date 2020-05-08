import * as React from 'react';
interface IProps {
    history: any;
}
interface IState {
    loading: boolean;
}
declare class View extends React.PureComponent<IProps, IState> {
    constructor(props: IProps);
    onSubmit: (values: any) => Promise<void>;
    render(): JSX.Element;
}
export default View;
