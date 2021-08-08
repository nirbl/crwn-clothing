import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

//const CollectionItem = ({ id, name, price, imageUrl, addItem }) => (
const CollectionItem = ({ item, addItem }) => {
  // because of the change ("{()}") - we add "return"
  // also add this below line - destructuring the cut of from above
  //                           "id, name, price, imageUrl" : except "id" because we don't
  //                           need - since of "item"
  const { name, price, imageUrl } = item;
  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />

      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
    //);
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
