// class Query в basket.js

let urlClassCatalog = new Query('https://raw.githubusercontent.com/sergeykotenkogithub/imageProject/main/json/catalog.json')
let urlCatalog = urlClassCatalog.get()  
let containerClassCatalog = new Query('#catalog')
let containerCatalog = containerClassCatalog.init()

const catalog = {
    items: [],
    // container: null,
    basket: null,
    init(basket) {
        this.basket = basket;

        //async //Метод подключения к json на git
        urlCatalog.then(catalog => {
          this.items = catalog; // тут items был массивом (можно даже ему null задать, ничего не поменяется) и стал подтягивать массив из url
          this._render();
          this._handleEvents();
        });
    },

    _render() {
        let htmlStr = '';

        this.items.forEach((item, i) => {
            htmlStr += this.renderCatalogTemplate(item, i);
        });
        containerCatalog.innerHTML = htmlStr;
    },

    _handleEvents() {
      containerCatalog.addEventListener('click', event => {
            if(event.target.name == 'add') {
                // console.log('КУПЛЕНО!')
                let id = event.target.dataset.id; //from data-id
                let item = this.items.find(el => el.productId == id);

                // item = Object.assign({}, item, { productAmount: 1 });
                this.basket.add(item);
                // Находим товар, в basket.js мы добавляем
            }
        });
    },
    renderCatalogTemplate(item, i) {
      return `
      <div class="featuredBuyItem" id="catalog">
      <!-- <a href="#"> Ссылка a, если надо, можно раскоментить -->
        <div class="addToCart">
          <div class="coverAddtoCart">
            <div>
              <!-- Задний фон картинки -->
              <button class="backColor newBackColor"
                            name="add"
                            data-id="${item.productId}"
                        >
                        <img class="cartBuy" src="../src/assets/images/carsBuy.png" alt="cartBuy" />
                        &nbsp ADD TO CART
                        </button>          
            </div>
          </div>
        </div>
        <div><img src="${item.productImg}" /></div>
      <!--  </a> -->
      <div class="name_buy_item">${item.productName}</div>
      <div class="price_item">$${item.productPrice}</div>
    </div>
      `
    }
};

catalog.init(basket)

