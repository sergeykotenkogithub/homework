const catalog = {
  items: [],
  container: null,
  basket: null,
  url:
    "https://raw.githubusercontent.com/sergeykotenkogithub/imageProject/main/json/catalog.json",
  init(basket) {
    this.container = document.querySelector("#catalog");
    // this.items = getCatalogItems(TITLES, PRICES);
    this.basket = basket;

    //async
    this._get(this.url) //Метод подключения к json на git
      .then((catalog) => {
        this.items = catalog;
        this._render();
        this._handleEvents();
      });
  },

  // Метод подключения к json на git
  _get(url) {
    return fetch(url).then((d) => d.json()); // сделает запрос за джейсоном, дождётся ответа и преобразует json в объект, который вернётся из даного метода
  },

  _render() {
    let htmlStr = "";

    this.items.forEach((item, i) => {
      htmlStr += this.renderCatalogTemplate(item, i);
    });
    this.container.innerHTML = htmlStr;
  },

  _handleEvents() {
    this.container.addEventListener("click", (event) => {
      if (event.target.name == "add") {
        // console.log('КУПЛЕНО!')
        let id = event.target.dataset.id; //from data-id
        let item = this.items.find((el) => el.productId == id);

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
    `;
  },
};

catalog.init(basket);
