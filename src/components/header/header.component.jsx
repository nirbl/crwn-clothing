import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

//const Header = () => (
//const Header = ({ currentUser }) => (
const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
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
