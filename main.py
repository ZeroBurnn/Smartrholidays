import os
import requests
import sqlite3
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, render_template, redirect, url_for, flash, session, send_file, abort, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import csv
from functools import wraps
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta

app = Flask(__name__)
app.secret_key = 'Ffdsgfdg!2424*!fsdfqwSFFG'
CORS(app)
load_dotenv()
VK_ACCESS_TOKEN = os.getenv("VK_API_TOKEN")
VK_PEER_ID = int(os.getenv("VK_PEER_ID", "1"))
VK_API_VERSION = "5.131"

# Глобальные переменные для таймера
start_time = datetime.now()
duration = timedelta(hours=24)

@app.route('/get_timer', methods=['GET'])
def get_timer():
    global start_time  # Declare `start_time` as global to modify it
    elapsed_time = datetime.now() - start_time
    remaining_time = duration - elapsed_time
    if remaining_time.total_seconds() <= 0:
        # Reset the timer
        start_time = datetime.now()  # Update the global `start_time`
        remaining_time = duration
    # Break down the remaining time into hours, minutes, and seconds
    hours, remainder = divmod(remaining_time.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    # Return the remaining time as JSON
    return jsonify({
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    })

def init_db():
    with sqlite3.connect('users.db') as conn:
        # Создание таблицы пользователей (если еще не существует)
        conn.execute('''CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        )''')
        # Создание таблицы для ответов на викторину
        conn.execute('''CREATE TABLE IF NOT EXISTS quiz_responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            course TEXT,  -- Новая колонка для выбранного курса
            answers TEXT NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')
        conn.commit()

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session or session.get("role") != "admin":
            flash("Доступ запрещен. Только для администраторов.")
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated_function

def send_registration_email(to_email, full_name, password):
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Добро пожаловать в Академию цифровых технологий!"
        msg["From"] = os.getenv("MAIL_USERNAME")
        msg["To"] = to_email
        html_content = f"""
        <html>
            <body>
                <h2>Здравствуйте, {full_name}!</h2>
                <p>Благодарим вас за регистрацию на платформе Академии цифровых технологий.</p>
                <p><strong>Ваши данные для входа:</strong></p>
                <ul>
                    <li>Email: {to_email}</li>
                    <li>Пароль: {password}</li>
                </ul>
                <p>Теперь вы можете войти в свою учетную запись.</p>
                <p>Если вы не регистрировались, просто проигнорируйте это письмо.</p>
                <br>
                <p>С уважением,<br>Академия цифровых технологий</p>
            </body>
        </html>
        """
        msg.attach(MIMEText(html_content, "html"))
        with smtplib.SMTP(os.getenv("MAIL_SERVER"), int(os.getenv("MAIL_PORT"))) as server:
            server.starttls()
            server.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
            server.sendmail(msg["From"], [msg["To"]], msg.as_string())
        print("📧 Письмо успешно отправлено")
        return True
    except Exception as e:
        print("❌ Ошибка при отправке письма:", e)
        return False

def send_vk_message(name, phone, course, email):
    try:
        # Формируем сообщение для ВКонтакте
        message = "Новый результат теста:\n"
        message += f"Имя: {name}\n"
        message += f"Телефон: {phone}\n"
        message += f"Email: {email}\n"
        if course:
            message += f"Выбранный курс: {course}\n"  # Добавляем выбранный курс
        message += "Ответы:\n"
        # Здесь можно добавить логику для обработки ответов, если это необходимо

        # Отправляем сообщение через VK API
        response = requests.post("https://api.vk.com/method/messages.send", data={
            "peer_id": VK_PEER_ID,
            "random_id": 0,
            "message": message,
            "access_token": VK_ACCESS_TOKEN,
            "v": VK_API_VERSION
        })
        response.raise_for_status()  # Raise an error for bad responses
        result = response.json()
        if "error" in result:
            print("❌ VK Error:", result["error"])
            return False
        return True

    except requests.exceptions.RequestException as e:
        print("❌ Request Error:", e)
        return False
    except Exception as e:
        print("❌ General Error:", e)
        return False

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    try:
        data = request.get_json()
        name = data.get("name")
        phone = data.get("phone")
        email = data.get("email")
        course = data.get("course")
        message = data.get("message")  # Получаем полное сообщение

        print("Полученные данные:", data)  # Отладочное сообщение

        # Записываем данные в базу данных
        with sqlite3.connect('users.db') as conn:
            conn.execute("""
                INSERT INTO quiz_responses (name, phone, email, answers)
                VALUES (?, ?, ?, ?)
            """, (name, phone, email, message))  # Сохраняем полное сообщение
            conn.commit()

        return jsonify({"status": "success", "message": "Результаты успешно отправлены!"})
    except Exception as e:
        print(f"❌ Ошибка при отправке опросника: {e}")
        return jsonify({"status": "error", "message": "Произошла ошибка при отправке данных"}), 500

@app.route("/")
def home():
    return render_template("smartholydays.html")

@app.route("/ITakademia")
def itakademia():
    return render_template("itakademia.html")

@app.route("/futurecode")
def futurecode():
    return render_template("futurecode.html")

@app.route("/futurequiz")
def futurequiz():
    return render_template("futurequiz.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        full_name = request.form['full_name']
        email = request.form['email']
        password = request.form['password']
        confirm = request.form['confirm']
        if password != confirm:
            flash("Пароли не совпадают")
            return redirect(url_for('register'))
        hashed = generate_password_hash(password)
        try:
            with sqlite3.connect("users.db") as conn:
                conn.execute("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
                             (full_name, email, hashed))
                conn.commit()
                send_registration_email(email, full_name, password)
                flash("Регистрация успешна, войдите")
                return redirect(url_for("login"))
        except sqlite3.IntegrityError:
            flash("Пользователь уже существует")
            return redirect(url_for("register"))
    return render_template("registration.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']
        with sqlite3.connect("users.db") as conn:
            cur = conn.cursor()
            cur.execute("SELECT id, password FROM users WHERE email = ?", (email,))
            user = cur.fetchone()
            if user and check_password_hash(user[1], password):
                session["user_id"] = user[0]
                # Получаем роль
                cur.execute("SELECT role FROM users WHERE id = ?", (user[0],))
                role = cur.fetchone()[0]
                session["role"] = role
                flash("Вход выполнен")
                return redirect(url_for("my"))
            else:
                flash("Неверный логин или пароль")
    return render_template("login.html")

@app.route("/my", endpoint="my")
def my():
    if "user_id" not in session:
        return redirect(url_for("login"))
    return render_template("my.html")

@app.route("/logout")
def logout():
    session.pop("user_id", None)
    flash("Вы вышли из аккаунта")
    return redirect(url_for("login"))

@app.route("/course_request", methods=["POST"])
def course_request():
    name = request.form.get("name")
    email = request.form.get("email")
    phone = request.form.get("phone")
    direction = request.form.get("direction")
    if not all([name, email, phone, direction]):
        flash("Пожалуйста, заполните все поля формы.")
        return redirect(request.referrer or url_for("home"))
    message_sent = send_vk_message(name, phone, direction, email)
    if message_sent:
        flash("Заявка успешно отправлена!")
    else:
        flash("Не удалось отправить заявку. Попробуйте позже.")
    return redirect(request.referrer or url_for("home"))

@app.route("/submit_form", methods=["POST"])
def submit_form():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    shift = data.get("shift")
    if not all([name, email, phone]):
        return jsonify({"success": False, "message": "Заполните все поля"}), 400
    message_sent = send_vk_message(name, phone, shift, email)
    if message_sent:
        return jsonify({"success": True, "message": "Заявка успешно отправлена!"})
    else:
        return jsonify({"success": False, "message": "Ошибка при отправке во ВКонтакте"}), 500

@app.route("/admin")
@admin_required
def admin_panel():
    role_filter = request.args.get("role")
    email_filter = request.args.get("email")
    query = "SELECT * FROM users WHERE 1=1"
    params = []
    if role_filter:
        query += " AND role = ?"
        params.append(role_filter)
    if email_filter:
        query += " AND email LIKE ?"
        params.append(f"%{email_filter}%")
    with sqlite3.connect('users.db') as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute(query, params)
        users = cur.fetchall()
    return render_template("admin_panel.html", users=users)

@app.route("/create_user", methods=["GET", "POST"])
@admin_required
def create_user():
    if request.method == "POST":
        full_name = request.form['full_name']
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']
        hashed = generate_password_hash(password)
        with sqlite3.connect('users.db') as conn:
            conn.execute("INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)",
                         (full_name, email, hashed, role))
            conn.commit()
        flash("Пользователь добавлен!")
        return redirect(url_for("admin_panel"))
    return render_template("create_user.html")

@app.route("/edit_user/<int:user_id>", methods=["GET", "POST"])
@admin_required
def edit_user(user_id):
    with sqlite3.connect('users.db') as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = cur.fetchone()
    if request.method == "POST":
        full_name = request.form['full_name']
        email = request.form['email']
        password = request.form['password']
        role = request.form['role']
        hashed = generate_password_hash(password)
        with sqlite3.connect('users.db') as conn:
            conn.execute("UPDATE users SET full_name = ?, email = ?, password = ?, role = ? WHERE id = ?",
                         (full_name, email, hashed, role, user_id))
            conn.commit()
        flash("Данные обновлены")
        return redirect(url_for("admin_panel"))
    return render_template("edit_user.html", user=user)

@app.route("/delete_user/<int:user_id>", methods=["POST"])
@admin_required
def delete_user(user_id):
    with sqlite3.connect('users.db') as conn:
        conn.execute("DELETE FROM users WHERE id = ?", (user_id,))
        conn.commit()
    flash("Пользователь удален")
    return redirect(url_for("admin_panel"))

@app.route("/export_csv")
@admin_required
def export_csv():
    with sqlite3.connect('users.db') as conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        users = cur.fetchall()
    output = []
    output.append(['ID', 'Full Name', 'Email', 'Role'])
    for user in users:
        output.append([user[0], user[1], user[2], user[4]])
    si = "\n".join([",".join(map(str, row)) for row in output])
    response = make_response(si)
    response.headers["Content-Disposition"] = "attachment; filename=users.csv"
    response.headers["Content-type"] = "text/csv"
    return response

if __name__ == "__main__":
    init_db()
    app.run(debug=True)