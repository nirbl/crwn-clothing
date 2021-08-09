import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  // the first argument can be either an array of our input selectors
  // and the last argument being the function that gets
  //     the return of this input selector ("[selectorUser]") => so our user reducer "(user)"
  // -> (and by "=>") wil return 'user.currentUser'

  [selectUser],
  (user) => user.currentUser
);

// now we will make the one for our hidden - in the file "cart.selectors.js"
