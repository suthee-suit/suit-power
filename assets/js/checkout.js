document.addEventListener("DOMContentLoaded", loadCheckout);

function loadCheckout(){

    let items = JSON.parse(localStorage.getItem("checkoutItem")) || [];

    if(items.length === 0){
        document.getElementById("subTotal").innerText = "0";
        document.getElementById("vatAmount").innerText = "0";
        document.getElementById("grandTotal").innerText = "0";
        return;
    }

    let subTotal = 0;

    items.forEach(item=>{
        subTotal += item.price * item.quantity;
    });

    let vat = subTotal * 0.05;
    let grandTotal = subTotal + vat;

    document.getElementById("subTotal").innerText =
        subTotal.toLocaleString();

    document.getElementById("vatAmount").innerText =
        vat.toLocaleString(undefined,{maximumFractionDigits:2});

    document.getElementById("grandTotal").innerText =
        grandTotal.toLocaleString(undefined,{maximumFractionDigits:2});
}

function confirmOrder() {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !address) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("ไม่มีสินค้าในตะกร้า");
        return;
    }

    // คำนวณราคารวม
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // สร้างคำสั่งซื้อ
    const order = {
        orderId: "ORD-" + Date.now(),
        customer: {
            name,
            phone,
            address
        },
        items: cart,
        total: total,
        date: new Date().toLocaleString()
    };

    // ดึง orders เดิม
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    // ล้างตะกร้า
    localStorage.removeItem("cart");

    window.location.href = "success.html";
}

