FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf

# nginx 를 global 설정을 전달하고, daemon off로 기본 백그라운드에서 포그라운드로 변경
CMD ["nginx", "-g", "daemon off;"]