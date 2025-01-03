FROM node:20

WORKDIR /usr/src/app

# Install necessary libraries for the canvas
RUN apt-get update && \
    apt-get install -y build-essential python3 libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev

COPY package.json ./

RUN npm install

COPY . .

COPY .env ./

EXPOSE 3334

CMD ["npm", "run" "start:dev"]