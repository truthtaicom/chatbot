import React from 'react';
import cn from 'classnames'
import InputText from '../../components/InputText'
import './Chatbot.css'
import SimpleText from '../../components/SimpleMessage'
import ListTemplate from '../../components/ListTemplate'

export default function Chatbot(props) {
  return (
    <div className="chatbot">
      <div className="chatbot__header">
        Welcome to NC Bot
      </div>

      <div className="chatbot__body">
        {
          props.messages.map(({ message, user }, idx) => {
            const isLatest = idx === props.messages.length -1;
            const isBotUser = user === 'bot'
            const sectionClass = cn('chatbot__body__item', {
              'chatbot__body__item--sender': isBotUser,
              'chatbot__body__item--me': !isBotUser
            })
            const sectionProps = {
              className: sectionClass,
              ref: isLatest ? props.messageRef : null
            }
            const username = isBotUser ? 'BOT' : 'ME'

            const data = (message.payload && message.payload.data && message.payload.data.slice(0, 6)) || null
            return (
              <section {...sectionProps}>
                <SimpleText username={username} message={message.text} />

                { 
                  data &&
                  <React.Suspense fallback="Loading">
                    <ListTemplate data={data} />
                  </React.Suspense>
                }
              </section>
            )
          })
        }
      </div>

      <div className="chatbot__input">
          <InputText onSubmit={props.onSubmit} />
      </div>
      {/* <SimpleMessage message="Hello world" />
      <InputText onSubmit={onSubmit} /> */}
    </div>
  )
}