FROM node:current-alpine3.19

WORKDIR /netflix-clone

COPY . /netflix-clone

RUN npm install

EXPOSE 3000

CMD ["npm","run","dev"]
