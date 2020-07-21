function printReceipt(barcodes) {
    var cartDetails = countItemOfCartDetails(barcodes)
    countItemOfCartDetails(cartDetails);
    findItemNameByBarcode(cartDetails);
    calculateItemTotalPrice(cartDetails);
    var totalPrice = calculateCartTotalPrice(cartDetails);
    return formatCartDetails(cartDetails, totalPrice);
}

function countItemOfCartDetails(barcodes){
    var cartDetails = [];
    for(let i = 0; i < barcodes.length; i++){   //push进数组
        let barcode = barcodes[i];
        var cartDetail = cartDetails.find(e => e.code === barcode);
        if (!cartDetail) {
            cartDetails.push({"code": barcode, "name": null, "Quantity": 1, "unitPrice": 0});
        } else {
            cartDetail.Quantity = cartDetail.Quantity + 1;
        }
    }
    return cartDetails;
}
function getBarcodeList(){
    return [
        {
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            price: 3
        },
        {
            barcode: 'ITEM000001',
            name: 'Sprite',
            price: 3
        },
        {
            barcode: 'ITEM000002',
            name: 'Apple',
            price: 5
        },
        {
            barcode: 'ITEM000003',
            name: 'Litchi',
            price: 15
        },
        {
            barcode: 'ITEM000004',
            name: 'Battery',
            price: 2
        },
        {
            barcode: 'ITEM000005',
            name: 'Instant Noodles',
            price: 4
        }
    ]
}
function findItemNameByBarcode(cartDetails){
    let barcodeList = getBarcodeList();
    for(let i = 0; i < cartDetails.length; i++){
        var barcodeInfo = barcodeList.find(e => e.barcode === cartDetails[i].code);
        if (barcodeInfo) {
            cartDetails[i].name = barcodeInfo.name;
            cartDetails[i].unitPrice = barcodeInfo.price;
        }
    }
    return cartDetails;
}
function calculateItemTotalPrice(cartDetails){
    for(let i = 0; i < cartDetails.length; i++){
        cartDetails[i].totalPrice = cartDetails[i].Quantity * cartDetails[i].unitPrice;
    }
    return cartDetails;
}
function calculateCartTotalPrice(cartDetails){
    let totalPrice = 0;
    for(let i = 0; i < cartDetails.length; i++){
        totalPrice += cartDetails[i].totalPrice;
    }
    return totalPrice;
}
function formatCartDetails(cartDetails, totalPrice){
    let receipt = `\n***<store earning no money>Receipt ***\n`
    for(let i = 0; i < cartDetails.length; i++){
        cartDetail = cartDetails[i];
        receipt += `Name${cartDetail.name}, Quantity: ${cartDetail.Quantity}, Unit price: ${cartDetail.unitPrice} (yuan), Subtotal: ${cartDetail.totalPrice} (yuan)\n`
    }
    receipt += `----------------------\n`
    receipt += `Total: ${totalPrice} (yuan)\n`
    receipt += `**********************`
    console.log(receipt);
    return receipt
}

var barcodes = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
];
printReceipt(barcodes);

module.exports = {
    printReceipt
};