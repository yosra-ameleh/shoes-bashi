document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.list');
    const items = document.querySelectorAll('.item');
    const itemsToScroll = 1;
    let currentIndex = 0;

    if (!list || items.length === 0) {
        console.warn("Element with class 'list' or 'item' not found. Auto-scroll cannot be initialized.");
        return;
    }

    const scrollNextItems = () => {
        currentIndex = (currentIndex + itemsToScroll) % items.length;

        const targetScrollLeft = items[currentIndex].offsetLeft - list.offsetLeft;

        list.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });
    };

    let scrollInterval = setInterval(scrollNextItems, 2000);

    list.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });

    list.addEventListener('mouseleave', () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(scrollNextItems, 2000);
    });

    // شروع اسکرول بعد از بارگذاری صفحه
    setTimeout(scrollNextItems, 0);
});