class Cart { 
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ||
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

    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }

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
    }

    calculateCartQuantity() {
        
      let cartQuantity = 0;
        
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;   
      }); 
      
      document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
    }

    removeFromCart(productId) {
  
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        };
      });
      this.cartItems = newCart;
      this.saveToStorage();
    }

    updateQuantity(productId, newQuantity) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.quantity = newQuantity;
    
      this.saveToStorage();
    }
  
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
  
  const cart = new Cart('cart-oop');
  const businessCart = new Cart('cart-business');

