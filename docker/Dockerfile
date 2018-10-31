FROM node:8

USER node
WORKDIR /home/node

COPY index.js .
COPY package.json .

RUN npm install

RUN openssl genrsa -out rootCA.key 4096
RUN openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.crt \
    -subj "/C=US/ST=New Jersey/L=Princeton /O=Dow Jones/OU=PIB/CN=*.default.svc/emailAddress=scott.rahner@dowjones.com"
RUN openssl genrsa -out webhook.key 4096
RUN openssl req -new -key webhook.key -out webhook.csr \
    -subj "/C=US/ST=New Jersey/L=Princeton /O=Dow Jones/OU=PIB/CN=webhook-service.default.svc/emailAddress=scott.rahner@dowjones.com"
RUN openssl x509 -req -in webhook.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out webhook.crt -days 1024 -sha256
RUN cat rootCA.crt | base64 | tr -d '\n'

CMD node index.js
