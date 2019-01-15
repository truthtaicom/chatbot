const dialogFlow = require('dialogflow')
const { projectId, sessionId, languageCode } = require('./config/keys')

const sessionClient = new dialogFlow.SessionsClient({ projectId })
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

async function textQuery(text, params) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: { text, languageCode },
    },
    queryParams: {
      payload: {
        data: params
      }
    }
  }

  console.log(`Sending ${text}`)

  const response = await sessionClient.detectIntent(request)
  return response
}


module.exports = {
  textQuery
}