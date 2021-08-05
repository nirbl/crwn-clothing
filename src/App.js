import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // "setCurrentUser" = is an action object to return as following
  // "setCurrentUser(user)" = call an action that pass that 'user' in
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// we passing 'null' as the first argument' because we don't need
//     any state to props from our reducer
export default connect(null, mapDispatchToProps)(App);
