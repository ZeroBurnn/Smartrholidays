import requests
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# 🔹 Настройки VK API
VK_ACCESS_TOKEN = ""  # Токен группы
VK_PEER_ID = 1  # ID пользователя или беседы (если беседа: 2000000000 + ID беседы)
VK_API_VERSION = "5.131"


def send_vk_message(name, phone, shift, email):
    """Функция отправки сообщения в ВК от имени группы"""
    try:
        message = f"📩 Новая заявка:\n👤 Имя: {name}\n📞 Телефон: {phone}\n📧 Email: {email}"  # Убрал смену из сообщения по умолчанию
        if shift:  # Добавил смену только если она указана
            message += f"\n📅 Смена: {shift}"

        url = "https://api.vk.com/method/messages.send"
        payload = {
            "peer_id": VK_PEER_ID,
            "random_id": 0,
            "message": message,
            "access_token": VK_ACCESS_TOKEN,
            "v": VK_API_VERSION
        }

        response = requests.post(url, data=payload)
        result = response.json()

        if "error" in result:
            print(f"❌ Ошибка VK API: {result}")
            return False

        print("✅ Сообщение отправлено в ВК от имени сообщества!")
        return True

    except Exception as e:
        print(f"❌ Ошибка при отправке в ВК: {e}")
        return False


@app.route("/futurecode")
def futurecode():
    return render_template("futurecode.html")

@app.route("/futurequiz")
def futurequiz():
    return render_template("futurequiz.html")

@app.route("/")
def home():
    return render_template("smartholydays.html")


@app.route("/submit_form", methods=["POST"])
def submit_form():
    """Обработчик формы"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "Данные не получены"}), 400

        name = data.get("name")
        phone = data.get("phone")
        shift = data.get("shift", "")  # Получаем shift, если он есть, иначе пустая строка
        email = data.get("email")  # Получаем значение email

        if not name or not phone or not email:  # Убрал проверку на shift, оставил только имя, телефон и email
            return jsonify({"message": "Заполните все поля: имя, телефон и email"}), 400

        print(f"📩 Получена заявка: Имя: {name}, Телефон: {phone}, Email: {email}, Смена: {shift}")

        # 🔹 Отправка в ВК
        vk_sent = send_vk_message(name, phone, shift, email)

        if vk_sent:
            if shift:  # Изменяем сообщение об успехе в зависимости от наличия смены
                return jsonify({"message": "Форма успешно отправлена, данные и информация о смене отправлены в ВКонтакте!"}), 200
            else:
                 return jsonify({"message": "Форма успешно отправлена, данные отправлены в ВКонтакте!"}), 200
        else:
            return jsonify({"message": "Ошибка при отправке данных в ВКонтакте!"}), 500



    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return jsonify({"message": "Ошибка при обработке запроса"}), 500



@app.route("/submit_quiz", methods=["POST"])
def submit_quiz():
    """Обработка результатов опроса и отправка их в ВКонтакте"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "Нет данных"}), 400

        # Ожидаем данные в формате:
        # {
        #   "name": "Имя",
        #   "phone": "Телефон",
        #   "email": "Email",
        #   "answers": [
        #       {"question": "...", "answer": "..."},
        #       ...
        #   ]
        # }

        name = data.get("name")
        phone = data.get("phone")
        email = data.get("email")
        answers = data.get("answers", [])

        if not name or not phone or not email or not answers:
            return jsonify({"message": "Пожалуйста, заполните все поля и завершите тест"}), 400

        message = f"🧠 Заполнен опрос FutureCode:\n👤 Имя: {name}\n📞 Телефон: {phone}\n📧 Email: {email}\n\n📋 Ответы:"
        for item in answers:
            question = item.get("question", "").strip()
            answer = item.get("answer", "").strip()
            if question and answer:
                message += f"\n• {question}: {answer}"

        # Отправка в ВК
        url = "https://api.vk.com/method/messages.send"
        payload = {
            "peer_id": VK_PEER_ID,
            "random_id": 0,
            "message": message,
            "access_token": VK_ACCESS_TOKEN,
            "v": VK_API_VERSION
        }

        response = requests.post(url, data=payload)
        result = response.json()

        if "error" in result:
            print(f"❌ VK API error: {result}")
            return jsonify({"message": "Ошибка при отправке сообщения в VK"}), 500

        print("✅ Опрос успешно отправлен в ВК!")
        return jsonify({"message": "Опрос успешно отправлен!"}), 200

    except Exception as e:
        print(f"❌ Ошибка обработки опроса: {e}")
        return jsonify({"message": "Ошибка сервера при отправке опроса"}), 500

start_time = datetime.now()  # можно заменить на datetime.now() при первом запуске
duration = timedelta(hours=24)

@app.route('/countdown')
def countdown():
    now = datetime.now()
    end_time = start_time + duration
    remaining = end_time - now

    if remaining.total_seconds() <= 0:
        remaining = timedelta(seconds=0)

    hours, remainder = divmod(int(remaining.total_seconds()), 3600)
    minutes, seconds = divmod(remainder, 60)

    return jsonify({
        'hours': str(hours).zfill(2),
        'minutes': str(minutes).zfill(2),
        'seconds': str(seconds).zfill(2)
    })

if __name__ == "__main__":
    app.run(debug=True)