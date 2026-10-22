# Exclusive Media — Hermes Test APP

Site estático com Next.js e React voltado a profissionais de fotografia.
Identidade editorial em tons escuros, imagens de referência, galeria de inspiração
e seções sobre composição e expressão visual. As fotos não são apresentadas como
um portfólio autoral; veja `docs/image-credits.md`. Publicação atual no GitHub Pages;
a publicação na Vercel permanece adiada.

Site: https://infowest-systems.github.io/hermes-test-app/

## Login demonstrativo

A entrada do site mostra o formulário de login. Use **Renato** e **321**. As credenciais e sessões anteriores não são aceitas.
Após entrar, a rota `/home/` exibe a página principal com o botão **Sair**.
A sessão permanece durante a navegação e o recarregamento na mesma aba;
ao sair, o acesso direto à home retorna ao login.

**Não é autenticação de produção.** As credenciais são públicas e verificadas
no cliente; a sessão usa `sessionStorage`, não há backend e qualquer pessoa
pode contornar essas verificações. Não hospede dados privados neste projeto.
A senha digitada não é armazenada. A publicação na Vercel continua adiada.

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

## Teste de navegador

```sh
npx playwright install chromium
NEXT_PUBLIC_BASE_PATH=/hermes-test-app npm run build
npm run test:browser
```

O teste inicia um servidor local temporário e verifica credenciais incorretas,
login, recarregamento, logoff, bloqueio demonstrativo da home e tela mobile.
O sistema precisa das bibliotecas de execução do Chromium. Para usar um
navegador já instalado, defina `CHROMIUM_PATH`. Para testar a publicação,
defina `TEST_BASE_URL=https://infowest-systems.github.io/hermes-test-app/`.
As capturas são opcionais via `SCREENSHOT_DIR`.

## GitHub Pages

O workflow `.github/workflows/pages.yml` testa, compila com
`NEXT_PUBLIC_BASE_PATH=/hermes-test-app` e publica cada push em `main`.

## Vercel

Importe este repositório com o framework Next.js e o comando de build
`npm run build`. Não defina `NEXT_PUBLIC_BASE_PATH`: na Vercel a aplicação
é servida na raiz. Não são necessários segredos para compilar a aplicação.
