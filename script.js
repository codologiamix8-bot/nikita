const headerTitle = document.querySelector('.logo h1');
headerTitle.addEventListener('click', function() {
    const messages = [
        '100% От дохода поставляется создателю!',
        'А вы знали чем отличается ядерный реактор от термоядерного?',
        'бубу бебе',    
        'Купите что-нибудь или не заходите на сайт!',    
        'Все права защищены никем и никогда не были защищены!',
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    this.textContent = messages[randomIndex];       
});

let h1ClickCount = 0;
headerTitle.addEventListener('click', function() {
    h1ClickCount = h1ClickCount + 100;
    if (h1ClickCount === 1000) {
        alert('Вы нажали на заголовок 1000 раз! Автокликер?))))');
        h1ClickCount = 0;
    }
});

const productDetails = [
    ['Самая лучшая посудомойка чтобы лениться и не мыть посуду', 'Моет посуду прям как(нейронка не справилась).', '⭐9/10'],
    ['она сожрет все ваше электричство, но зато вы сможете поиграть в доту, а это самое лучшее в мире :)', 'энергопотребление несколько мегаватт', '⭐10/01'],
    ['Самая умная умнейшая колонка яндекс, к слову реально хорошая имба', 'дорогоправдаписецаааааа', '⭐100000/100000'], 
    ['пс5 чтобы играть.... ну в гта я хз... шестую например)', 'бебе бубу', '⭐0.01/100'], 
    ['Эпл макбук омг премиум АИР!!!', 'заряда хватает на пару наносек', '⭐1/10'], 
    ['Дождались! ГТА 6 эксклюзивно только в нашем магазине!', 'бубу бебе', '⭐1000/1000' ],
    ['Робот - пылесос, чтобы еще больше лениться!', 'работает с алисой', '⭐10/10'],
    ['Старая добрая вкусная пепперони... Идеальна для... сьедания!!!', '💥10510910397/имба'],
    ['этот обогреватель с̶о̶ж̶ж̶ё̶т̶ ̶в̶а̶ш̶у̶ ̶к̶в̶а̶р̶т̶и̶р̶у̶ обогреет всю квартиру', 'энергопотребление несколько йоттаватт', '⭐999/1000-7'],
    ['Датчик который показывает температуру с точностью в 100 градусов', 'Работает от батареек около 1 миллисекунды~', '⭐?/10'],
    ['Лучший телефон для гей-минга', 'Очень дорогой, идеально подходит для понтов', '⭐11/10']
];

document.querySelectorAll('.product-card').forEach(function(card,i){
    const info = card.querySelector('.product-info');
    const footer = card.querySelector('.product-footer');
    if (!info || !footer) return;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';
    detailsDiv.style.display = 'none';
    detailsDiv.innerHTML = '<div>'+(productDetails[i] || productDetails[0]).map(item=> `<div>${item}</div>`).join('')+'</div>';
    info.insertBefore(detailsDiv, footer);

    const btn = document.createElement('button');
    btn.className = 'details-btn';
    btn.textContent = 'Подробнее';
    footer.insertBefore(btn,footer.querySelector('.add-to-cart-btn'));

    let isVisible = false;
    btn.addEventListener('click',function() {
        isVisible = !isVisible;
        if (isVisible) {
            detailsDiv.style.display = 'block';
            btn.textContent = 'Скрыть';
        } else {
            detailsDiv.style.display = 'none';
            btn.textContent = 'Подробнее';
        }
    });
});

const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.style.cssText = 'position: fixed; right: 20px; bottom: 20px; width: 50px; height: 50px; border-radius: 50%; background: rgb(125, 0, 174); color: black; font-size: 24px; border: none; cursor: pointer; z-index:1000; transition: all 0.3s;';
document.body.appendChild(scrollTopBtn);
window.addEventListener('scroll',function() {
    scrollTopBtn.style.display = window.scrollY > 800 ? 'block' : 'none';
}); 
scrollTopBtn.addEventListener('click',function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function filterProducts(FilterType) {
    const productCards = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${FilterType}'`)){
            btn.classList.add('active');
        }
    });   
    productCards.forEach(function(card){
        const priceElement = card.querySelector('.price');
        if (!priceElement) return;
        const priceText = priceElement.textContent;
        const price = parseInt(priceText.replace(/\D/g, ''));
        let showProduct = false;
        if (FilterType === 'all'){
            showProduct = true;
        } else if (FilterType === 'cheaplow'){
            showProduct = price < 10000;
        } else if (FilterType === 'mediumnormal'){
            showProduct = price >= 10000 && price < 25000;
        } else if (FilterType === 'expensivehigh'){
            showProduct = price >= 25000;
        }
        card.style.display = showProduct ? '' : 'none';
    });
}

