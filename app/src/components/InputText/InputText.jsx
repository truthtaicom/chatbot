import React from 'react'
import {
  Form, Input, Button,
} from 'antd';

function InputText(props) {
  const { getFieldDecorator } = props.form;
  const onSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      props.onSubmit(values)
    });
  }
  return (
    <div>
        <Form.Item>
          {getFieldDecorator('message', {
            rules: [{
              required: true,
              message: 'Please input your message',
            }],
          })(
            <Input placeholder="Please input your message" />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Send
          </Button>
        </Form.Item>
    </div>
  )
}

const InputTextWithForm = Form.create()(InputText);
export default InputTextWithForm