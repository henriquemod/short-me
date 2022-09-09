FROM node:16.17-alpine

RUN apk --no-cache add curl

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
    CMD curl -f http://localhost/ || exit 1

WORKDIR /var/app
ENV NODE_ENV hml
ENV DB_HOST postgres

COPY . ./

RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && NODE_ENV=development yarn --no-progress --non-interactive \
    && yarn build \
    && rm -rf ~/.cache/yarn \
    && apk del build-dependencies

RUN ["chmod", "+x", "./docker-entrypoint.sh"]

EXPOSE 8080

ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["start"]
