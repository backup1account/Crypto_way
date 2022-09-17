FROM python:3.8.5-alpine

RUN mkdir /appbackend

WORKDIR /appbackend

COPY requirements.txt .
COPY . .

RUN apk add --no-cache mariadb-connector-c-dev
RUN apk update && apk add python3 python3-dev mariadb-dev build-base && pip3 install mysqlclient

RUN apk add netcat-openbsd
RUN pip3 install --upgrade pip && pip3 install --no-cache-dir -r requirements.txt