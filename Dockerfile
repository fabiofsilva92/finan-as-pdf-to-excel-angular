# Estágio 1: Construir a aplicação Angular
FROM node:20.11.0 as angular
WORKDIR /app
EXPOSE 3000
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls /app/dist/financas-angular  # Adicione este comando para listar os arquivos


# Estágio 2: Servir a aplicação com um servidor web
FROM nginx:alpine
COPY --from=angular /app/dist/financas-angular/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copie o entrypoint.sh para a imagem
COPY entrypoint.sh /usr/share/nginx/html
# Torne o script executável
RUN chmod +x /usr/share/nginx/html/entrypoint.sh

ENTRYPOINT ["/usr/share/nginx/html/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
