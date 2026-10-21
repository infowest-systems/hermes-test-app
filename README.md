# Hermes Test APP

Página Hello World com Next.js e React, preparada para GitHub Pages e Vercel.

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Teste e build

```sh
npm test
npm run build
```

O build estático é gerado em `out/`.

## GitHub Pages

O workflow `.github/workflows/pages.yml` testa, compila com
`NEXT_PUBLIC_BASE_PATH=/hermes-test-app` e publica cada push em `main`.

## Vercel

Importe este repositório com o framework Next.js e o comando de build
`npm run build`. Não defina `NEXT_PUBLIC_BASE_PATH`: na Vercel a aplicação
é servida na raiz. Não são necessários segredos para compilar a aplicação.
