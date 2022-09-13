#!/bin/sh

while ! nc -z backend 8000; do
    echo "Waiting for Django Server"
    sleep 3
done

npm run start
