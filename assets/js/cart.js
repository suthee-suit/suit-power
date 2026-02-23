document.addEventListener("DOMContentLoaded", loadCart);

function loadCart(){
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("totalPrice");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    container.innerHTML = "";

    if(cart.length === 0){
        container.innerHTML = "<p>ยังไม่มีสินค้าในตะกร้า</p>";
        totalEl.innerText = "0";
        return;
    }

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-left">
                <img src="${item.image}">
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>ไซส์: ${item.size}</p>
                    <p>${item.price.toLocaleString()} บาท</p>
                    <div class="quantity-box">
                        <button onclick="changeQty(${index},-1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index},1)">+</button>
                    </div>
                </div>
            </div>

            <div>
                <p><strong>${(item.price*item.quantity).toLocaleString()} บาท</strong></p>
                <button class="remove-btn" onclick="removeItem(${index})">ลบ</button>
                <button class="checkout-btn" onclick="checkoutSingle(${index})">สั่งซื้อทันที</button>
            </div>
        `;

        container.appendChild(div);
    });

    totalEl.innerText = total.toLocaleString();
}

function changeQty(index,amount){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += amount;

    if(cart[index].quantity <= 0){
        cart.splice(index,1);
    }

    localStorage.setItem("cart",JSON.stringify(cart));
    loadCart();
}

function removeItem(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    loadCart();
}

function checkoutSingle(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart[index];

    localStorage.setItem("checkoutItem", JSON.stringify([item]));
    window.location.href="checkout.html";
}

function checkoutAll(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("ไม่มีสินค้าในตะกร้า");
        return;
    }

    localStorage.setItem("checkoutItem", JSON.stringify(cart));
    window.location.href="checkout.html";
}