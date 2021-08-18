import styled, { css } from 'styled-components';

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

/* "&.inverted" && "&:hover" styles from "custom-button.styles.scss */
const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

// "&.google-sign-in" && "&:hover" styles from "custom-button.styles.scss
const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

//    Note !!
//    instead of rendering just these styles in - since we can write JavaScript =>
//    we will write a function that we call inside of this component
//      "= props" => is equal to a function that gets the "props" and return a different styles -
//                    depending on what we have

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }
  // otherwise we will return :
  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  // .custom-button && '&.hover' styles from "custom-button.styles.scss"
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  // Note !! we wil pull of and place it above in "const buttonStyles = css

  //background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  //border: none;
  cursor: pointer;
  // below 2 line - additional connected to our style of 2 hover & inverted styles below
  //  -> means - anything in our button will always be centered inside of our element
  display: flex;
  justify-content: center;

  /* &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  } */
  ${getButtonStyles}
`;
