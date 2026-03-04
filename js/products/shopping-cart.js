import { loadProducts } from "./products.js";

function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
    saveCart([]);
    renderCart();
}

function addToCart(productId, quantity) {
    changeCartProductQuantity(productId, quantity);
}

function removeFromCart(productId, quantity) {
    changeCartProductQuantity(productId, -quantity);
}

function changeCartProductQuantity(productId, quantityChange) {
    let cart = loadCart();

    const itemInCart = cart.find(product => product.id === productId);

    // new cart Product
    if (!itemInCart) {
        if (quantityChange > 0) {
            const productToAdd = loadProducts().find(p => p.id === productId);

            if (productToAdd) {
                cart.push({ ...productToAdd, quantity: quantityChange });
                saveCart(cart);
            }
        }
        // nothing more to do since we can't take away from zero
        return;
    }

    // existing cart Product
    itemInCart.quantity += quantityChange;

    // check to see if the existing Product quantity means it should be removed
    if (itemInCart.quantity <= 0) {
        saveCart(cart.filter(product => product.id !== productId));
    } else {
        saveCart(cart);
    }

    renderCart();
}

function getCartTotal() {
    const cart = loadCart();
    let sum = 0;
    cart.forEach(product => {
        sum += product.price * product.quantity;
    });
    return sum;
}

function renderCart() {
    const cart = loadCart();
    const $body = $('#cart-body');
    const $empty = $('#cart-empty');
    const $total = $('#cart-total');

    $body.empty();

    // empty cart message
    if (cart.length === 0) {
        $empty.removeClass('d-none');
        $total.text('$0.00');
        return;
    } else {
        $empty.addClass('d-none');
    }

    // fill the table with products in cart
    cart.forEach(item => {
        $body.append(`
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td style="width:120px">
                    <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary btn-qty-minus" data-id="${item.id}">−</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary btn-qty-plus" data-id="${item.id}">+</button>
                    </div>
                </td>
                <td class="text-end">$${(item.price * item.quantity).toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger btn-remove" data-id="${item.id}">&times;</button>
                </td>
            </tr>
        `);
    });

    // cart total
    $total.text('$' + getCartTotal().toFixed(2));
}

$(function () {
    renderCart();

    // increment quantity for item by 1
    $('#cart-body').on('click', '.btn-qty-plus', function () {
        addToCart(Number($(this).data('id')), 1);
    });

    // decrement quantity for item by 1
    // if the quantity hits 0, the item will be completely removed from the cart
    $('#cart-body').on('click', '.btn-qty-minus', function () {
        removeFromCart(Number($(this).data('id')), 1);
    });

    // remove ALL of a single item with the "x" button
    $('#cart-body').on('click', '.btn-remove', function () {
        const id = Number($(this).data('id'));
        const item = loadCart().find(i => i.id === id);
        if (item) removeFromCart(id, item.quantity);
    });

    // remove ALL items with the "Clear Cart" button
    $('#btn-clear-cart').on('click', clearCart);
});