FROM nginx:1.13-alpine

COPY dist                         /usr/share/nginx/html
COPY nginx-configs/nginx.conf     /etc/nginx/nginx.conf
COPY nginx-configs/default.conf   /etc/nginx/conf.d/default.conf

RUN chmod -R 777 /var/log/nginx /var/cache/nginx/ /var/run/ /usr/share/nginx/html/ \
&& find /etc/nginx -type d -exec chmod 755 {} \; \
&& find /etc/nginx -type f -exec chmod 644 {} \;

EXPOSE 8080 3131

CMD ["nginx", "-g", "daemon off;"]
