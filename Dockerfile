FROM node:16.17-alpine

RUN apk --no-cache add curl

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
    CMD curl -f http://localhost/ || exit 1

WORKDIR /var/app

ENV PORT 8080
ENV APP_ENDPOINT http:/localhost:8080
ENV NODE_ENV development
ENV DB_HOST postgres
ENV DB_PORT 5432
ENV DB_NAME postgres
ENV DB_USER postgres
ENV DB_PWD 123456

COPY packages/backend/ ./
COPY docker-entrypoint.sh ./
RUN yarn install --production

RUN ["chmod", "+x", "./docker-entrypoint.sh"]

EXPOSE ${PORT}

ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["start"]
