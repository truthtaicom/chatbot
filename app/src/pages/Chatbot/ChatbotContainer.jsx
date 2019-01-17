import React from 'react';
import Chatbot from './Chatbot'
import get from 'lodash.get'
import axios from 'axios'
import { structProtoToJson } from '../../utils/structjson'
import { getPayload } from '../../utils/helpers';

class ChatbotContainer extends React.Component {
  state = {
    messages: []
  }

  scrollToBottom = () => {
    this.messageRef && this.messageRef.scrollIntoView({ behavior: "smooth" });
  }

  onSubmit = async ({ message }) => {
      this.pushMessage({ text: message }, 'me')

      const result = await axios.post('https://us-central1-nordic-bot.cloudfunctions.net/api/bot', { text: message })
      let botMessage = get(result, 'data[0].queryResult.fulfillmentMessages[0].text.text[0]')
      if (!botMessage) {
        botMessage = 'I dont understand your question 😫'
      }
      
      const payloadProto = get(result, 'data[0].queryResult.fulfillmentMessages[1].payload', {})
      const payloadJSON = payloadProto && structProtoToJson(payloadProto)
      const payload = getPayload(payloadJSON)

      this.pushMessage({ text: botMessage, payload }, 'bot')
  }

  pushMessage = (message, user) => {
    this.setState({ 
      messages: [...this.state.messages, { user, message }]
    }, () => this.scrollToBottom())
  }


  render() {
    return (
      <Chatbot onSubmit={this.onSubmit} messages={this.state.messages} messageRef={el => this.messageRef = el} />
    )
  }
}

export default ChatbotContainer