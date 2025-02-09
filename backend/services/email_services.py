import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import Config

def enviar_email(destinatario, asunto, mensaje):
    msg = MIMEMultipart()
    msg['From'] = Config.MAIL_USERNAME
    msg['To'] = destinatario
    msg['Subject'] = asunto

    # 📌 Asegurar codificación UTF-8 para evitar el error de ASCII
    msg.attach(MIMEText(mensaje.encode('utf-8').decode('utf-8'), 'plain', 'utf-8'))

    try:
        server = smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT)
        server.starttls()
        server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
        server.sendmail(Config.MAIL_USERNAME, destinatario, msg.as_string())
        server.quit()
        print(f"Correo enviado a {destinatario}")
    except Exception as e:
        print(f"Error al enviar el correo: {str(e)}")
