import React from 'react';
import { Route } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { createStructuredSelector } from 'reselect';

//import SHOP_DATA from './shop.data.js';
//import CollectionPreview from '../../components/collection-preview/collection-preview.jsx';

//import { selectCollections } from '../../redux/shop/shop.selectors.js';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

/* class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  } */

//render() {
//return <div>SHOP PAGE</div>;

//const ShopPage = ({ collections }) => (
// Note !! we access to the "match" object because inside of our App.js
//        our ShopPage  is being nested in a Route, and Route automatically
//        passed those three objects in to our component as props,
//        we get have "match" / "location" and "history"
//        we want "match" because we want to display -> {`${match.path}`}
const ShopPage = ({ match } /* { */) => (
  //const { collections } = this.state;
  //return (
  /* console.log(match);
  return ( */
  <div className='shop-page'>
    {/* {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))} */}
    {/* <CollectionsOverview /> */}
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);
//};
// }
//}

/* const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
}); */

//export default connect(mapStateToProps)(ShopPage);
export default ShopPage;
