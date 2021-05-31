let firebase = require('./firebase')

exports.handler = async function(event) {
  
  // define an empty Array to hold the return value from our lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all restaurants, wait for it to return, store in memory
  let restaurantsQuery = await db.collection(`restaurants`).orderBy(`name`, `asc`).get()

  // retrieve the documents from the query
  let restaurants = restaurantsQuery.docs

  console.log(restaurants.length)
  // loop through the restaurant documents
  for (let restaurantIndex=0; restaurantIndex < restaurants.length; restaurantIndex++) {
    // get the id from the document
    let restaurantId = restaurants[restaurantIndex].id

    // get the data from the document
    let restaurantData = restaurants[restaurantIndex].data()

    // create an Object to be added to the return value of our lambda
    let restaurantObject = {
      id: restaurantId,
      name: restaurantData.name,
      imageURL: restaurantData.imageURL,
      cuisine: restaurantData.cuisine,
      neighborhood: restaurantData.neighborhood,
      rating: restaurantData.rating,
      visitors: []
    }

        // get the visitors for this post, wait for it to return, store in memory
        let visitorsQuery = await db.collection(`visitors`).where(`restaurantId`, `==`, restaurantId).get()

        // get the documents from the query
        let visitors = visitorsQuery.docs
    
        // loop through the comment documents
        for (let visitorIndex=0; visitorIndex < visitors.length; visitorIndex++) {
          // get the id from the visitor document
          let visitorId = visitors[visitorIndex].id
    
          // get the data from the visitor document
          let visitorData = visitors[visitorIndex].data()
    
          // create an Object to be added to the visitors Array of the post
          let visitorObject = {
            id: visitorId,
            userUid: visitorData.userUid,
            dishes: []
          }
                      // get the dishes for this post, wait for it to return, store in memory
            let dishesQuery = await db.collection(`dishes`).where(`restaurantId`, `==`, restaurantId).get()

            // get the documents from the query
            let dishes = dishesQuery.docs
        
            // loop through the dish documents
            for (let dishIndex=0; dishIndex < dishes.length; dishIndex++) {
              // get the id from the dish document
              let dishId = dishes[dishIndex].id
        
              // get the data from the dish document
              let dishData = dishes[dishIndex].data()
        
              // create an Object to be added to the dishes Array of the post
              let dishObject = {
                id: dishId,
                userName: visitorData.userName,
                body: dishData.body
              }

              // add the object to the visitor
              visitorObject.dishes.push(dishObject)

          // add the Object to the post
          restaurantObject.visitors.push(visitorObject)
        }


    // add the Object to the return value
    returnValue.push(restaurantObject)
  }

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }

}