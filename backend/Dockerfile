# Usa Python como base
FROM python:3.12-slim

WORKDIR /app


# Instalar dependencias del sistema necesarias para PostgreSQL
RUN apt update && apt install -y libpq-dev gcc python3-dev musl-dev

# Instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Exponer el puerto del backend
EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
