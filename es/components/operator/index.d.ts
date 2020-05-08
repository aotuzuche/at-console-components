/// <reference types="react" />
import './style.scss';
/**
 * 对操作栏的二次封装
 *
 * 用法
 * <Operator>
 *   <span>操作1</span>
 *   <span>操作2</span>
 *   <span>操作3</span>
 * </Operator>
 *
 * 1. 字体颜色（可点击）
 * 2. 间隔
 * 3. 超过三个操作进行折叠
 *
 * @param {*} props
 * @returns
 */
declare function Operator({ len, ...props }: {
    [x: string]: any;
    len?: number | undefined;
}): JSX.Element;
export default Operator;
