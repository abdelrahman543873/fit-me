FROM node:18

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]