let cart = [];

function addToCart(productName, price) {
    const item = cart.find(i => i.name === productName);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: productName, price, quantity: 1 });
    }
    updateCart();
    alert(`Товар "${productName}" добавлен в корзину за ${price} рублей`);
}

function removeFromCart(productName) { 
    cart = cart.filter(i => i.name !== productName);
    updateCart();
}

function changeQuantity(productName, delta) {
    const item = cart.find(i => i.name === productName);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productName);
    } else {
        updateCart();
    }
}

function clearCart() {
    cart = [];
    updateCart();
    alert('Корзина очищена');
}

function checkout() {
    if (!cart.length) {
        alert('Корзина пуста'); 
        return;
    }
    const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    alert(`Заказ оформлен!\nКоличество товаров: ${totalQuantity}\nСумма заказа: ${totalPrice} руб.`);
    showOrderModal();
}

function updateCart() {
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    if (!itemsEl) return;

    itemsEl.innerHTML = '';
    if (cart.length === 0) {
        itemsEl.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        if (totalEl) totalEl.style.display = 'none';
        if (countEl) countEl.textContent = '0';
        return;
    }

    if (totalEl) totalEl.style.display = 'block';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.price} руб.</div>
            <div class="item-quantity">
                <button class="quantity-btn" data-name='${item.name.replace(/'/g, "&#39;")}' data-delta="-1">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-name='${item.name.replace(/'/g, "&#39;")}' data-delta="1">+</button>
            </div>
            <div class="item-total">${itemTotal} руб.</div>
            <button class="remove-btn" data-name='${item.name.replace(/'/g, "&#39;")}'>✖</button>
        `;
        itemsEl.appendChild(row);
    });

    const totalSpan = document.getElementById('total-price');
    if (totalSpan) totalSpan.textContent = total;
    if (countEl) countEl.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        if (!card) return;
        const name = card.querySelector('h3')?.textContent;
        const priceEl = card.querySelector('.price');
        if (!name || !priceEl) return;
        const price = parseInt(priceEl.textContent.replace(/\D/g, ''));
        addToCart(name, price);
    });
});

document.getElementById('clear-cart-btn')?.addEventListener('click', clearCart);
document.getElementById('checkout-btn')?.addEventListener('click', checkout);

updateCart();

function setTheme(theme) {
    if (theme === 'dark'){
        document.body.classList.add('dark-theme');
        const btn = document.getElementById('theme-switcher');
        if (btn) btn.textContent = 'light';
    } else {
        document.body.classList.remove('dark-theme');
        const btn = document.getElementById('theme-switcher');
        if (btn) btn.textContent = 'dark';
    }
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme('dark');
} else {
    setTheme('light');
}

const themeSwitcher = document.getElementById('theme-switcher');
if (themeSwitcher) {
    themeSwitcher.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark-theme');
        setTheme(isDark ? 'light' : 'dark');
    });
}

// Модальное окно (исправлены опечатки)
const modal = document.getElementById('order-modal');
const closeModal = document.querySelector('.close-modal');
const cancelOrder = document.getElementById('cancel-order');
const orderForm = document.getElementById('order-form'); 

function showOrderModal() {
    if (modal) modal.style.display = 'flex';
}

function closeOrderModal() {
    if (modal) {
        modal.style.display = 'none';
        orderForm?.reset();
    }
}

if (closeModal) closeModal.addEventListener('click', closeOrderModal);
if (cancelOrder) cancelOrder.addEventListener('click', closeOrderModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeOrderModal();
});

function validateCardNumber(card) {
    const cleaned = card.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
}

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const deliveryTime = document.getElementById('delivery-time').value;
        const cardNumber = document.getElementById('card-number').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (!fullname || !phone || !address || !cardNumber || !cvv) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 11) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }

        if (!validateCardNumber(cardNumber)) {
            alert('Пожалуйста, введите корректные данные карты');
            return;
        }

        const orderData = {
            customer: fullname,
            phone: phoneDigits,
            address,
            deliveryTime: deliveryTime || "как можно скорее",
            cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
            items: cart.map(i => `${i.name} x ${i.quantity} = ${i.price * i.quantity} руб.`).join(', '),
            total: cart.reduce((s,i) => s + i.price * i.quantity, 0)
        };
        console.log('Заказ отправлен:', orderData);
        alert(`Ваш заказ оформлен, ${fullname}! Сумма: ${orderData.total} руб.`);
        closeOrderModal();
        clearCart();
    });
}

window.checkout = function() {
    if (!cart.length) {
        alert('Корзина пуста');
        return;
    }
    showOrderModal();
};