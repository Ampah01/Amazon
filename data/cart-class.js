export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) ||
[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryOptionId: '3'
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2'
}];

}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
};

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
         matchingItem = cartItem;
    };
  
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector);

  if (matchingItem) {
    matchingItem.quantity += quantity;  
  } else { 
    cart.push({
    productId,
    quantity,
    //For new product, deliveryOptionId will be defaulted to '1'
    deliveryOptionId: '1'
  });
  };

  saveToStorage();
};
export function calculateCartQuantity(){
      
  let cartQuantity = 0;
    
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;   
  }); 
  
  document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantity;
}


export function removeFromCart(productId) {

  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    };
  });
  cart = newCart;
  saveToStorage();
};

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}
//We need the product i want to update and the delivery option the will be chosen
// we have to loop through the cart to find the product first and update the delivery option of that product
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
         matchingItem = cartItem;
    };  
  });

  matchingItem.deliveryOptionId = deliveryOptionId
  saveToStorage()
}