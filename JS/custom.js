 // Wait for the DOM to be ready
 document.addEventListener("DOMContentLoaded", function () {
    // Open mobile menu when hamburger button is clicked
    document.querySelector('.menu-toggle').addEventListener('click', function () {
        document.getElementById('mobileNav').classList.add('open');
    });

    // Close mobile menu when 'X' button is clicked
    document.querySelector('.menu-close').addEventListener('click', function () {
        document.getElementById('mobileNav').classList.remove('open');
    });
});

    $(window).scroll(function() {
        var navbar = $('.navbar-fixed-top');
        if ($(this).scrollTop() > 50) {
            navbar.addClass('fixed-top');
        } else {
            navbar.removeClass('fixed-top');
        }
    });
// counter
    $(document).ready(function(){
        $(".odometer").each(function(){
            var count = $(this).attr('data-count');
            var el = $(this).get(0);
            var od = new Odometer({
                el: el,
                value: 0,
                format: 'd',
                theme: 'default'
            });
            od.update(count);
        });
    });
    // brand trang gioi thieu
    document.addEventListener('DOMContentLoaded', function() {
        var swiperElement = document.querySelector('.thm-swiper__slider');
        if (swiperElement) {
            var swiperOptions = swiperElement.getAttribute('data-swiper-options');
            try {
                var parsedOptions = swiperOptions ? JSON.parse(swiperOptions) : {};
                var swiper = new Swiper('.thm-swiper__slider', parsedOptions);
            } catch (e) {
                console.error('Invalid JSON in data-swiper-options:', e);
            }
        } else {
            console.error('Swiper element not found.');
        }
    });
    
    // Lien hệ
    function sendMail() {
        var name = document.getElementById("from_name").value.trim();
        var email = document.getElementById("email_id").value.trim();
        var phone = document.getElementsByName("phone")[0].value.trim();
        var subject = document.getElementsByName("subject")[0].value.trim();
        var message = document.getElementById("message").value.trim();
    
        // Kiểm tra xem các trường bắt buộc đã được nhập đúng không
        if (name === '' || email === '' || phone === '' || subject === '' || message === '') {
            alert('Vui lòng điền đầy đủ thông tin vào tất cả các trường.');
            return false; // Ngăn form được gửi nếu dữ liệu không hợp lệ
        }
    
        // Kiểm tra định dạng email
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailPattern)) {
            alert('Vui lòng nhập đúng định dạng email.');
            return false; // Ngăn form được gửi nếu email không hợp lệ
        }
    
        // Kiểm tra định dạng số điện thoại
        var phonePattern = /^\d{10,}$/;
        if (!phone.match(phonePattern)) {
            alert('Vui lòng nhập đúng định dạng số điện thoại.');
            return false; // Ngăn form được gửi nếu số điện thoại không hợp lệ
        }
    
        // Thực hiện xử lý gửi email bằng EmailJS nếu dữ liệu hợp lệ
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        }).then(function(response) {
            alert('Email đã được gửi thành công!');
        }, function(error) {
            alert('Đã xảy ra lỗi trong quá trình gửi email.');
        });
    
        return false; // Ngăn form gửi thông tin một cách truyền thống
    }
    // Wow.js
    new WOW().init();
    // Giỏ hàng///////////////////////////////////////////////
    $(document).ready(function() {

        $('.product__all-btn').on('click', function() {
            // Lấy thông tin sản phẩm từ DOM
            const productElement = $(this).closest('.product__all-single');
            const product = {
                id: productElement.data('id'),
                name: productElement.find('.product__all-title').text(),
                price: productElement.find('.product__all-price').text(),
                image: productElement.find('.product-img').attr('src'),
                quantity: 1
            };
    
            // Lấy giỏ hàng từ LocalStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            if (existingProductIndex >= 0) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }
    
            $('#cart-notification').fadeIn();

            setTimeout(function() {
                $('#cart-notification').fadeOut();
            }, 3000);
        });
    });
    
    
    
    // Trang giỏ hàng-------------------------------------------->
    document.addEventListener('DOMContentLoaded', function () {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.querySelector('.cart-items');
        const cartTotalElement = document.querySelector('.cart-total');
        const cartSubtotalElement = document.querySelector('.cart-subtotal');
    
        // Hiển thị sản phẩm trong giỏ hàng
        function renderCartItems() {
            cartContainer.innerHTML = "";
            if (cartItems.length === 0) {
                cartContainer.innerHTML = "<p>Giỏ hàng của bạn trống!</p>";
                cartTotalElement.textContent = "0 ₫";
                cartSubtotalElement.textContent = "0 ₫"; // Đặt subtotal về 0
                return;
            }
    
            cartItems.forEach((product, index) => {
                const itemPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, "")) || 0;
                const itemTotalPrice = itemPrice * (product.quantity || 1);
                cartContainer.innerHTML += `
                    <div class="cart-item">
                            <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                            <div>
                                <h3 class="cart-item-name">${product.name}</h3>
                                <p class="cart-item-price">Giá: ${itemPrice.toLocaleString('vi-VN')} ₫</p>
                                <div class="cart-item-quantity">
                                <span>Số Lượng:</span>
                                    <div class="row rounded border border-1 mx-1" style="width: fit-content;">
                                        <button class="quantity-decrease btn btn-outline-secondary" data-index="${index}">-</button>
                                        <input type="text" value="${product.quantity || 1}" class="quantity-input" min="1" data-index="${index}">
                                        <button class="quantity-increase btn btn-outline-secondary" data-index="${index}">+</i></button> 
                                    </div>
                                </div>
                                <p class="cart-item-total-price">Tổng: ${itemTotalPrice.toLocaleString('vi-VN')} ₫</p>
                            </div>
                            <button class="remove-item rounded border-1 btn btn-outline-dark" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
            });
            updateCartTotals(); // Cập nhật tổng sau khi render
            
        }
    
        // Tính tổng tiền
        function updateCartTotals() {
            let subtotal = 0;
            cartItems.forEach(item => {
                const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                subtotal += itemPrice * (item.quantity || 1);
            });
            
            // Cập nhật subtotal và total
            cartSubtotalElement.textContent = subtotal.toLocaleString('vi-VN') + ' ₫';
            cartTotalElement.textContent = subtotal.toLocaleString('vi-VN') + ' ₫'; 
        }
    
        // Cập nhật số lượng sản phẩm
        function updateQuantity(index, change) {
            cartItems[index].quantity += change;
            if (cartItems[index].quantity < 1) {
                cartItems[index].quantity = 1; 
            }
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems();
        }
    
        // Cập nhật số lượng qua input
        function updateQuantityFromInput(index, value) {
            const newValue = parseInt(value) || 1; 
            cartItems[index].quantity = newValue;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems();
        }
    
        // Xóa sản phẩm khỏi giỏ hàng
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const index = e.target.getAttribute('data-index');
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                renderCartItems();
            }
    
            // Tăng số lượng sản phẩm
            if (e.target.classList.contains('quantity-increase')) {
                const index = e.target.getAttribute('data-index');
                updateQuantity(index, 1);
            }
    
            // Giảm số lượng sản phẩm
            if (e.target.classList.contains('quantity-decrease')) {
                const index = e.target.getAttribute('data-index');
                updateQuantity(index, -1);
            }
        });
    
        // Thay đổi số lượng sản phẩm qua input
        document.body.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const index = e.target.getAttribute('data-index');
                updateQuantityFromInput(index, e.target.value);
            }
        });
    
        // Hiển thị giỏ hàng khi tải trang
        renderCartItems();
    });
    // Cart page````````````````````````````````````````````` 
// Hàm để cập nhật tất cả các badge có class 'cart-badge'
function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const badgeElements = document.querySelectorAll('.cart-badge'); 
    
    if (badgeElements.length > 0) { 
        const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0); 


        badgeElements.forEach(badge => {
            badge.textContent = itemCount; 
            badge.setAttribute('data-count', itemCount); 
        });
    }
}

// Gọi hàm `updateCartBadge` khi thêm sản phẩm vào giỏ hàng
$(document).ready(function() {
    $('.product__all-btn').on('click', function() {
        
        const productElement = $(this).closest('.product__all-single');
        const product = {
            id: productElement.data('id'),
            name: productElement.find('.product__all-title a').text(),
            price: productElement.find('.product__all-price').text(),
            image: productElement.find('.product-img').attr('src'),
            quantity: 1
        };

        // Lấy giỏ hàng từ LocalStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }


        localStorage.setItem('cart', JSON.stringify(cart));


        updateCartBadge();

        // Hiển thị thông báo thêm vào giỏ hàng
        $('#cart-notification').fadeIn();
        setTimeout(function() {
            $('#cart-notification').fadeOut();
        }, 3000);
    });

    updateCartBadge();
});




    
    
    
    
    
    
    