import React from 'react';
import { connect } from 'react-redux';

//import CustomButton from '../custom-button/custom-button.component';
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

//import './collection-item.styles.scss';
import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from './collection-styles.styles';

//const CollectionItem = ({ id, name, price, imageUrl, addItem }) => (
/* const CollectionItem = ({ item, addItem }) => { */
// because of the change ("{()}") - we add "return"
// also add this below line - destructuring the cut of from above
//                           "id, name, price, imageUrl" : except "id" because we don't
//                           need - since of "item"
/*  const { name, price, imageUrl } = item;
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
}; */

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <BackgroundImage className='image' imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={() => addItem(item)} inverted>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

/* const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
}); */

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
