FROM node:18

COPY . .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]