import React from "react";
import RequestApi from '../../api';
import { Button, Modal, Form, Input, message, Divider } from 'antd';
import { withRouter } from 'react-router';

class CreateAndUpdateRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: null,
            senderName: null, senderEmail: null, senderPhone: null,
            code: null, note: null, supportCount: null, type: null,
            viewAt: null, status: null, receiveUserId: null,
            data_request_by_id: null
        };
    }

    componentDidMount() {
        let { request_id } = this.props;
        if (request_id) {
            this.getRequestByID(request_id)
        }
    }

    getRequestByID = (id) => {
        RequestApi.getRequestByID(id).then(res => {
            if (res.code) {
                let data = res.data;
                let { senderName, senderEmail, senderPhone, code, note, supportCount, type, viewAt, status, receiveUserId } = data;
                this.setState({
                    senderName, senderEmail, senderPhone, code, note, supportCount, type, viewAt, status, receiveUserId
                })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        try {
            let { request_id } = this.props;
            this.props.form.validateFields((err, values) => {
                let list_message = [];
                for (let item in err) {
                    err[item].errors.map(i => {
                        list_message.push(i.message);
                    })
                }
                if (list_message.length > 0) {
                    this.setState({
                        list_message
                    })
                }
                if (!err) {
                    this.setState({
                        loading: true
                    })
                    if (!request_id) {
                        this.createAccountChildren();
                    } else {
                        this.updateAccountChildren();
                    }
                }
            });
        }
        catch (err) {
            console.log("err", err)
        }
    };

    createAccountChildren() {
        let { intl, user_id, account_parent_id } = this.props;
        let { list_key_permission, name } = this.state;
        this.setState({
            loading: true
        })
        let account_scan_qr = {
            user_id,
            role_scan_qr: "CHILD",
            account_parent_id,
            name
        }
        RequestApi.createRequest({ account_scan_qr, list_key_permission }).then(res => {
            if (res.code) {
                message.success(intl.formatMessage({ id: "notify.create.success" }));
                this.props.reset();
            } else {
                message.error(res)
            }
            this.setState({
                loading: false
            })
        })
    }

    updateAccountChildren() {
        let { user_id, request_id, intl } = this.props;
        let { list_key_permission, name } = this.state;
        let account_scan_qr = {
            id: request_id,
            user_id: user_id,
            role_scan_qr: "CHILD",
            name
        }
        RequestApi.updateRequest({ account_scan_qr, list_key_permission }).then(res => {
            if (res.code) {
                message.success(intl.formatMessage({ id: "notify.update.success" }));
                this.props.reset();
            } else {
                message.error(res)
            }
            this.setState({
                loading: false
            })
        })
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    onCheck = checkedKeys => {
        let check = []
        checkedKeys = checkedKeys.map(item => {
            if (isNaN(item)) {
                check.push(item)
            }
        })
        this.setState({
            list_key_permission: check
        })
    };

    render() {
        let { loading, senderName, senderEmail, senderPhone, data_request_by_id } = this.state;
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", data_request_by_id)
        console
        let { showModal, request_id, intl } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                <Modal
                    visible={showModal}
                    title={!request_id ? "Thêm Mới" : "Cập Nhật"}
                    onCancel={() => this.props.reset()}
                    footer={[
                        <Button key="back" onClick={() => this.props.reset()}>
                            Hủy
                        </Button>,
                        <Button htmlType="submit" onClick={this.handleSubmit} type="primary" loading={loading}>
                            {!request_id ? "Thêm Mới" : "Cập Nhật"}
                        </Button>,
                    ]}
                >
                    <Form layout="vertical" >
                        <Form.Item label="Tên người gửi">
                            {
                                getFieldDecorator(`senderName`, {
                                    initialValue: senderName || undefined,
                                    rules: [
                                        {
                                            required: true,
                                            // message: intl.formatMessage({ id: "formData.validate.required.name_suggest" }),
                                        },
                                    ],
                                })(
                                    <Input
                                        maxLength={100}
                                        placeholder="Nhập Tên"
                                        onChange={(event) => this.handleChange("senderName", event.target.value)}
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="Email người gửi">
                            {
                                getFieldDecorator(`senderEmail`, {
                                    initialValue: senderEmail || undefined,
                                    rules: [
                                        {
                                            required: true,
                                            // message: intl.formatMessage({ id: "formData.validate.required.senderEmail_suggest" }),
                                        },
                                    ],
                                })(
                                    <Input
                                        maxLength={100}
                                        placeholder="Nhập Email"
                                        onChange={(event) => this.handleChange("senderEmail", event.target.value)}
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="SDT người gửi">
                            {
                                getFieldDecorator(`senderPhone`, {
                                    initialValue: senderPhone || undefined,
                                    rules: [
                                        {
                                            required: true,
                                            // message: intl.formatMessage({ id: "formData.validate.required.senderPhone_suggest" }),
                                        },
                                    ],
                                })(
                                    <Input
                                        maxLength={100}
                                        placeholder="Nhập SDT"
                                        onChange={(event) => this.handleChange("senderPhone", event.target.value)}
                                    />
                                )
                            }
                        </Form.Item>
                        <Divider type="" />

                    </Form>
                </Modal>
            </React.Fragment>
        );
    }
}

const WrappedCreateAndUpdateRequest = Form.create()(withRouter(CreateAndUpdateRequest));

export default WrappedCreateAndUpdateRequest;
