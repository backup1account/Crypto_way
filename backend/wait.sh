#!/bin/sh

while ! nc -z cryptodb 3306; do
    echo "Waiting for MySQL Server"
    sleep 3
done

# python manage.py makemigrations
# python manage.py migrate
python manage.py runserver 0.0.0.0:8000