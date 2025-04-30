function updateTimer() {
  fetch('/get_timer')
    .then(response => response.json())
    .then(data => {
      document.getElementById('hours').textContent = String(data.hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(data.minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(data.seconds).padStart(2, '0');
    });
}

// Обновляем таймер каждую секунду
setInterval(updateTimer, 1000);
updateTimer(); // Немедленный первый вызов

document.querySelector('.reserve-button').addEventListener('click', function () {
  const selectedCourses = [];

  // Получаем выбранные платные курсы
  document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
    selectedCourses.push(radio.value);
  });

  // Получаем выбранные бесплатные курсы
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
    selectedCourses.push(checkbox.value);
  });

  console.log('Выбранные курсы:', selectedCourses);

  // Здесь можно добавить код для отправки данных на сервер или выполнения других действий
});