document.addEventListener("DOMContentLoaded", function () {
    const lessonContainer = document.querySelector(".lessons-list");
    const lessonContent = document.getElementById("lesson-content"); // Контейнер для контента урока
    const courseTitle = document.createElement("h3"); // Текст над курсами
    const courseButtonsContainer = document.getElementById("course-buttons");

    // Проверяем, что элементы существуют
    if (!lessonContainer || !lessonContent || !courseButtonsContainer) {
        console.error("Не найдены необходимые элементы DOM!");
        return;
    }

    // Добавляем текстовый элемент перед контейнером кнопок курсов
    courseButtonsContainer.parentNode.insertBefore(courseTitle, courseButtonsContainer);

    const lessonsData = {
        Шахматы: {
            "1": [
                {
                    theme: "Тема 1: Введение в шахматы",
                    lessons: [
                        { 
                            title: "Урок 1. Основы дебюта", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        { 
                            title: "Урок 2. Шахматная доска, фигуры и траектория движения", 
                            text: " ", 
                            video: "media/chess2/02.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test2.html" 
                        },
                        { 
                            title: "Урок 3. Основные правила игры", 
                            text: " ", 
                            video: "media/chess2/03.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test3.html" 
                        }
                    ]
                    
                },

                {
                    theme: "Тема 2: Ходы фигур",
                    lessons: [
                        {
                            title: "Урок 4. Ход пешки", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 5. Ход коня", 
                            text: "", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 6. Ход слона", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 7. Ход ладьи", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 8. Ход ферзя", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 9. Ход короля", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 10. Волшебные фигуры (пешки, кони)", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 3: Основные правила игры",
                    lessons: [
                        {
                            title: "Урок 11. Шах и мат", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 12. Пат и ничья", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 13. Основы этикета в шахматах", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 14. Рокировка (правила и применение)", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 15. Доска и фигуры – шахматная география", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 4: Простейшие тактики",
                    lessons: [
                        {
                            title: "Урок 16. Тактика двойного удара", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 17. Защита и атака", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 18. Основы матовых схем (мат ферзём)", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 19. Основы матовых схем (мат ладьёй)", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 20. Основы матовых схем (мат с двумя слонами)", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 5: Игровые ситуации",
                    lessons: [
                        {
                            title: "Урок 21. Создание угрозы", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 22. Защита от шаха", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 23. Простые комбинации", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 24. Разбор простых партий", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 25. Игра с другом (практика)", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 6: Основы стратегии",
                    lessons: [
                        {
                            title: "Урок 26: Контроль центра", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 27: Развитие фигур", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 28: Принципы окончания игры", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 29: Ошибки новичков и как их избегать", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 30: Подведение итогов первого года", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 7: Практика и анализ",
                    lessons: [
                        {
                            title: "Урок 31: Игра в турнире для начинающих", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 32: Анализ сыгранных партий", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 33: Изучение известных партий", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 34: Задачи на тему шахматной тактики", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "Урок 35: Заключительная игра (турнир) и обсуждение прогресса", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },
            ],
            "2": [
                {
                theme: "Тема 1: Расширение знаний о фигурах",
                lessons: [
                    {
                        title: "", 
                        text: "1 ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                ]
            },

            {
                theme: "Тема 2: Начальная игра",
                lessons: [
                    {
                        title: "", 
                        text: "1 ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                ]
            },

            {
                theme: "Тема 3: Тактические приемы",
                lessons: [
                    {
                        title: "", 
                        text: "1 ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                ]
            },

            {
                theme: "Тема 4: Окончание игры",
                lessons: [
                    {
                        title: "", 
                        text: "1 ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                ]
            },

            {
                theme: "Тема 5: Стратегия и планирование",
                lessons: [
                    {
                        title: "", 
                        text: "1 ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                ]
            },

            {
                theme: "Тема 6: Практика и анализ",
                lessons: [
                    {
                        title: "", 
                        text: "1 ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                ]
            },

            {
                theme: "Тема 7: Подготовка к турнирам",
                lessons: [
                    {
                        title: "", 
                        text: "1 ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                    {
                        title: "", 
                        text: " ", 
                        video: "media/chess2/01.mp4", 
                        summary: "🔹 ", 
                        test: "tests/test1.html" 
                    },
                ]
            }
        ],

            "3": [
                {
                    theme: "Тема 1: Продвинутые дебюты",
                    lessons: [
                        {
                            title: "", 
                            text: "1 ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 2: Тактические комбинации",
                    lessons: [
                        {
                            title: "", 
                            text: "1 ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 3: Окончания и эндшпиль",
                    lessons: [
                        {
                            title: "", 
                            text: "1 ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 4: Стратегия и планирование",
                    lessons: [
                        {
                            title: "", 
                            text: "1 ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 5: Игровая практика",
                    lessons: [
                        {
                            title: "", 
                            text: "1 ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 6: Психология игры",
                    lessons: [
                        {
                            title: "", 
                            text: "1 ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                },

                {
                    theme: "Тема 7: Заключительная практика",
                    lessons: [
                        {
                            title: "", 
                            text: "1 ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                        {
                            title: "", 
                            text: " ", 
                            video: "media/chess2/01.mp4", 
                            summary: "🔹 ", 
                            test: "tests/test1.html" 
                        },
                    ]
                }
            ]  
        }
    };

    // Обработчик для кнопок выбора категории (например, Шахматы)
    document.querySelectorAll(".menu-btn").forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            if (!category) {
                console.error("Атрибут data-category не найден!");
                return;
            }

            // Обновляем текст над кнопками курсов
            courseTitle.textContent = `Курсы по ${category.toUpperCase()}`;
            courseTitle.style.color = "#007bff"; // Добавляем стиль для наглядности

            // Отображаем кнопки для выбора курса (1, 2, 3)
            courseButtonsContainer.innerHTML = `
                <button class="course-btn" data-category="${category}" data-course="1">Курс 1</button>
                <button class="course-btn" data-category="${category}" data-course="2">Курс 2</button>
                <button class="course-btn" data-category="${category}" data-course="3">Курс 3</button>
            `;
            console.log("Кнопки курса отображены для категории: " + category); // Лог

            // Очищаем темы и уроки
            lessonContainer.innerHTML = "";
            lessonContainer.style.display = "none";

            // Очищаем контент урока
            lessonContent.innerHTML = "<h2>Выберите урок</h2>";
        });
    });

    // Обработчик для кнопок выбора курса (Курс 1, 2, 3)
    courseButtonsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("course-btn")) {
            const category = event.target.getAttribute("data-category");
            const course = event.target.getAttribute("data-course");
            if (!category || !course) {
                console.error("Атрибуты data-category или data-course не найдены!");
                return;
            }
            console.log(`Выбран курс: Категория=${category}, Курс=${course}`); // Лог

            // Находим следующий элемент после кнопки курса
            const nextElement = event.target.nextElementSibling;

            // Если уже есть контейнер с темами и уроками, удаляем его
            if (nextElement && nextElement.classList.contains("lessons-list")) {
                nextElement.remove();
                return; // Завершаем выполнение, чтобы не создавать новый контейнер
            }

            // Проверяем, есть ли данные для выбранного курса
            const selectedLessons = lessonsData[category]?.[course];
            if (selectedLessons && Array.isArray(selectedLessons) && selectedLessons.length > 0) {
                displayLessons(event.target, selectedLessons);
            } else {
                const noLessonsMessage = document.createElement("div");
                noLessonsMessage.classList.add("lessons-list");
                noLessonsMessage.innerHTML = "<p>Уроки для этого курса не добавлены.</p>";
                event.target.insertAdjacentElement("afterend", noLessonsMessage);
            }
        }
    });

    // Функция для отображения списка тем и уроков под кнопкой курса
    function displayLessons(button, lessons) {
        const lessonsContainer = document.createElement("div");
        lessonsContainer.classList.add("lessons-list");
        lessonsContainer.innerHTML = lessons
            .map(theme => `
                <div class="theme">
                    <h3>${theme.theme}</h3>
                    <ul>
                        ${theme.lessons.map(lesson => `
                            <li class="lesson-item" 
                                data-title="${lesson.title}" 
                                data-text="${lesson.text}" 
                                data-video="${lesson.video}" 
                                data-summary="${lesson.summary}" 
                                data-test="${lesson.test}">
                                ${lesson.title}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `)
            .join("");

        // Добавляем контейнер с темами и уроками сразу после кнопки курса
        button.insertAdjacentElement("afterend", lessonsContainer);

        // Обработчик для показа контента урока при клике
        lessonsContainer.querySelectorAll(".lesson-item").forEach(item => {
            item.addEventListener("click", function () {
                const title = this.getAttribute("data-title");
                const text = this.getAttribute("data-text");
                const video = this.getAttribute("data-video");
                const summary = this.getAttribute("data-summary");
                const test = this.getAttribute("data-test");

                if (!title || !text || !video || !summary || !test) {
                    console.error("Не все атрибуты урока найдены!");
                    return;
                }

                // Создаем кнопку "Назад"
                const backButton = document.createElement("button");
                backButton.textContent = "Назад к темам";
                backButton.addEventListener("click", function () {
                    // Возвращаемся к списку тем и уроков
                    lessonContent.innerHTML = "<h2>Выберите урок</h2>";
                });

                // Показываем контент урока в правой панели
                lessonContent.innerHTML = `
                    <h2>${title}</h2>
                    <p>${text}</p>
                    <div class="lesson-media">
                        <video id="lesson-video" controls>
                            <source src="${video}" type="video/mp4">
                            Ваш браузер не поддерживает видео.
                        </video>
                    </div>
                    <div class="lesson-summary">
                        <h3>Краткое содержание:</h3>
                        <p>${summary}</p>
                    </div>
                    <a href="${test}" class="test-button" target="_blank">Пройти тест</a>
                `;
                lessonContent.prepend(backButton); // Добавляем кнопку "Назад"
            });
        });
    }
});
