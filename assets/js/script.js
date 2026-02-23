const products = {
    1:{name:"สูท Classic Black",price:2890,image:"assets/images/suit-black.jpg",desc:"สูทสีดำทรงคลาสสิก ใส่ได้ทุกโอกาส"},
    2:{name:"สูท Modern Gray",price:2990,image:"assets/images/suit-gray.jpg",desc:"สูทสีเทาสไตล์โมเดิร์น ดูสุภาพและทันสมัย"},
    3:{name:"สูท Executive Navy",price:3190,image:"assets/images/suit-navy.jpg",desc:"สูทสีน้ำเงินเข้ม เพิ่มความมั่นใจ"},
    4:{name:"สูท Slim Fit Brown",price:2950,image:"assets/images/suit-brown.jpg",desc:"สูทสีน้ำตาลทรงสลิม ใส่แล้วดูเพรียว"},
    5:{name:"สูท Premium Beige",price:3290,image:"assets/images/suit-beige.jpg",desc:"สูทสีเบจหรูหรา เหมาะกับงานกึ่งทางการ"},
    6:{name:"สูท Double Breasted",price:3490,image:"assets/images/suit-double.jpg",desc:"สูททรง Double Breasted เพิ่มความคลาสสิก"},
    7:{name:"สูท Midnight Charcoal",price:3250,image:"assets/images/suit-charcoal.jpg",desc:"สูทสีชาร์โคล เรียบหรูดูสุขุม"},
    8:{name:"สูท Italian Cut Black",price:3590,image:"assets/images/suit-italian-black.jpg",desc:"สูททรงอิตาเลียน เข้ารูปพิเศษ"},
    9:{name:"สูท Business Navy Slim",price:3090,image:"assets/images/suit-business-navy.jpg",desc:"สูทสีน้ำเงินทรงสลิม เหมาะกับนักธุรกิจ"},
    10:{name:"สูท Royal Brown Premium",price:3390,image:"assets/images/suit-royal-brown.jpg",desc:"สูทน้ำตาลพรีเมียม เพิ่มความโดดเด่น"}
};

function getId(){
    const params=new URLSearchParams(window.location.search);
    return params.get("id");
}

function loadProduct(){
    const id=getId();
    if(!products[id]){
        document.querySelector(".product-container").innerHTML="<h2>ไม่พบสินค้า</h2>";
        return;
    }

    document.getElementById("productName").innerText=products[id].name;
    document.getElementById("productPrice").innerText=products[id].price.toLocaleString()+" บาท";
    document.getElementById("productImage").src=products[id].image;
    document.getElementById("productDesc").innerText=products[id].desc;
    
}

function addToCart(){

    const id = getId();
    const size = document.getElementById("sizeSelect").value;
    const qty = parseInt(document.getElementById("quantity").value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id: id,
        name: products[id].name,
        price: products[id].price,
        size: size,
        quantity: qty,
        image: products[id].image
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("เพิ่มลงตะกร้าเรียบร้อย");
}

function buyNow(){

    const id = getId();

    // 2️⃣ ตรวจสอบว่าสินค้ามีอยู่จริง
    if(!products[id]){
        alert("ไม่พบสินค้า");
        return;
    }

    const size = document.getElementById("sizeSelect").value;
    const qty = parseInt(document.getElementById("quantity").value);

    // 3️⃣ ตรวจสอบข้อมูลพื้นฐาน
    if(!size){
        alert("กรุณาเลือกไซส์");
        return;
    }

    if(!qty || qty < 1){
        alert("จำนวนสินค้าไม่ถูกต้อง");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 4️⃣ ตรวจสอบว่ามีสินค้าซ้ำในตะกร้าหรือไม่
    const existingItem = cart.find(item => 
        item.id === id && item.size === size
    );

    if(existingItem){
        // ถ้ามีอยู่แล้ว → เพิ่มจำนวนแทน
        existingItem.quantity += qty;
    }else{
        // ถ้ายังไม่มี → เพิ่มใหม่
        cart.push({
            id: id,
            name: products[id].name,
            price: products[id].price,
            size: size,
            quantity: qty,
            image: products[id].image
        });
    }

    // 5️⃣ บันทึกตะกร้า
    localStorage.setItem("cart", JSON.stringify(cart));

    // 6️⃣ ไปหน้าตะกร้า
    window.location.href = "cart.html";
}
window.addEventListener("load", function(){

    const pending = localStorage.getItem("pendingAction");

    if(pending === "buyNow"){
        localStorage.removeItem("pendingAction");
        buyNow();
    }

});

loadProduct();
