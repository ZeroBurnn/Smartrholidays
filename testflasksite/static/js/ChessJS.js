document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    if (prevButton && nextButton && slider) {
        prevButton.addEventListener('click', () => {
            slider.scrollLeft -= slider.offsetWidth;
        });

        nextButton.addEventListener('click', () => {
            slider.scrollLeft += slider.offsetWidth;
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.querySelector(".close");

    // Убедимся, что модальное окно скрыто при загрузке страницы
    modal.style.display = "none";

    // Открытие модального окна
    openModalBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        modal.style.display = "flex";
    });

    // Закрытие модального окна при клике на крестик
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("lessonModal");
    const openModalBtn = document.getElementById("openLessonModal");
    const closeModalBtn = document.querySelector(".lesson-modal .close");

    if (!modal || !openModalBtn || !closeModalBtn) {
        console.error("Ошибка: не найден один из элементов (lessonModal, openLessonModal, closeModalBtn).");
        return;
    }

    // Открытие модального окна
    openModalBtn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "flex"; // Показываем окно
        document.body.style.overflow = "hidden"; // Блокируем прокрутку фона
    });

    // Закрытие модального окна при клике на крестик
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Возвращаем прокрутку
    });

    // Закрытие при клике вне окна
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Возвращаем прокрутку
        }
    });

    // Убираем появление окна при обновлении страницы
    window.addEventListener("beforeunload", function () {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const tickerContainer = document.querySelector('.ticker-container');
    const tickerText = document.querySelector('.ticker-text');
    const items = tickerText.querySelectorAll('p'); // Получаем все элементы

    // Вычисляем общую высоту всех элементов
    let totalHeight = 0;
    items.forEach(item => {
        totalHeight += item.offsetHeight;
    });

    // Устанавливаем высоту tickerText равной totalHeight
    tickerText.style.height = totalHeight + 'px';

    // Устанавливаем высоту container
    tickerContainer.style.height = items[0].offsetHeight + 'px';
});