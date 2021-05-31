// Goal: Provide a function to add a new dish in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_comment?postId=xxxxxxxxx&userName=Brian&body=Tacos!
exports.handler = async function(event) {

  // get the three querystring parameters and store in memory
  let restaurantId = event.queryStringParameters.restaurantId
  let userName = event.queryStringParameters.userName
  let body = event.queryStringParameters.body


  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  await db.collection(`dishes`).add({
    restaurantId: restaurantId,
    userName: userName,
    body: body,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}

