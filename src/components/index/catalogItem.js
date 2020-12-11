// export default class CatalogItem {
//     constructor(item){
//         this.item = item
//     }
//     render(){
//         return `
//     <div class="featuredBuyItem" id="catalog">
//     <!-- <a href="#"> Ссылка a, если надо, можно раскоментить -->
//       <div class="addToCart">
//         <div class="coverAddtoCart">
//           <div>
//             <!-- Задний фон картинки -->
//             <button class="backColor newBackColor"
//                           name="add"
//                           data-id="${this.item.productId}"
//                       >
//                       <img class="cartBuy" src="../src/assets/images/carsBuy.png" alt="cartBuy" />
//                       &nbsp ADD TO CART
//                       </button>          
//           </div>
//         </div>
//       </div>
//       <div><img src="${this.item.productImg}" /></div>
//     <!--  </a> -->
//     <div class="name_buy_item">${this.item.productName}</div>
//     <div class="price_item">$${this.item.productPrice}</div>
//   </div>
//     `
//     }
// }