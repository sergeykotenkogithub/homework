    class Query {
        constructor(query) {
            this.query = query
            this.init()
        }
        init(){
          return document.querySelector(this.query)
        }
    }

    let containerClass = new Query('#basket-items')
    let container = containerClass.init()
    let wrapperClass = new Query('#basket-inner')
    let wrapper = wrapperClass.init()
    let totalContainerClass =  new Query('#basket-sum')
    let totalContainer = totalContainerClass.init()

    const basket = {
        items: [], // массив с товара и ценами
        url: 'https://raw.githubusercontent.com/sergeykotenkogithub/imageProject/main/json/basket.json',
        sum: 0,
        // container: null, // basket-items (В DOM <div> с товарами и ценами)
        // wrapper: null, //basket all
         // 
        // totalContainer: null,
        // Инициализация. Основное
        init() { 
            
            // this.container = document.querySelector('#basket-items');            
            // this.wrapper = document.querySelector('#basket-inner');
            // this.totalContainer = document.querySelector('#basket-sum');

           //async
          this._get(this.url) //Метод подключения к json на git
          .then(basket => { // название basket не влияет
            
            
            this.items = basket.content; // content из url файла
            // itemss = basket.content
            
            
            
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
                htmlStr += this.renderBasketTemplate(item, i);
            });
            container.innerHTML = htmlStr;
            this._calcSum();
        },

        // Подсчёт стоимости общей
        _calcSum() {
            this.sum = 0;
            this.items.forEach(item => {
                this.sum += item.amount * item.productPrice;
            });

            totalContainer.innerText = this.sum;
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
            wrapper.classList.toggle('hidden')
            // toggle убирает класс, а если есть то добовляет, вот и получается что при нажатиее он показывается, а при втором закрывается (hidden в _header.scss)
           });
           
            //Удаление
            container.addEventListener('click', event => {
            if(event.target.name == 'remove') {
                this._remove(event.target.dataset.id)
            }
        });
        },

        renderBasketTemplate(item, i) {
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
    }
    basket.init();




