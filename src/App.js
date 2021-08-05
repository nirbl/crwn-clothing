import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  // a method called : "unsubscribeFromAuth"
  unsubscribeFromAuth = null;

  /* componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  } */
  componentDidMount() {
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          //console.log(snapShot.data());
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            }
            /* () => {
              console.log(this.state);
            } */
          );
          console.log(this.state);
        });
      }
      //createUserProfileDocument(user);
      this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
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

export default App;
