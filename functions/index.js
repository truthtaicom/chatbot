const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Payload, WebhookClient, Text } = require('dialogflow-fulfillment')
const { Carousel } = require('actions-on-google');


process.env.DEBUG = 'dialogflow:debug';

admin.initializeApp();

const express = require('express');
const cors = require('cors');
const app = express();

const { textQuery } = require('./chatbot')

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send('Hello'))
app.post('/bot', async (req, res) => {
  try {
    const result = await textQuery(req.body.text, req.body.parameters)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
});

app.get('/products', async (req, res) => {
  const productValue = await getProducts()
  res.status(200).json(productValue);
})

const getProducts = async () => {
  const productsRef = await admin.database().ref('/products').once('value')
  const productValue = await productsRef.val()
  return productValue.slice(0, 2)
}


async function buyNowHandler(agent) {
  JSON.stringify(agent, '>>> agent')
  agent.add(new Text({
    text: ["Dang tim san pham cho ban ne"]
  }))
}

async function getProductBestSellers(agent) {
  const products = await getProducts()
  agent.add(new Text({
    text: ["Shop gửi bạn một số sản phẩm đang bán chạy:"]
  }));



  agent.add(new Payload('PLATFORM_UNSPECIFIED', {
    products
    // expectUserResponse: true,
    // isSsml: false,
    // noInputPrompts: [],
    // richResponse: {
    //   items: products
    // },
    // systemIntent: {
    //   intent: 'actions.intent.OPTION',
    // }
  }, {
      rawPayload: false,
      sendAsMessage: true,
    }));

  // products.forEach(elm => {
  //    agent.add({
  //     "title": elm.title,
  //     "subtitle": `Price: ${elm.price} VND`,
  //     "imageUri": elm.imageURL,
  //     "buttons": [
  //       {
  //         "text": "Mua ngay",
  //         "postback": 'https://google.com.vn'
  //       }
  //     ]
  //   })

  // agent.context.set({ name: 'buy_now', parameters: { id: elm.id }});
  // })
}

exports.api = functions.https.onRequest(app);
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {
  const agent = new WebhookClient({ request, response });
  let intentMap = new Map();

  intentMap.set('TEST_FULFILL', getProductBestSellers);
  intentMap.set('BEST_SELLERS', getProductBestSellers)
  // intentMap.set('BUY_NOW', buyNowHandler)
  agent.handleRequest(intentMap)
})
