document.addEventListener("DOMContentLoaded", function() {
    if (typeof VANTA !== 'undefined') {
        const vantaEffect = initVanta();
    }

    // Обработка ошибок для AJAX
    const handleFetchError = (error) => {
        console.error('Error:', error);
        alert('Произошла ошибка при загрузке данных');
    };

    // Обновленный обработчик для новостей
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', function() {
            const newsId = this.dataset.id;
            fetch(`/news/${newsId}/`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(html => {
                    document.getElementById('newsModalContent').innerHTML = html;
                    new bootstrap.Modal(document.getElementById('newsModal')).show();
                })
                .catch(handleFetchError);
        });
    });
});

function initVanta() {
    return VANTA.BIRDS({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x9CCDF9, // Цвет фона
        color1: 0xffffff, // Цвет птиц
        color2: 0xB0C4DE, // Дополнительный цвет
        birdSize: 1.5, // Размер птиц
        wingSpan: 40, // Размах крыльев
        speedLimit: 4, // Скорость
        separation: 50, // Расстояние между птицами
        quantity: 4 // Количество птиц
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const vantaEffect = initVanta();

    const checkScroll = () => {
        const contentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        document.body.style.overflowY = contentHeight > viewportHeight ? 'auto' : 'hidden';
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);

    // Анимация элементов
    setTimeout(() => {
        // Анимация для всех карточек
        document.querySelectorAll('.feature-item').forEach((item, index) => {
            item.style.transform = 'translateY(20px)';
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, 200 + index * 100);
        });
    }, 500);
});
// Обработка новостей
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('click', function() {
        // Анимация и отображение полного текста
        this.classList.add('expanded');
        document.body.style.overflow = 'hidden';
    });
});

function updateContentPadding() {
    const footer = document.querySelector('footer');
    const mainContent = document.querySelector('.main-content');
    if (footer && mainContent) {
        const footerHeight = footer.offsetHeight;
        mainContent.style.paddingBottom = `${footerHeight}px`;
    }
}

window.addEventListener('load', updateContentPadding);
window.addEventListener('resize', updateContentPadding);

document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.srcFull;
                    lazyImage.classList.remove("lazyload");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

function initScroll() {
    const mainContent = document.querySelector('.main-content.photo-reports-page');
    if (mainContent) {
        mainContent.style.overflowY = 'auto';
        document.body.style.overflow = 'hidden';
    }
}
document.addEventListener('DOMContentLoaded', initScroll);