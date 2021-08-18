import React from 'react';

//import './custom-button.styles.scss';

import { CustomButtonContainer } from './custom-button.styles';

// const CustomButton = ({ children, ...otherProps }) => (
//const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
//<button className='custom-button' {...otherProps}>
//const CustomButton = ({
const CustomButton = ({ children, ...props }) => (
  /* children,
  isGoogleSignIn,
  inverted,
  ...otherProps 
 }) => ( 
  <button */
  <CustomButtonContainer {...props}>
    {/* Note  !!  now we don't need to spread in all of these "otherProps" ->just need spread in all
               our!! props */}

    {/*  className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}  */}
    {/* className={`${inverted ? 'inverted' : ''}${
      isGoogleSignIn ? 'google-sign-in' : ''
    } custom-button`}
    {...otherProps} */}
    {/* >  */}
    {children}
  </CustomButtonContainer>
  //</button>
);

export default CustomButton;
