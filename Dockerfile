ARG node_image

FROM $node_image

COPY . .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]