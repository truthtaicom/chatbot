import React from 'react'
import {
  Form, Input, Button,
} from 'antd';
import './InputText.css'

function InputText(props) {
  const { getFieldDecorator } = props.form;
  const onSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      props.form.resetFields()

      props.onSubmit(values)
    });
  }
  return (
    <div className="chatbot__input__text-input">
      <Form onSubmit={onSubmit} layout="inline">
        <Form.Item>
          {getFieldDecorator('message', {
            rules: [{
              required: true,
              message: 'Please input your message',
            }],
          })(
            <Input placeholder="Please input your message" type="text" />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div >
  )
}

const InputTextWithForm = Form.create()(InputText);
export default InputTextWithForm