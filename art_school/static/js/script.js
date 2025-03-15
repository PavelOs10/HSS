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
    return VANTA.CLOUDS({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0x7A869A,
        cloudColor: 0xB0C4DE,
        cloudShadowColor: 0x5A5F69,
        sunColor: 0x7A869A,
        sunGlareColor: 0x7A869A,
        sunlightColor: 0x7A869A,
        speed: 0.5
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

// Обработка фотоотчетов
document.querySelectorAll('.photo-report-card').forEach(card => {
    card.addEventListener('click', function() {
        const images = JSON.parse(this.dataset.images);
        const carousel = createCarousel(images);
        document.querySelector('#photoCarouselModal .modal-body').innerHTML = carousel;
        new bootstrap.Modal(document.getElementById('photoCarouselModal')).show();
    });
});

function createCarousel(images) {
    let items = '';
    images.forEach((img, index) => {
        items += `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${img}" class="d-block w-100" alt="Фотоотчет">
        </div>`;
    });

    return `
    <div id="photoCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">${items}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#photoCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#photoCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>`;
}

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