FROM denoland/deno:1.40.4

WORKDIR /app

ADD . /app

RUN deno cache main.ts

CMD ["run", "--allow-all", "main.ts"]