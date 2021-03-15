FROM node:12-alpine
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN yarn
EXPOSE 3000
CMD ["yarn", "dev"]