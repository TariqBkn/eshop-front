 FROM node:14-alpine as build
 WORKDIR /usr/src/app
 COPY . ./
 RUN npm install
 RUN npm i jquery@1.9.1 --save
 RUN npm run ng build --prod

 FROM nginx:1.15.2-alpine as production
 COPY --from=build /usr/src/app/dist/eshop-front /var/www
 COPY nginx.conf /etc/nginx/nginx.conf
 EXPOSE 3000
 ENTRYPOINT ["nginx", "-g", "daemon off;"]