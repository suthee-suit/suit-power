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

function confirmCheckout() {

    const name = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("ไม่มีสินค้าในตะกร้า");
        return;
    }

    const order = {
        id: "ORD" + Date.now(),
        name,
        phone,
        address,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date().toLocaleString()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    alert("สั่งซื้อสำเร็จ");
    window.location.href = "success.html";
}

