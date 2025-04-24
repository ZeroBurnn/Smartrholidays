/* script.js */
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
    question: "Сколько времени ребёнок проводит в гаджетах(телефон или компьютер)?",
    options: ["Менее 1 часа в день", "от 1 до 4 часов в день", "Более 4 часов в день"]
  },
  {
    question: "Укажите имя и номер телефона, чтобы получить бесплатное IT-обучение на 5 месяцев для вашего ребёнка",
    isLastQuestion: true
  }
];

let currentQuestion = 0;
let answers = [];

const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentStepElem = document.getElementById("currentStep");
const totalStepsElem = document.getElementById("totalSteps");
const resultsContainer = document.createElement('div');
resultsContainer.id = "resultsContainer";
document.body.appendChild(resultsContainer);
resultsContainer.style.display = 'none';

function loadQuestion() {
  const question = questions[currentQuestion];
  questionElem.textContent = question.question;

  optionsElem.innerHTML = "";

  if (question.isLastQuestion) {

    const form = document.createElement("form");
    form.id = "lastQuestionForm";

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Имя:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.required = true;

    const phoneLabel = document.createElement("label");
    phoneLabel.textContent = "Телефон (Введите номер Российского формата. Предложение действует только для жителей РФ):";
    const phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.name = "phone";
    phoneInput.pattern = "^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$";
    phoneInput.required = true;
    phoneInput.title = "Пожалуйста, введите номер в Российском формате.";

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Почта:";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;

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

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(phoneLabel);
    form.appendChild(phoneInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(consentLabel);
    form.appendChild(termsLabel);

    optionsElem.appendChild(form);
  } else {
    question.options.forEach(option => {
      const label = document.createElement("label");
      label.textContent = option;

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = option;
      if (answers[currentQuestion] === option) {
        input.checked = true;
        label.classList.add("selected");
      }

      input.addEventListener("change", () => {
        const allLabels = optionsElem.querySelectorAll("label");
        allLabels.forEach(lbl => lbl.classList.remove("selected"));
        label.classList.add("selected");
      });

      label.prepend(input);
      optionsElem.appendChild(label);
    });
  }

  currentStepElem.textContent = currentQuestion + 1;
  totalStepsElem.textContent = questions.length;

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = question.isLastQuestion ? "Забронировать место" : "Далее";
}

function nextQuestion() {
  if (questions[currentQuestion].isLastQuestion) {
    // Получаем форму
    const form = document.getElementById("lastQuestionForm");

    // Получаем элементы формы
    const nameInput = form.querySelector('input[name="name"]');
const phoneInput = form.querySelector('input[name="phone"]');
const emailInput = form.querySelector('input[name="email"]');
const consentCheckbox = form.querySelector('input[name="consent"]');
const termsCheckbox = form.querySelector('input[name="terms"]');


    // Список ошибок
    const errors = [];

    // Проверка имени
    if (!nameInput.value.trim()) {
      errors.push("Имя");
    }

    // Проверка телефона
    if (!phoneInput.value.trim() || !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phoneInput.value)) {
      errors.push("Телефон");
    }

    // Проверка почты
    if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      errors.push("Почта");
    }

    // Проверка согласия
    if (!consentCheckbox.checked) {
      errors.push("Согласие на обработку персональных данных");
    }

    // Проверка условий
    if (!termsCheckbox.checked) {
      errors.push("Принятие условий договора оферты");
    }

    // Если есть ошибки
    if (errors.length > 0) {
      alert("Пожалуйста, заполните следующие поля:\n" + errors.join(", "));
      return;
    }

    // Если все хорошо
const name = nameInput.value;
const phone = phoneInput.value;
const email = emailInput.value;

// Сохраняем данные
answers[currentQuestion] = {
  name: name,
  phone: phone,
  email: email
};

// Отправка результатов
submitQuiz(name, phone, email);


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

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function displayResults() {
  document.querySelector('.quiz-wrapper').style.display = 'none';
  resultsContainer.innerHTML = "<h2>Результаты:</h2>";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    let answer;
    if (question.isLastQuestion) {
      // Выводим данные из формы
      const form = document.getElementById("lastQuestionForm");
      if (form) {
        answer = `
          Имя: ${form.name.value || "Не указано"},
          Телефон: ${form.phone.value || "Не указано"},
          Email: ${form.email.value || "Не указано"}
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

nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);


function submitQuiz(name, phone, email) {
  const formattedAnswers = [];

  for (let i = 0; i < questions.length - 1; i++) {
    formattedAnswers.push({
      question: questions[i].question,
      answer: answers[i] || "Не отвечено"
    });
  }

  const payload = {
    name: name,
    phone: phone,
    email: email,
    answers: formattedAnswers
  };

  fetch("http://localhost:5000/submit_quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    document.querySelector('.quiz-wrapper').style.display = 'none';
    showModal(); // 👈 Показываем модалку
  })
  .catch(err => {
    console.error("Ошибка отправки:", err);
    alert("Произошла ошибка при отправке результатов. Попробуйте позже.");
  });
}

document.getElementById('closeResultsButton').addEventListener('click', () => {
  window.location.href = '/futurecode';  // Переход на страницу futurecode.html
});


function showModal() {
  document.getElementById("successModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("successModal").style.display = "none";
}


loadQuestion();