import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// **** Note !! Here we continue implement - "Moving our ShopData to Firebase"
//import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component.jsx';
// **** Note !! Here we !!change!! by continue implement - "Moving our ShopData to Firebase"
import {
  auth,
  createUserProfileDocument,
  //addCollectionAndDocuments,
} from './firebase/firebase.utils';

/* const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
); */

//function App() {
// ** Note: when we create authentication in Firebase we need then to store a state
//          Therefor we change the implementation from "function App()"  -> to class

// return (
// <div>

/* <HomePage /> */

/*  <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
      /* <Route path='/hats' component={HatsPage} /> 
      /* <Route path='/shop' component={ShopPage} />
      <Route path='/signin' component={SignInAndSignUpPage} />
    </Switch>
  </div>
);  */

class App extends React.Component {
  // Note !! because of Redux - getting setCurrentUser (as imported)
  //          -> we don't need the constructor
  /* constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  } */

  // a method called : "unsubscribeFromAuth"
  unsubscribeFromAuth = null;

  /* componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  } */
  componentDidMount() {
    // *** Note !! Here we !!change!! by continue implement - "Moving our ShopData to Firebase"
    //      && we delete "collectionsArray"
    //const { setCurrentUser, collectionsArray } = this.props;
    const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          //console.log(snapShot.data());

          /* this.setState(
            {
              currentUser:{ */
          // Note!! whenever the document snapshot object updated =>
          // because of we set a new user value /OR/ update the value /OR/ delete
          // =>  it been listened by "setCurrentUser" and !! will pass that snapshot into
          //  our listener -> what we do is we call our setCurrentUser 'action creator' method
          //  so our Redux method to set the actual current current user object in our
          //  redux Reducer ==> that's how we are able to store that on our current user.
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          //}
          /* () => {
              console.log(this.state);
            } */
          //);
          //console.log(this.state);
        });
      }
      //createUserProfileDocument(user);
      //this.setState({ currentUser: userAuth });

      setCurrentUser(userAuth);
      // *** Note !! Here we !!change!! by continue implement - "Moving our ShopData to Firebase"
      //   & also we here destruction just the properties we want : 'title + items' because we have
      //already the id-s => this collections array map will be returning us an array of just objects with the values that we want to keep with the same properties we restructured : 'title + items'
      /* addCollectionAndDocuments(
        'collections',
        collectionsArray.map(({ title, items }) => ({
          title,
          items,
        }))
      ); */
    });
  }

  // ** to close the subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* <HomePage /> */}

        {/*   <Header /> */}
        {/* Note: now we will give aware the "header" when the user SignIn /or/ SignOut
                  by giving it the App it's current user state*/}

        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          {/* <Route path='/hats' component={HatsPage} /> */}
          <Route path='/shop' component={ShopPage} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// to avoid singed in user to sign in again / enter the auth path
/* const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
}) */

// for - createStructuredSelector({})
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // *** Note !! Here we !!change!! by continue implement - "Moving our ShopData to Firebase"
  //collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  // "setCurrentUser" = is an action object to return as following
  // "setCurrentUser(user)" = call an action that pass that 'user' in
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// we passing 'null' as the first argument' because we don't need
//     any state to props from our reducer

//export default connect(null, mapDispatchToProps)(App);

// continue rule avoid entered user to sign in again
export default connect(mapStateToProps, mapDispatchToProps)(App);
