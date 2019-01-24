const dialogFlow = require('dialogflow')
const { projectId, sessionId, languageCode } = require('./config/keys')
const { jsonToStructProto } = require('./utils/structjson')
const sessionClient = new dialogFlow.SessionsClient({ projectId })
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

async function textQuery(text, params = {}) {
  console.log(params, 'params >>>')
  const request = {
    session: sessionPath,
    queryInput: {
      text: { text, languageCode },
      // event: {
      //   name: "buy_now",
      //   parameters: params,
      //   languageCode: languageCode,
      // },  
    },
    queryParams: {
      contexts: [{
        //projects/project-name/agent/sessions/12343/contexts/play-video
          name: `${sessionPath}/contexts/${params.context}`,
          lifespan: 5,
          parameters: {
            "id": params.id,
            "productName": params.productName,
            "productName.original": params.productName,
            "id.original": params.id
          }
      }],
      // payload: jsonToStructProto(params)
    }
  }

  console.log(`Sending ${text}`)

  const response = await sessionClient.detectIntent(request)
  return response
}


module.exports = {
  textQuery
}