function initBasket() {
    // Товары
    let TITLES = [
        'MANGO PEOPLE T-SHIRT',
        'BANANA PEOPLE T-SHIRT',
    ];
    let PRICES = [52, 68]; // ЦЕНЫ
    let AMOUNTS = [4, 2]; // Сколько штук данного товара

    const basket = {
        items: [], // массив с товара и ценами
        total: null,
        container: null, // basket-items (В DOM <div> с товарами и ценами)
        wrapper: null, //basket all
        sum: 0, // 
        totalContainer: null,

        // Инициализация. Основное
        init() { 
            this.container = document.querySelector('#basket-items');
            this.wrapper = document.querySelector('#basket-inner');
            this.totalContainer = document.querySelector('#basket-sum');
            this.items = getBasketItems(TITLES, PRICES, AMOUNTS);
            this._render();
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
                this.sum += item.productAmount * item.productPrice;
            });

            this.totalContainer.innerText = this.sum;
        },

        // ДЗ
        add(item) {
           console.log(item);
           //если товара в корзине нет, то его надо добавить
           //если он там уже есть, то добавить количество
           // перерендер (соотв и персчет)
        },
        _remove() {
            //реализовать
        },
        _handleEvents() {
            // +++ организовать скрытие/показ корзины по клику а не по ховеру
        }
    }

    return basket
    // basket.init();
}




function getBasketItems(TITLES, PRICES, AMOUNTS) {
    let arr = [];

    for (let i = 0; i < TITLES.length; i++) {
        arr.push(createBasketItem(i, TITLES, PRICES, AMOUNTS));
    }

    return arr;
}

// Возврат индексов
function createBasketItem(index, TITLES, PRICES, AMOUNTS) {
    return {
        productName: TITLES[index],
        productPrice: PRICES[index],
        productAmount: AMOUNTS[index],
        productId: `prod_${index + 1}` //'prod_1'
    }
}


// Вывод DOM цикла с объектов (товары и цены)
function renderBasketTemplate(item, i) {
    return `
    <div class="cartFlex">
        <div><img   src="../src/assets/images/buy${i + 1}.jpg" alt="buy4"></div>

        <div class="textCenterCart">
            <div class="textByCart">ORANGE PEOPLE T-S HIRT</div>
        <div>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        </div>                  
        <div class="priceCart">
            ${item.productAmount} x <span>${item.productPrice}</span> = $134
        </div>
        </div>
        <div class="cartCircle">
            <i class="far fa-times-circle faCart"></i>
        </div>        
    </div> 
    <div class="horizontal cartHorizontal"></div>   
`
}




