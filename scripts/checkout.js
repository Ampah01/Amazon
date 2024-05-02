import {cart, 
  removeFromCart, 
  updateQuantity,
  updateCartQuantity,
  updateDeliveryOption,
} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

//Today's date and then we add 7 days to the date
/* const today = dayjs();
const deliveryDate =  today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM, D')) */


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  //normalizing the data to match the productId to the product.id to get matchingProduct
  products.forEach((product) => {
  if (product.id === productId) {
    matchingProduct = product;
  }
});

const deliveryOptionsId = cartItem.deliveryOptionId;
//normalizing data to match the deliveryOptions to a macthingDelivery
 let deliveryOption;

 deliveryOptions.forEach((option) => {
  if(option.id === deliveryOptionsId) {
      deliveryOption = option
  }
 });

 const today = dayjs();
 const deliveryDate =  today.add(deliveryOption.deliveryDays, 'days');
 const dateString = deliveryDate.format('dddd, MMMM, D');

cartSummaryHTML +=
  `
<div class="cart-item-container 
 js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: ${dateString}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary
        js-update-link" data-product-id = "${matchingProduct.id}">
          Update
        </span>
        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
        <span class="save-quantity-link link-primary js-save-link"
        data-product-id="${matchingProduct.id}">
        Save
        </span>
        <span class="delete-quantity-link link-primary
        js-delete-link" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${deliveryOptionsHTML(matchingProduct, cartItem)}
    </div>
  </div>
</div>
`
});


document.querySelector('.js-order-summary')
 .innerHTML = cartSummaryHTML;

 //loop through the DeliveryOption imported and html for deliveryDays;
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {  
  const today = dayjs();
  const deliveryDate =  today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM, D');

  const priceString = deliveryOption.priceCents === 0 
      ? 'FREE' 
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

      //Check the input that correspond to the one in the cart;
      // You can also insert a ternary operator when creating html;
  const isChecked = deliveryOption.id === cartItem.deliveryOptionId
    
      html += `
      <div class="delivery-option js-delivery-option" 
      data-product-id=${matchingProduct.id}
      data-delivery-option-id=${deliveryOption.id}>
          <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping  
          </div>
        </div>
      </div>
    `
  })

  return html;
};

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
 element.addEventListener('click',() => {
   const {productId, deliveryOptionId} = element.dataset
   updateDeliveryOption(productId, deliveryOptionId);
 })
})
 
updateCartQuantity();
document.querySelectorAll('.js-delete-link')
 .forEach((link) => {
  link.addEventListener('click',() => {
    const {productId} = link.dataset;
    removeFromCart(productId);

   const container = document.querySelector(`.js-cart-item-container-${productId}`);
    
   container.remove(); 
   updateCartQuantity(); 
  });
 });


 let cartQuantity = 0;
    
 cart.forEach((cartItem) => {
   cartQuantity += cartItem.quantity;   
 }); 
 

document.querySelector('.js-return-to-home-link')
.innerHTML = `${cartQuantity} items`;


document.querySelectorAll('.js-update-link')
 .forEach((link) => {
    link.addEventListener('click', () => {
    const {productId} = link.dataset;
    
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
        updateCartQuantity();

    })
 });

 document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

      let newQuantity = Number(quantityInput.value);
      updateQuantity(productId, newQuantity);
      updateCartQuantity();
    })
  });


 

