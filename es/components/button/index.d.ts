/// <reference types="react" />
import { ButtonProps } from 'antd/lib/button/button';
interface IProps {
    children: any;
    onClick?: () => void;
}
export default function ATButton(props: IProps & ButtonProps): JSX.Element;
export {};
