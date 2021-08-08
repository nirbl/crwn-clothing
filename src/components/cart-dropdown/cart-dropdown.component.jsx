import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
// for the selectors
import { selectCartItems } from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
  <div className='cart-dropdown'>
    {/* <div className='cart-items' /> */}
    <div className='cart-items'>
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

/* const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
}); */
// instead above "mapToStateProps" implemented we will convert for selectors implemented:
//   -- This will make sure that our cart-dropdown component is not getting re-rendered
//      whenever the state changes, that's unrelated to the cart-item -
//      and therefore our cart-dropdown and our cart-icon component do not need to re-render
//      which helps save us on performance
const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(CartDropdown);
