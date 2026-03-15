import { loadProducts } from "./products.js";
import { addToCart } from "./shopping-cart.js";

async function renderProductList(filter = "") {
    const products = await loadProducts();
    const $body = $("#productsBody");
    $body.empty();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
        $body.append('<tr><td colspan="4" class="text-center">No products found.</td></tr>');
        return;
    }

    filtered.forEach(product => {
        $body.append(`
            <tr>
                <td>${product.name}</td>
                <td>$${Number(product.price).toFixed(2)}</td>
                <td>${product.category ?? ""}</td>
                <td>
                    <a href="product-details.html?id=${product.id}" class="btn btn-sm btn-outline-primary me-1">Details</a>
                    <button class="btn btn-sm btn-success btn-add-cart" data-id="${product.id}">Add to Cart</button>
                </td>
            </tr>
        `);
    });
}

$(function () {
    renderProductList();

    $("#searchInput").on("input", function () {
        renderProductList($(this).val());
    });

    $("#productsBody").on("click", ".btn-add-cart", function () {
        addToCart(String($(this).data("id")), 1);
        alert("Item added to cart!");
    });
});
