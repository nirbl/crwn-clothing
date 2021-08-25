import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Note !! "compose" => lets us pass these in (below "CollectionsOverviewContainer") by just calling the function
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

/* const CollectionsOverviewContainer = connect(mapStateToProps)(
  WithSpinner(CollectionsOverview)
); */

// note !! instead 2 rows above - as for by import "compose" we will write:
// ==> it's essentially carrying (נושא/מחזיק) all of our functions together, "compose" evaluates(מחשב/חישוב/מעריך) from right to left
// so it will evaluate "WithSpinner" first by passing in the collections overview to that (=CollectionsOverview) and
//  and then passing that to our. The same way that we saw it earlier.
//  ==> it just allows us to evaluate multiple carried (נלקחים) function - where the functions return another function that expects something
//     to passed to it and allows us chain them all together like this.
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
