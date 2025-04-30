// Определяем вопросы
const questions = [
  {
    question: "Сколько лет вашему ребёнку?",
    options: ["7-9 лет", "10-12 лет", "13-15 лет", "16-17 лет"]
  },
  {
    question: "Был ли опыт программирования?",
    options: ["Да", "Нет"]
  },
  {
    question: "Сколько времени ребёнок проводит в гаджетах (телефон или компьютер)?",
    options: ["Менее 1 часа в день", "От 1 до 4 часов в день", "Более 4 часов в день"]
  },
  {
    question: "Укажите имя и номер телефона, чтобы получить бесплатное IT-обучение на 5 месяцев для вашего ребёнка",
    isLastQuestion: true
  }
];

let currentQuestion = 0;
let answers = [];

// Элементы DOM
const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentStepElem = document.getElementById("currentStep");
const totalStepsElem = document.getElementById("totalSteps");

// Контейнер для результатов
const resultsContainer = document.createElement('div');
resultsContainer.id = "resultsContainer";
document.body.appendChild(resultsContainer);
resultsContainer.style.display = 'none';

// Загрузка вопроса
function loadQuestion() {
  const question = questions[currentQuestion];
  questionElem.textContent = question.question;
  optionsElem.innerHTML = "";

  if (question.isLastQuestion) {
    // Создаем форму для последнего шага
    const form = document.createElement("form");
    form.id = "lastQuestionForm";

    // Поле для имени
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Имя:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.required = true;

    // Поле для телефона
    const phoneLabel = document.createElement("label");
    phoneLabel.textContent = "Телефон (Введите номер Российского формата. Предложение действует только для жителей РФ):";
    const phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.name = "phone";
    phoneInput.pattern = "^((8|\\+7)[\\- ]?)?(\\(?\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$";
    phoneInput.required = true;
    phoneInput.title = "Пожалуйста, введите номер в Российском формате.";

    // Поле для email
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Почта:";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;

    // Выбор курса
    const courseLabel = document.createElement("label");
    courseLabel.textContent = "Выберите курс:";
    const courseSelect = document.createElement("select");
    courseSelect.name = "course";
    courseSelect.required = true;

    // Опции для выбора курса
    const courseOptions = [
      { value: "", text: "Выберите курс" }, // Пустая опция по умолчанию
      { value: "python-beginner", text: "Программирование на Python (Начальный уровень)" },
      { value: "sql-beginner", text: "SQL для начинающих (Начальный уровень)" },
      { value: "robotics-beginner", text: "Робототехника (возможно) (Начальный уровень)" },
      { value: "data-analysis", text: "Анализ данных на Python (Базовый уровень)" },
      { value: "cpp-basic", text: "Программирование на C++ (Базовый уровень)" },
      { value: "cpp-advanced", text: "Программирование на С++ для олимпиадников (Продвинутый уровень)" }
    ];

    courseOptions.forEach(option => {
      const optionElem = document.createElement("option");
      optionElem.value = option.value;
      optionElem.textContent = option.text;
      courseSelect.appendChild(optionElem);
    });

    // Чекбоксы согласия
    const consentLabel = document.createElement("label");
    const consentCheckbox = document.createElement("input");
    consentCheckbox.type = "checkbox";
    consentCheckbox.name = "consent";
    consentCheckbox.required = true;
    consentLabel.innerHTML = 'Я даю согласие на обработку персональных данных в соответствии с <a href="#">политикой обработки персональных данных</a>';
    consentLabel.prepend(consentCheckbox);

    const termsLabel = document.createElement("label");
    const termsCheckbox = document.createElement("input");
    termsCheckbox.type = "checkbox";
    termsCheckbox.name = "terms";
    termsCheckbox.required = true;
    termsLabel.innerHTML = 'Я принимаю условия <a href="#">договора оферты</a>';
    termsLabel.prepend(termsCheckbox);

    // Добавляем элементы в форму
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(phoneLabel);
    form.appendChild(phoneInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(courseLabel);
    form.appendChild(courseSelect);
    form.appendChild(consentLabel);
    form.appendChild(termsLabel);

    optionsElem.appendChild(form);
  } else {
    // Создаем варианты ответов для обычных вопросов
    question.options.forEach(option => {
      const label = document.createElement("label");
      label.textContent = option;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = option;

      // Если ответ уже выбран, отмечаем его
      if (answers[currentQuestion] === option) {
        input.checked = true;
        label.classList.add("selected");
      }

      // Добавляем обработчик изменения выбора
      input.addEventListener("change", () => {
        const allLabels = optionsElem.querySelectorAll("label");
        allLabels.forEach(lbl => lbl.classList.remove("selected"));
        label.classList.add("selected");

        // Сохраняем ответ в массив answers
        answers[currentQuestion] = option;
      });

      label.prepend(input);
      optionsElem.appendChild(label);
    });
  }

  // Обновляем текущий шаг
  currentStepElem.textContent = currentQuestion + 1;
  totalStepsElem.textContent = questions.length;

  // Управление кнопками
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = question.isLastQuestion ? "Забронировать место" : "Далее";
}

// Переход к следующему вопросу
function nextQuestion() {
  if (questions[currentQuestion].isLastQuestion) {
    // Валидация формы
    const form = document.getElementById("lastQuestionForm");
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');
    const courseSelect = form.querySelector('select[name="course"]');
    const consentCheckbox = form.querySelector('input[name="consent"]');
    const termsCheckbox = form.querySelector('input[name="terms"]');

    const errors = [];
    if (!nameInput.value.trim()) {
      errors.push("Имя");
    }
    if (!phoneInput.value.trim() || !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phoneInput.value)) {
      errors.push("Телефон");
    }
    if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      errors.push("Почта");
    }
    if (!courseSelect.value) {
      errors.push("Курс");
    }
    if (!consentCheckbox.checked) {
      errors.push("Согласие на обработку персональных данных");
    }
    if (!termsCheckbox.checked) {
      errors.push("Принятие условий договора оферты");
    }

    if (errors.length > 0) {
      alert("Пожалуйста, заполните следующие поля:\n" + errors.join(", "));
      return;
    }

    // Сбор данных
    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const course = courseSelect.value;

    // Сохраняем ответы
    answers[currentQuestion] = {
      name: name,
      phone: phone,
      email: email,
      course: course
    };

    // Отправка результатов
    submitQuiz(name, phone, email, course);
  } else {
    const selectedOption = document.querySelector(`input[name="answer"]:checked`);
    if (!selectedOption) {
      alert("Пожалуйста, выберите ответ.");
      return;
    }

    answers[currentQuestion] = selectedOption.value;

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      displayResults();
    }
  }
}

