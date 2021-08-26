import React from 'react';
// *** Note - due to Redux-Saga implement - we will add the row of import:
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// *** Note - due to Redux-Saga implement - we don't need to import the below row
//import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

// *** Note - due to Redux-Saga implement - we will add the row of import:
import { signUpStart } from '../../redux/user/user.actions';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';
//import { classPrivateProperty } from '@babel/types';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    // *** Note - due to Redux-Saga implement - we will add the row - destructor off "signUpStart"cof our props
    const { signUpStart } = this.props;

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    // *** Note - due to Redux-Saga implement - we will add the row - we can just fire out our sign up start with an object
    //            that has the :display name, the email and password

    signUpStart({ displayName, email, password });

    // *** Note - we transfer this block code as implement -Redux-Saga
    /* try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName }); */

    // Note - we also don't need this state anymore because we're sign in our user after we sign them up
    /* this.setState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }); */
    /* } catch (error) {
      console.error(error);
    } */
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      /* <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span> */
      <SignUpContainer>
        <SignUpTitle>I do not have a account</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
        {/*  </div>  */}
      </SignUpContainer>
    );
  }
}

// *** Note - due to Redux-Saga implement - we will add "mapDispatchToProps"
const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
