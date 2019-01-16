import React from 'react';
import SimpleMessage from '../../components/SimpleMessage'
import InputText from '../../components/InputText'
import './Chatbot.css'

export default function Chatbot() {
  const onSubmit = (e) => {
    console.log(e, 'onSubmit')
  }

  return (
    <div className="chatbot">
      <SimpleMessage message="Hello world" />
      <InputText onSubmit={onSubmit} />
    </div>
  )
}