import React from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

//import './header.styles.scss';
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  //OptionDiv,
  OptionLink,
} from './header.styles';

//const Header = () => (
//const Header = ({ currentUser }) => (
const Header = ({ currentUser, hidden }) => (
  // <div className='header'>
  <HeaderContainer>
    {/*  <Link className='logo-container' to='/'> */}
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    {/* </Link> */}
    {/* <div className='options'> */}
    <OptionsContainer>
      {/* <Link className='option' to='/shop'> */}
      <OptionLink to='/shop'>SHOP</OptionLink>
      {/* </Link> */}
      {/* <Link className='option' to='/shop'> */}
      <OptionLink to='/shop'>CONTACT</OptionLink>
      {/*  </Link> */}
      {currentUser ? (
        //<div className='option' onClick={() => auth.signOut()}>
        //<OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>

        // Note !! another option: by "<OptionLink" as(property) and passing in the string of the
        //    element we want (in this case ='div') /Or/
        //    even pass a component as={'component'} and omit the import of 'css'
        <OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        //</div>
        /* <Link className='option' to='/signin'> */
        <OptionLink to='/signin'>SIGN IN</OptionLink>

        /* </Link> */
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
  //</div>
);

// this "state" = is a root reducer
//const mapStateToProps = (state) => ({
/* const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  // currentUser: state.user.currentUser,
  currentUser,
  hidden,
}); */

// => for selectors :
/* const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state),
}); */

// Note !! for selectors - but if we have couple selectors -
//         instead to do it same thing couple of time => we will use our
//         "createStructuredSelector" call ->
//          and instead of passing it as a function - we just pass it like so where the
//          properties that we want, point to the correct selector, and then
//          "createStructuredSelector" will automatically pass our top of our state
//          that we get as our 'mapStateToProps' into each subsequent (שלאחר מכן) selector

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
