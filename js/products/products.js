export class Product {
    id;
    name;
    price;
    image;
    quantity;

    constructor(id, name, price, image, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }
}

export function loadProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

export function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

export function addProduct(product) {
    let products = loadProducts();
    products.push(product);
    saveProducts(products);
}