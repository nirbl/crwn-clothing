// cartItems = argument of all existing cart items that are in our cart items array right now
// cartItemToAdd = second argument CartItem that we want to add
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // if it's true -> will and cartItems defined - will return the first item found in our
  //                array - based in on condition that we pass in here (in the find function)
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // if the item isnt found inside of our array -> then we want to return a new array
  //   - with all of our existing cartItems that were already there
  //     + but we also want to add in an object which is equal to our cartItem to add,
  //     except we're going to give it a vast quantity of one
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  // "quantity" =  quantity property gets attached the first time around
  //               since this if block (above!) won't run when it's a new item !
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
