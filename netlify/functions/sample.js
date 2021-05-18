let firebase = require('./firebase')

exports.handler = async function(event) {
  let returnValue = [] // sample only...
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}