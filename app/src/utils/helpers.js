export function getPayloadType(payloadJSON) {
  return Object.keys(payloadJSON)[0]
}

export function getPayload(payloadJSON) {
  const type = getPayloadType(payloadJSON)
  return {
    type,
    data: payloadJSON[type]
  }
}