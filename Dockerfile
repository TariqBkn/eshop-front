# FROM node:latest as build
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# RUN npm i jquery@1.9.1 --save
# COPY . .
# RUN npm run build --prod

# FROM nginx:alpine as production
# COPY --from=build /app/dist/eshop-front /usr/share/nginx/html
# COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]


FROM node

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g @angular/cli@9.1.3

COPY . /usr/src/app

CMD ng serve --host 0.0.0.0 --port 4200