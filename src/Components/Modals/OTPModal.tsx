import { Typography, Form, Modal, message } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { API_URL } from '../../lib';

import React from 'react';

interface T {
    visible: boolean;
    handleCancel: () => void;
}

const { Link } = Typography

const OTPModal: React.FC<T> = ({ visible, handleCancel }) => {
    const [form] = Form.useForm();

    const handleFinish = async (values: any) => {
        const { userOTP } = values
        const USER_OTP = userOTP.join('')
        const response = await fetch(`${API_URL}/users/forgot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                userOTP: USER_OTP
            })
        })
        const data = await response.json()
        if (data.status == 'fail') {
            form.setFields([
                {
                    name: "userOTP",
                    errors: [data.message],
                }
            ])
        } else {
            message.success(data.message)
        }
    };


    return (
        <Modal title="Enter your OTP!" footer={null} open={visible} onCancel={handleCancel}>

            <Form onFinish={handleFinish} form={form}>
                <Form.Item label=" " name="userOTP">
                    <InputOTP autoSubmit={form} autoFocus={true} inputType="numeric" />
                </Form.Item>

                <Form.Item>
                    <Link style={{ marginTop: 15, display: 'flex', flexDirection: 'row-reverse' }}>Resend OTP</Link>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OTPModal



