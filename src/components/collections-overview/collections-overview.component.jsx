import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview';
//import { selectCollections } from '../../redux/shop/shop.selectors.js';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
//import './collections-overview.styles.scss';
import { CollectionsOverviewContainer } from './collections-overview.styles';

/* const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
); */

const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  //collections: selectCollections,
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
