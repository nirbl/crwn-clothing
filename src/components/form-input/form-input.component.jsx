import React from 'react';

//import './form-input.styles.scss';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
} from './form-input.styles';

//const FormInput = ({ handleChange, label, ...otherProps }) => (
const FormInput = ({ handleChange, label, ...props }) => (
  //<div className='group'>
  <GroupContainer>
    {/*  <input className='form-input' onChange={handleChange} {...otherProps} /> */}
    <FormInputContainer onChange={handleChange} {...props} />
    {/* {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div> */}
    {label ? (
      <FormInputLabel className={props.value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
