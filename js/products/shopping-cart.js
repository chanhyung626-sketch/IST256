class Product {
    id;
    name;
    price;
    image;

    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

/**
 * Loads the 'cart' object currently in localStorage.
 * @returns {any|*[]} An array of {@link Product}s, or an empty array is none are found currently in the cart.
 */
function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/**
 * Replaces the current 'cart' object in localStorage with the provided cart.
 * @param cart An array of {@link Product}s that the user has in their shopping cart.
 */
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
