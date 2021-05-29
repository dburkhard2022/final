// Goal: Provide a function to create a new post in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_post?userName=Brian&imageUrl=https://images.unsplash.com/...
exports.handler = async function(event) {

  // get the two querystring parameters and store in memory
  let userUid = event.queryStringParameters.userUid
  let restaurantId = event.queryStringParameters.restaurantId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  await db.collection('visitors').add({
    userUid: userUid,
    restaurantId: restaurantId,
  })

  return {
    statusCode: 200
  }
}

