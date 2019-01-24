import React from 'react'
import { Card, Button } from 'antd';

export default function ListTemplateCard({ imageURL, title, price, onSelect, id }) {
  const onSelectItem = () => onSelect({ message: `Chọn mua : ${title}`, parameters: { id, type: 'BUY_NOW', productName: title, context: 'waiting_buy_now' } })
  return (
    <Card
      hoverable
      cover={<img alt="example" src={imageURL} />}
      actions={[<Button type="primary" icon="shopping-cart" onClick={onSelectItem}>Mua ngay</Button>]}
    >
      <Card.Meta
        title={title}
        description={`Price: ${price} VND`}
      />
    </Card>
  )
}