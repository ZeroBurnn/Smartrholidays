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