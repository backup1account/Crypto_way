#!/bin/sh

while ! nc -z cryptodb 3306; do
    echo "Waiting for MySql Server"
    sleep 3
done


# python3 manage.py makemigrations forum
# sleep 3
# python3 manage.py migrate forum
# sleep 3

python3 manage.py runserver 0.0.0.0:8000