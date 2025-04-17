document.getElementById("edit-profile-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку формы

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const avatar = document.getElementById("avatar").files[0];

    // Простая имитация сохранения данных
    console.log("Сохраненные данные:");
    console.log("Имя пользователя:", username);
    console.log("Email:", email);
    if (password) {
        console.log("Пароль изменен.");
    }
    if (avatar) {
        console.log("Выбран новый аватар:", avatar.name);
    }

    alert("Изменения сохранены!");
});
