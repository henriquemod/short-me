FROM node:16.17-alpine

RUN apk --no-cache add curl

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
    CMD curl -f http://localhost/ || exit 1

WORKDIR /var/app
ENV NODE_ENV hml
ENV DB_HOST postgres

COPY packages/backend/build ./build
COPY node_modules ./node_modules
COPY docker-entrypoint.sh ./

RUN ["chmod", "+x", "./docker-entrypoint.sh"]

EXPOSE 8080

ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["start"]
