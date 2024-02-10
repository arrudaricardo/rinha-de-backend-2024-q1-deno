# Submissão para Rinha de Backend, Segunda Edição: 2024/Q1 - Controle de Concorrência

<div style="display:flex; vertical-align:middle; align-itens:center;">
    <img src="https://en.wikipedia.org/wiki/Caddy_(web_server)#/media/File:Caddy_2_lock_icon_and_wordmark_logo.svg" alt="logo caddy" height="50" width="auto" style="padding-right:30px;">
    <img src="https://bun.sh/logo.svg" alt="logo bun" height="50" width="auto" style="padding-right:30px;">
    <img src="https://en.wikipedia.org/wiki/File:Postgresql_elephant.svg" alt="logo Postgresql_elephant" height="50" width="auto" style="padding-right:30px;">
</div>

## Stack

- `Caddy` load balancer
- `PostgreSQL` Database 
- `Bun` javascript API runtime 

## Implementação

  Eu inicialmente tenti usar [Deno KV](https://deno.com/kv) porem [Deno server](https://docs.deno.com/runtime/tutorials/http_server) não conseguiu aguentar o stress test, porem [Bun](https://bun.sh/docs/api/http) passou os testes.

- [Source](https://github.com/arrudaricardo/rinha-de-backend-2024-q1-bun)

## Autor

[Ricardo de Arruda](https://www.github.com/arrudaricardo/)
