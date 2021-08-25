import React from 'react';
// **** Note 2 - implement for Redux-Saga - we have to connect the "googleSignInStart" in a 'dispatch'
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// **** Note 4 - implement for Redux-Saga - we also don't to call thses libraries that we're bringing in
//                from Firebase Utils as the import row below:
//import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
//
// **** Note 1 - implement for Redux-Saga - add import row below
import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';

// *** IMPORTANT NOTE 1 - the below render is deferment as I have before - needs to understand when it was changed and why
import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from './sign-in.styles.jsx';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    // **** Note 6 - implement for Redux-Saga - restructure off - this { email, password } from our props
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;
    // **** Note 4 - implement for Redux-Saga - we don't need this "try/catch" block,
    //   -> no more setState.Redux will handle the state from here on out with Sagas.

    // **** Note 6 - implement for Redux-Saga - then we call our "emailSignInStart(email, password)" where we passing our 'email /password'
    emailSignInStart(email, password);

    /*  try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    } */
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  // *** IMPORTANT NOTE 1 - the below render is deferment as I have before - needs to understand when it was changed and why
  /* render() {
    return (
      <div className='sign-in'>
        <h2>I already have account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          //  <input 
          <FormInput
            name='email'
            type='email'
            //onChange={this.handleChange}
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
           // <label>Email</label> 
           // <input 
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            //onChange={this.handleChange}
            handleChange={this.handleChange}
            label='password'
            required
          />
          // <label>Email</label> 

          // <input type='submit' value='Submit Form' /> 
          <div className='buttons'>
            <CustomButton type='submit'>Sign in </CustomButton>
           // <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
           //   Sign in with Google
           // </CustomButton> 
            <CustomButton
              type='button'
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  } */
  render() {
    // **** Note 4 - implement for Redux-Saga - add destructuring
    const { googleSignInStart } = this.props;
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <ButtonsBarContainer>
            <CustomButton type='submit'> Sign in </CustomButton>
            {/* **** Note 4 - implement for Redux-Saga - change instead of {signInWithGoogle} => to the destructuring above of { googleSignInStart }   */}
            {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn> */}
            <CustomButton
              type='button'
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}

// **** Note 3 - implement for Redux-Saga - add "mapDispatchProps"
const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  // Note 5 - implement for Redux-Saga - we are going to dispatch out this, expect we're going to pass it in as an object
  //    => dispatch(emailSignInStart({}) ---> where the keys "(email, password)"go to "()=>" the values "{ email, password }"
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
