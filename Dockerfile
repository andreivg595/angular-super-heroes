# stage 1 - build the image, generate dist folder
FROM node:18.16.0 as build
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# stage 2 - image to run the application
FROM nginx:alpine
COPY --from=build /app/dist/angular-super-heroes /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]