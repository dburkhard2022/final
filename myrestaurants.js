// The main event listener when using Firebase Auth
firebase.auth().onAuthStateChanged(async function(user) {

    // check to see if user is logged-in (i.e. user exists)
    if (user) {
      // write the user Object to the JavaScript console
      console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-out`).innerHTML = `
    <button class="text-blue-500 font-bold pr-8 my-restaurants">Home</button>
    <button class="text-blue-500 font-bold sign-out-button">Sign Out</button>`
    
    // get a reference to the my restaurants button
    let myRestaurantsButton = document.querySelector(`.my-restaurants`)

    // handle the my restaurants button click
    myRestaurantsButton.addEventListener(`click`, function(event) {

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