
const products = {
    "boot-001": {
        name: "نیم‌بوت زنانه",
        price: 1250000,
        colors: ["black", "brown", "cream"],
        sizes: [37, 38, 39, 40],
        images: [
            "Pictures/boot-shoes1.jpg",
            "Pictures/boot-shoes2.jpg",
            "Pictures/boot-shoes3.jpg",
            "Pictures/boot-shoes4.jpg"
        ]
    },

    "boot-002": {
        name: "کفش زنانه",
        price: 950000,
        colors: ["black", "white"],
        sizes: [38, 39, 40],
        images: [
            "Pictures/sport-shoes1.jpg",
            "Pictures/sport-shoes2.jpg",
            "Pictures/sport-shoes3.jpg",
            "Pictures/sport-shoes4.jpg"
        ]
    },

    "boot-003": {
        name: "کفش",
        price: 400000,
        colors: ["white", "blue", "red", "green"],
        sizes: [39, 40, 45],
        images: [
            "Pictures/lady-shoes1.webp",
            "Pictures/lady-shoes2.jpg",
            "Pictures/lady-shoes3.jpg",
            "Pictures/lady-shoes4.jpg"
        ]
    }
};


// پیدا کردن عناصر صفحه
const productCards = document.querySelectorAll(".product-card");
const productDetails = document.querySelector("#product-details");


// نمایش اطلاعات محصول در بخش جزئیات داخل صفحه
productCards.forEach(card => {
    card.addEventListener("click", () => {
        const productId = card.dataset.productId;
        const selectedProduct = products[productId];

        if (!selectedProduct || !productDetails) {
            if (productDetails) {
                productDetails.textContent = "محصول پیدا نشد!";
            }
            return;
        }

        productDetails.innerHTML = `
            <h2 class="product-name">${selectedProduct.name}</h2>

            <p class="product-codee">
                کد محصول: ${productId}
            </p>

            <p class="product-price">
                قیمت: ${selectedProduct.price.toLocaleString("fa-IR")} تومان
            </p>

            <p class="product-color">
                رنگ‌ها: ${selectedProduct.colors.join("، ")}
            </p>

            <p class="product-size">
                سایزها: ${selectedProduct.sizes.join("، ")}
            </p>
        `;
    });
});


// خواندن شناسه محصول از آدرس صفحه
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products[productId];


// بررسی وجود محصول
if (!product) {
    document.querySelector(".product-title")?.replaceChildren(
        document.createTextNode("محصول پیدا نشد!")
    );
} else {

    // نمایش نام محصول
    const productTitle = document.querySelector(".product-title");

    if (productTitle) {
        productTitle.textContent = product.name;
    }

    // نمایش کد محصول
    const productCode = document.querySelector(".product-code");

    if (productCode) {
        productCode.textContent = productId;
    }

    // نمایش قیمت محصول
    const priceButton = document.querySelector(".product-price button");

    if (priceButton) {
        priceButton.textContent =
            product.price.toLocaleString("fa-IR") + " تومان";
    }


    // ساخت دکمه‌های رنگ
    const productColors = document.querySelector(".color-options");

    const colorNames = {
        black: "مشکی",
        brown: "قهوه‌ای",
        cream: "کرم",
        white: "سفید",
        blue: "آبی",
        red: "قرمز",
        green: "سبز"
    };

    if (productColors) {
        productColors.innerHTML = product.colors
            .map(color => `
                <button
                    type="button"
                    class="color-btn"
                    data-color="${color}"
                    aria-label="${colorNames[color] || color}"
                    title="${colorNames[color] || color}"
                    aria-pressed="false"
                >
                    <span
                        class="color-circle color-${color}"
                    ></span>
                    <span class="color-name">
                        ${colorNames[color] || color}
                    </span>
                </button>
            `)
            .join("");

        // انتخاب رنگ
        productColors.addEventListener("click", event => {
            const button = event.target.closest(".color-btn");

            if (!button) return;

            productColors.querySelectorAll(".color-btn")
                .forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-pressed", "false");
                });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
        });
    }


    // ساخت دکمه‌های سایز
    const productSizes = document.querySelector(".size-options");

    if (productSizes) {
        productSizes.innerHTML = product.sizes
            .map(size => `
                <button
                    type="button"
                    class="size-btn"
                    data-size="${size}"
                    aria-pressed="false"
                >
                    ${size}
                </button>
            `)
            .join("");

        // انتخاب سایز
        productSizes.addEventListener("click", event => {
            const button = event.target.closest(".size-btn");

            if (!button) return;

            productSizes.querySelectorAll(".size-btn")
                .forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-pressed", "false");
                });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
        });
    }


    // نمایش تصویر اصلی
    const mainImage = document.querySelector(".main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");

    if (mainImage && product.images.length > 0) {
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
    }

    // نمایش تصاویر کوچک
    thumbnails.forEach((thumbnail, index) => {
        const imageIndex = index + 1;

        if (product.images[imageIndex]) {
            thumbnail.src = product.images[imageIndex];
            thumbnail.alt = `${product.name} - تصویر ${imageIndex + 1}`;
            thumbnail.hidden = false;
        } else {
            thumbnail.hidden = true;
        }

        // تغییر تصویر اصلی با کلیک
        thumbnail.addEventListener("click", () => {
            if (!mainImage) return;

            mainImage.src = thumbnail.src;
            mainImage.alt = thumbnail.alt;
        });
    });
}
