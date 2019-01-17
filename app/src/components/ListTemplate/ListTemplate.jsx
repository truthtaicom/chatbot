import React from 'react';
import { Carousel } from 'antd'
import ListTemplateCard from './ListTemplate.Card'
import './ListTemplate.css'


export default function ListTemplate({ data }) {
  return (
    <Carousel effect="scrollx" autoplay={true}>
      {
        data.map(elm => <ListTemplateCard {...elm} />)
      }
    </Carousel>
  )
}