// Переход к предыдущему вопросу
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// Отображение результатов
function displayResults() {
  document.querySelector('.quiz-wrapper').style.display = 'none';
  resultsContainer.innerHTML = "<h2>Результаты:</h2>";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    let answer;
    if (question.isLastQuestion) {
      const form = document.getElementById("lastQuestionForm");
      if (form) {
        answer = `
          Имя: ${form.name.value || "Не указано"},
          Телефон: ${form.phone.value || "Не указано"},
          Email: ${form.email.value || "Не указано"},
          Курс: ${getCourseText(form.course.value) || "Не выбран"}
        `;
      } else {
        answer = "Форма не заполнена";
      }
    } else {
      answer = answers[i] || "Не отвечено";
    }
    const resultItem = document.createElement('p');
    resultItem.innerHTML = `<strong>${question.question}</strong>: ${answer}`;
    resultsContainer.appendChild(resultItem);
  }
  resultsContainer.style.display = 'block';
}

function submitQuiz(name, phone, email, course) {
  // Функция для преобразования значения курса в текстовое описание
  const getCourseText = (courseValue) => {
    const courseOptions = [
      { value: "python-beginner", text: "Программирование на Python (Начальный уровень)" },
      { value: "sql-beginner", text: "SQL для начинающих (Начальный уровень)" },
      { value: "robotics-beginner", text: "Робототехника (возможно) (Начальный уровень)" },
      { value: "data-analysis", text: "Анализ данных на Python (Базовый уровень)" },
      { value: "cpp-basic", text: "Программирование на C++ (Базовый уровень)" },
      { value: "cpp-advanced", text: "Программирование на С++ для олимпиадников (Продвинутый уровень)" }
    ];
    const course = courseOptions.find(option => option.value === courseValue);
    return course ? course.text : "Не выбран";
  };

  // Преобразуем значение курса в текстовое описание
  const courseText = getCourseText(course);

  // Формируем текстовое сообщение
  let message = "Новый результат теста:\n";
  message += `Имя: ${name}\n`;
  message += `Телефон: ${phone}\n`;
  message += `Email: ${email}\n`;
  message += `Выбранный курс: ${courseText}\n`;
  message += "Ответы:\n";

  // Добавляем ответы на вопросы
  for (let i = 0; i < questions.length - 1; i++) {
    const question = questions[i].question;
    const answer = answers[i] || "Не отвечено";
    message += `${question}: ${answer}\n`;
  }

  console.log("Сформированное сообщение:", message); // Отладочное сообщение

  // Отправляем данные на сервер
  fetch("http://localhost:5000/submit_quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      course: courseText, // Передаем текстовое описание курса
      message: message    // Полное сообщение с ответами
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Ответ сервера:", data); // Отладочное сообщение
    document.querySelector('.quiz-wrapper').style.display = 'none';
    showModal(); // Показываем модальное окно
  })
  .catch(err => {
    console.error("Ошибка отправки:", err);
    alert("Произошла ошибка при отправке результатов. Попробуйте позже.");
  });
}

// Показать модальное окно
function showModal() {
  document.getElementById("successModal").style.display = "flex";
}

// Закрыть модальное окно
function closeModal() {
  document.getElementById("successModal").style.display = "none";
}

// Закрытие модального окна по кнопке
document.getElementById('closeResultsButton').addEventListener('click', () => {
  window.location.href = '/futurecode'; // Переход на страницу futurecode.html
});

// Загрузка первого вопроса
loadQuestion();

// Обработчики событий для кнопок
nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);