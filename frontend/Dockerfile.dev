FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli && npm install

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]
