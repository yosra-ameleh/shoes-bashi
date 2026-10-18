const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {
    card.addEventListener("click", () => {
        const productId = card.dataset.productId;

        window.location.href =
            `product.html?id=${productId}`;
    });
});