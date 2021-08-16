import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

//const CollectionPage = ({ match }) => /*  ( */ {
//console.log(match.params.collectionId);
const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  //console.log(collection);
  return (
    <div className='collection-page'>
      {/* <h2>COLLECTION PAGE</h2> */}
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// The first parameter - we know is the "state" -> which is overall reducers
//              state from the top
// The second argument - called "ownProps" - which is the props of the
//  component that we're wrapping in our connect - which is really convenient
//  for this exact purpose
const mapStateToProps = (state, ownProps) => ({
  // "ownProps" => gives us all of the props that we're getting on our
  //  collection page component, including our "match" object that we get
  //  from the "Route" component that is passing our collection "shoPage"
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
