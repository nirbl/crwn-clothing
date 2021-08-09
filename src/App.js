import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

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
