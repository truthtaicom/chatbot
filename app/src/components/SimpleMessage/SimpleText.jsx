import React from 'react';
import { Avatar } from 'antd'

export default function SimpleMessage({ message, username }) {
  return (
    <>
      <Avatar className="chatbot__body__item__avatar">{username}</Avatar>
      <div className="chatbot__body__item__message">
        {message}
      </div>
    </>
  )
}