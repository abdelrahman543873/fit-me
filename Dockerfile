ARG node_image

FROM $node_image

COPY . .

RUN yarn

EXPOSE 3000

RUN yarn build

CMD [ "node", "dist/main.js" ]