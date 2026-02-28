# Studium 

## Estrutura do Projeto

Dentro deste projeto Astro você encontrará a seguinte estrutura de pastas:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   ├── CachedRepoList.astro
│   │   ├── PostList.astro
│   │   ├── RepoList.astro
│   │   ├── SideBar.astro
│   │   └── Welcome.astro
│   ├── layouts
│   │   ├── Layout.astro
│   │   └── LinedPaper.astro
│   ├── pages
│   │   ├── admin.astro
│   │   ├── create-post-page.astro
│   │   ├── index.astro
│   │   ├── api/save-post.ts
│   │   ├── blog/[...slug].astro
│   │   ├── blog/index.astro
│   │   ├── projetos/index.astro
│   │   └── sobre/index.astro
│   └── styles
│       └── global.css
└── package.json
```

### Sobre a parte técnica

Este site é construído usando **Astro**, um gerador de sites estáticos moderno que permite misturar componentes JavaScript/TypeScript com HTML puro. A ideia é manter **performance e simplicidade**:

1. **Páginas estáticas** são geradas em build time a partir de arquivos Markdown na pasta `src/content/blog`.
2. **Layouts reutilizáveis** (`Layout.astro`, `LinedPaper.astro`) encapsulam a estrutura HTML básica e injetam o CSS global.
3. **Componentes** como `RepoList` e `PostList` exibem dados dinâmicos (consumidos via API do GitHub ou coleção de conteúdo). O componente `CachedRepoList` adiciona cache local com `localStorage` para reduzir chamadas à API.
4. **Roteamento** é baseado em arquivos dentro de `src/pages` — por exemplo, o arquivo `[...slug].astro` processa qualquer rota `/blog/*` para renderizar postagens individuais.
5. **Styling global** centralizado em `src/styles/global.css`. Variáveis CSS permitem troca rápida de tema e os estilos são aplicados com classes genéricas contínuas.
6. **Admin simples** (`create-post-page.astro`) usa EasyMDE para edição Markdown e salva posts via `api/save-post.ts` (rota serverless que grava arquivos em `src/content/blog`).
7. **Conteúdo em Markdown**: cada post contém frontmatter com título, slug, descrição, autor e data; o Astro usa `astro:content` para processar essas entradas.

O projeto é escrito em **TypeScript** onde apropriado e pode ser extendido com integração a serviços externos (GitHub API, por exemplo).




## Comandos

Todos os comandos são executados a partir da raiz do projeto, em um terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | instala as dependências |
| `npm run dev`             | Inicia um servidor local no endereço `localhost:4321`      |
| `npm run build`           | Builda o site para produção, em`./dist/`|
| `npm run preview`         | Visualiza o site localmente     |
| `npm run astro ...`       | Roda os comandos do Astro, como `astro add`, `astro check` |
| `npm run astro -- --help` | Ajuda do Astro |

## Editando Estilos

Todas as estilizações do site estão centralizadas em `src/styles/global.css`. No topo desse arquivo há propriedades CSS personalizadas (variáveis) como `--color-primary`, `--color-bg` e `--color-text`. Alterar esses valores ajusta rapidamente a aparência de todo o site. Componentes e páginas usam classes genéricas para que as atualizações de tema se propaguem automaticamente.

