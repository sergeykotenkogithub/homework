function initBasket() {
    // Товары
    // let TITLES = [
    //     'MANGO PEOPLE T-SHIRT',
    //     'BANANA PEOPLE T-SHIRT',
    // ];
    // let PRICES = [52, 68]; // ЦЕНЫ
    // let AMOUNTS = [4, 2]; // Сколько штук данного товара

    const basket = {
        items: [], // массив с товара и ценами
        total: null,
        url: 'https://raw.githubusercontent.com/sergeykotenkogithub/imageProject/main/json/basket.json',
        container: null, // basket-items (В DOM <div> с товарами и ценами)
        wrapper: null, //basket all
        sum: 0, // 
        totalContainer: null,
        clickCart: null,
        // Инициализация. Основное
        init() { 
            this.clickCart = document.querySelector('#clickCart');
            this.container = document.querySelector('#basket-items');
            this.wrapper = document.querySelector('#basket-inner');
            this.totalContainer = document.querySelector('#basket-sum');
            // this.items = getBasketItems(TITLES, PRICES, AMOUNTS);

           //async
          this._get(this.url) //Метод подключения к json на git
          .then(basket => { // название basket не влияет
            this.items = basket.content;
            this._render();
            this._handleEvents();
          });
            // this._handleEvents2()
        },

        _get(url) {
            return fetch(url).then(d => d.json()) // сделает запрос за джейсоном, дождётся ответа и преобразует json в объект, который вернётся из даного метода
        },
    
        _render() {
            let htmlStr = '';

            this.items.forEach((item, i) => {
                htmlStr += renderBasketTemplate(item, i);
            });
            this.container.innerHTML = htmlStr;
            this._calcSum();
        },

        // Подсчёт стоимости общей
        _calcSum() {
            this.sum = 0;
            this.items.forEach(item => {
                this.sum += item.amount * item.productPrice;
            });

            this.totalContainer.innerText = this.sum;
        },

        // В item мы пробрасываем объект, содержащий данные в том числе и id
        // item мы находим через catalog.js
        add(item) {      
           let find = this.items.find(el => item.productId == el.productId);

           if(find) {
               find.amount++
           } else {
               this.items.push(Object.assign({}, item, {amount: 1}));
           }

           this._render();
           //если товара в корзине нет, то его надо добавить
           //если он там уже есть, то добавить количество
           // перерендер (соотв и персчет)
        },
        // 
        _remove(id) {            
            let find = this.items.find(el => el.productId == id);

            if(find.amount > 1) {
                find.amount--;
            } else {
                this.items.splice(this.items.indexOf(find), 1) // 1 - значит 1 элемент
            }

            this._render();
        },
        _handleEvents() {          
           document.querySelector('#basket-btn').addEventListener('click', e => {
            this.wrapper.classList.toggle('hidden')
            // toggle убирает класс, а если есть то добовляет, вот и получается что при нажатиее он показывается, а при втором закрывается (hidden в _header.scss)
           });
           
            //Удаление
           this.container.addEventListener('click', event => {
            if(event.target.name == 'remove') {
                this._remove(event.target.dataset.id)
            }
        });
        },
        // _handleEvents2() {
        //     document.addEventListener("click", event => {
        //         if(event.target.offsetParent.id != 'clickCart')
        //         this.wrapper.style.display="none";
        //     }
        // )},
    }

    return basket
    // basket.init();
}




// function getBasketItems(TITLES, PRICES, AMOUNTS) {
//     let arr = [];

//     for (let i = 0; i < TITLES.length; i++) {
//         arr.push(createBasketItem(i, TITLES, PRICES, AMOUNTS));
//     }

//     return arr;
// }

// // Возврат индексов
// function createBasketItem(index, TITLES, PRICES, AMOUNTS) {
//     return {
//         productName: TITLES[index],
//         productPrice: PRICES[index],
//         productAmount: AMOUNTS[index],
//         productId: `prod_${index + 1}` //'prod_1'
//     }
// }


// Вывод DOM цикла с объектов (товары и цены)
function renderBasketTemplate(item, i) {
    return `
    <div class="cartFlex">
        <div><img   src="${item.productImg}" alt="buy4"></div>

        <div class="textCenterCart">
            <div class="textByCart">${item.productName}</div>
        <div>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        </div>                  
        <div class="priceCart">
            ${item.amount} x <span>${item.productPrice}</span> = ${item.amount * item.productPrice}
        </div>
        </div>
        <div class="cartCircle">
            <a href="#" class="far fa-times-circle faCart" name="remove" data-id="${item.productId}"></a>
        </div>        
    </div> 
    <div class="horizontal cartHorizontal"></div>   
`
}




