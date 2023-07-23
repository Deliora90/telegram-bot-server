FROM node:18
# создание директории приложения
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# установка зависимостей
# Для использования в продакшне
# RUN npm install --production
COPY package*.json ./
RUN npm install
# Копирование файлов проекта
COPY . .
# Уведомление о порте, который будет прослушивать работающее приложение
EXPOSE 3000
# Запуск проекта
CMD ["npm", "start"]