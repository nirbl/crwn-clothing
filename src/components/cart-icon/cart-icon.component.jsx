import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

//const CartIcon = ({ toggleCartHidden }) => (
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    {/* <span className='item-count'>0</span> */}
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

/* const mapStateToProps = ({ cart: { cartItems } }) => ({
  //Note !!  The author demonstrates that we calling every - whenever any reduce updates
  //      by the reducer - we always returning a new object - the redux recomposed
  //      and rebuilds the entire state object -> mapStateToProps is actually getting
  //      called every single time, which is always passing in new props to our components.
  //      This important because this is always !! re-rendering our component!!  (since every
  //       change of state og "singnIn/signOut" by state of "currentUser" our mapStateToProps
  //       keep firing )

  //console.log('I am being called')
  //return {
  itemCount: cartItems.reduce(
    // (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  ),
  //}
}); */

// Note!! instead of "mapStateToProps" above and the continue below "reduce" we will write
//    we're passing the whole reducers "state"  into the selector
/* const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
}); */

// for createStructuredSelector({})
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

//export default connect(null, mapDispatchToProps)(CartIcon);
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
