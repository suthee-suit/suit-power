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

function confirmPayment(){

    let items = JSON.parse(localStorage.getItem("checkoutItem")) || [];
    if(items.length === 0){
        alert("ไม่มีรายการสั่งซื้อ");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
        id: "ORD" + Date.now(),
        items: items,
        date: new Date().toLocaleString(),
        status: "ชำระเงินแล้ว"
    };

    orders.push(newOrder);

    // บันทึกคำสั่งซื้อ
    localStorage.setItem("orders", JSON.stringify(orders));

    // เคลียร์ตะกร้า
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutItem");

    // ไปหน้า success
    window.location.href = "success.html";
}