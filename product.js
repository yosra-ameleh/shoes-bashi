const products = {
    "boot-01": {
        name: "نیم‌بوت زنانه",
        price: 1250000,
        colors: ["black", "brown", "cream"],
        sizes: [37, 38, 39, 40]
    },

    "boot-02": {
        name: "کفش زنانه",
        price: 950000,
        colors: ["black", "white"],
        sizes: [38, 39, 40]
    }
};

const selectedProduct = products["boot-01"];

document.querySelector(".product-title").textContent =
    selectedProduct.name;