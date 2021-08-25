import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

//import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
// for the selectors
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

//import './cart-dropdown.styles.scss';
import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer,
} from './cart-dropdown.styles';

//const CartDropdown = ({ cartItems }) => (
//const CartDropdown = ({ cartItems, history, dispatch }) => (
//<div className='cart-dropdown'>
/* <div className='cart-items' /> */
/*  <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div> */
/* <CustomButton>GO TO CHECKOUT</CustomButton> */
/* <CustomButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div> */
//);

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

/* const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
}); */
// instead above "mapToStateProps" implemented we will convert for selectors implemented:
//   -- This will make sure that our cart-dropdown component is not getting re-rendered
//      whenever the state changes, that's unrelated to the cart-item -
//      and therefore our cart-dropdown and our cart-icon component do not need to re-render
//      which helps save us on performance
/* const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
}); */

// for - createStructuredSelector({})
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

//export default connect(mapStateToProps)(CartDropdown);
export default withRouter(connect(mapStateToProps)(CartDropdown));
