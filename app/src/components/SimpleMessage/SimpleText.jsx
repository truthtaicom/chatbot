import React from 'react';
import { Avatar, Row, Col } from 'antd'

export default function SimpleMessage({ message }) {
  return (
    <Row>
      <Col span={4}>
        <Avatar />
      </Col>
      <Col span={20}>
        { message }
      </Col>
    </Row>
  )
}