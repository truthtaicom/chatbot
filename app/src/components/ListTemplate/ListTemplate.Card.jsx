import React from 'react'
import { Card, Button } from 'antd';

export default function ListTemplateCard({ imageURL, title, price }) {
  return (
    <Card
      hoverable
      cover={<img alt="example" src={imageURL} />}
      actions={[<Button type="primary" icon="shopping-cart">Mua ngay</Button>]}
    >
      <Card.Meta
        title={title}
        description={`Price: ${price} VND`}
      />
    </Card>
  )
}