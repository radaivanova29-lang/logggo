(function() {
    const startApp = () => {
        console.log("App initialized");

        // 1. Логика Бургера
        const burger = document.getElementById('burger-trigger');
        const mobileMenu = document.getElementById('mobile-menu');

        if (burger && mobileMenu) {
            burger.onclick = (e) => {
                e.stopPropagation();
                burger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                // Запрещаем скролл при открытом меню
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            };
        }

        // 2. Логика модального окна
        const modal = document.getElementById('feedback-modal');
        const openBtns = document.querySelectorAll('.btn-open-modal');
        const closeBtn = document.querySelector('.close-modal');

        if (modal) {
            openBtns.forEach(btn => {
                btn.onclick = (e) => {
                    e.preventDefault();
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    // Закрываем мобильное меню при открытии модалки
                    if(mobileMenu) mobileMenu.classList.remove('active');
                    if(burger) burger.classList.remove('active');
                };
            });

            if (closeBtn) {
                closeBtn.onclick = () => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                };
            }

            // Закрытие при клике на темную область вокруг модалки
            window.addEventListener('click', (event) => {
                if (event.target == modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }

        // 3. Логика FAQ (Аккордеон)
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length > 0) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                if (question) {
                    question.onclick = () => {
                        // Если хочешь, чтобы открывался только один вопрос за раз - расскоментируй строку ниже:
                        // faqItems.forEach(i => { if(i !== item) i.classList.remove('active'); });
                        item.classList.toggle('active');
                    };
                }
            });
        }

        // 4. Логика этапов (для главной страницы, если там остались картинки)
        const stageItems = document.querySelectorAll('.stage-item');
        const stageIcon = document.getElementById('stage-icon');
        if (stageItems.length > 0 && stageIcon) {
            stageItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    stageItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    if (item.dataset.icon) {
                        stageIcon.src = item.dataset.icon;
                    }
                });
            });
        }
    };

    // Проверка готовности DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startApp);
    } else {
        startApp();
    }
})();