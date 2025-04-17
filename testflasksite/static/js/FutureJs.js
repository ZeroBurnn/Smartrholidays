async function updateTimerFromServer() {
    try {
      const response = await fetch('/countdown');
      const data = await response.json();

      document.getElementById('hours').textContent = data.hours;
      document.getElementById('minutes').textContent = data.minutes;
      document.getElementById('seconds').textContent = data.seconds;
    } catch (error) {
      console.error('Ошибка при получении таймера:', error);
    }
  }

  setInterval(updateTimerFromServer, 1000);
  updateTimerFromServer();