import React from 'react';
interface IProps {
    ticket: any;
    value: any;
    onChange: (params: any) => void;
}
interface IState {
    OSSData: any;
}
/**
 * Aliyun OSS 上传组件
 * 基于 https://ant.design/components/upload-cn 二次封装
 *
 * @export
 * @class AliyunOSSUpload
 * @extends {React.Component}
 *
 * @prop {File[]} value 受控的 FileList
 * @prop {(value) => void} onChange FileList 变化的监听事件
 * @prop {string} ticket 获取上传信息的 API
 * 返回格式
 * {
      dir: 'user-dir/',
      expire: '1577811661',
      host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
      accessId: 'c2hhb2RhaG9uZw==',
      policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
      signature: 'ZGFob25nc2hhbw==',
    }
 */
export default class AliyunOSSUpload extends React.Component<IProps, IState> {
    state: IState;
    componentDidMount(): Promise<void>;
    init: () => Promise<void>;
    onChange: (obj: any) => void;
    onRemove: (file: any) => void;
    transformFile: (file: any) => any;
    getExtraData: (file: any) => {
        key: any;
        OSSAccessKeyId: any;
        policy: any;
        Signature: any;
    };
    beforeUpload: () => Promise<void>;
    render(): JSX.Element;
}
export {};
