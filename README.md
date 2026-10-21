# Brasil — Hermes Test APP

Página estática com Next.js e React, tema Brasil em verde e amarelo,
com os textos “Deus, Pátria e Família” e “Bolsonaro 2026”. Página pessoal,
sem vínculo oficial. Publicação atual no GitHub Pages;
a publicação na Vercel permanece adiada.

Site: https://infowest-systems.github.io/hermes-test-app/

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
