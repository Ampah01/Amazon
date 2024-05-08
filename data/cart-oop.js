function Cart(localStorageKey){

const cart = {
  cartItems: undefined,

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ||
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
    },
  

   saveToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
  },

  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
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
      this.cartItems.push({
      productId,
      quantity,
      //For new product, deliveryOptionId will be defaulted to '1'
      deliveryOptionId: '1'
    });
    };
  
    this.saveToStorage();
  },

  calculateCartQuantity() {
      
    let cartQuantity = 0;
      
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;   
    }); 
    
    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
  },

  removeFromCart(productId) {

    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      };
    });
    this.cartItems = newCart;
    this.saveToStorage();
  },

  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    this.saveToStorage();
  },

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
           matchingItem = cartItem;
      };  
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId
    this.saveToStorage()
  }
}

   return cart;
}


const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);


 
//We need the product i want to update and the delivery option the will be chosen
// we have to loop through the cart to find the product first and update the delivery option of that product