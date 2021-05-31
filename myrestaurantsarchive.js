// The main event listener when using Firebase Auth
firebase.auth().onAuthStateChanged(async function(user) {

    // check to see if user is logged-in (i.e. user exists)
    if (user) {
      // write the user Object to the JavaScript console
      console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-out`).innerHTML = `
    <button class="text-blue-500 font-bold pr-8 home">Home</button>
    <button class="text-blue-500 font-bold sign-out-button">Sign Out</button>`
    
    // get a reference to the my restaurants button
    let homeButton = document.querySelector(`.home`)

    // handle the my restaurants button click
    homeButton.addEventListener(`click`, function(event) {

    // redirect to the my restaurants page
    document.location.href = `index.html`
    })

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out-button`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
    // sign out of firebase authentication
    firebase.auth().signOut()

    // redirect to the home page
    document.location.href = `index.html`
    })

    // build the URL for our restaurants API
    let url = `/.netlify/functions/restaurants`

    // fetch the url, wait for a response, store the response in memory
    let response = await fetch (url)

    // ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // write the json-formatted data to the console in Chrome
    console.log(json)

    // grab the reference to the element with class name "restaurants" in memory
    let myRestaurantsDiv = document.querySelector(`.my-restaurants`)

    // loop through the JSON data, for each object representing a restaurant:
    for (let i = 0; i<json.length; i++) {
      // store each object "restaurant" in memory
      let restaurant = json[i]

      // store the restaurant's ID in memory
      let restaurantId = restaurant.id 
      
      // create an empty string for the dishes
      let dishes = ``

      // loop through the restaurant's dishes
      for (let i = 0; i<restaurant.visitors.dishes.length; i++) {
        // create a variable for each dish
        let dish = restaurant.visitors.dishes[i]

        // add HTML markup for the dishes to the dish string
        dishes = dishes + `<div>${dish.userName} ${dish.body}</div>`
      }
      // create some markup using the restaurant data, insert into the "restaurants" element
      myRestaurantsDiv.insertAdjacentHTML(`beforeend`, `
      <div class="md:mt-16 mt-8">
          <div class="md:mx-0 mx-4 mt-8">
            <span class="font-bold text-xl">${restaurant.name}</span>
          </div>
      
          <div class="my-8">
          <img src="${restaurant.imageURL}" class="w-full">
        </div>

        ${dishes}
        <form class="mt-4">
            <input type="text" id="dish-${restaurantId}" class="mr-2 rounded-lg border px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Add a comment...">
            <button id="add-dish-button-${restaurantId}" class="py-2 px-4 rounded-md shadow-sm font-medium text-white bg-purple-600 focus:outline-none">Post</button>
          </form>
        </div>
      `)

      // get a reference to the newly created add dish button
      let addDishButton = document.querySelector(`#addDishButton-${restaurantId}`)

      // event listener for the add dish button
      addDishButton.addEventListener (`click`, async function (event) {
        // ignore the default behavior
        event.preventDefault ()
        // get a reference to the newly created dish input
        let dishInput = document.querySelector (`#dish-${restaurantId}`)
        // get the body of the dish
        let dishBody = dishInput.value 
        // build the URL for the restaurants API
        let url = `/.netlify/functions/create-dishes?restaurantId=${restaurantId}&body=${dishBody}`
        // fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
        // refresh the page
        location.reload()
      })
    }
    
    } else {
      console.log(`logged out`)
        // user is not logged-in, so show login
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: `index.html` // where to go after we`re done signing up/in
      }
  
      // Starts FirebaseUI Auth
      ui.start(`.sign-in-or-sign-out`, authUIConfig)
  
    }
  })