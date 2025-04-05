FROM node:22

RUN apt update && apt install -y curl 

WORKDIR /app

# package json -> npm install -> docker volume mount -> npm run
COPY package*.json ./

# 배포용
# COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]