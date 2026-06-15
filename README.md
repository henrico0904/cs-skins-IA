# CS Skins 🎮

Aplicação React + Tailwind CSS + Supabase para gerenciar skins do Counter-Strike 2.

---

## Stack

| Camada     | Tecnologia                  |
|------------|-----------------------------|
| UI         | React 18 + Vite             |
| Estilos    | Tailwind CSS 3              |
| Banco      | Supabase (PostgreSQL)       |
| Deploy     | Vercel                      |

---

## Estrutura do projeto

```
cs-skins/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── .env.example           ← copie para .env.local
├── supabase/
│   └── schema.sql         ← rode no SQL Editor do Supabase
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   ├── supabase.js    ← cliente Supabase
    │   ├── api.js         ← funções de CRUD
    │   └── utils.js       ← helpers + mock data
    ├── hooks/
    │   └── useSkins.js    ← estado global das skins
    └── components/
        ├── Header.jsx
        ├── Carousel.jsx   ← carrossel das mais caras
        ├── SkinsGrid.jsx  ← mural em grid
        ├── SkinCard.jsx   ← card individual
        └── AddSkinForm.jsx
```

---

## Configuração local

```bash
# 1. Instalar dependências
npm install

# 2. Criar o arquivo de variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# 3. Criar a tabela no Supabase
# Abra o SQL Editor no painel do Supabase e execute:
# supabase/schema.sql

# 4. Rodar em desenvolvimento
npm run dev
```

---

## Variáveis de ambiente (Vercel)

No painel da Vercel: **Project Settings → Environment Variables**

| Variável                  | Onde encontrar no Supabase            |
|---------------------------|---------------------------------------|
| `VITE_SUPABASE_URL`       | Settings → API → Project URL          |
| `VITE_SUPABASE_ANON_KEY`  | Settings → API → anon / public key    |

> ⚠️ O prefixo `VITE_` é obrigatório para o Vite expor a variável ao bundle do navegador.

---

## Tabela `ideias` no Supabase

| Coluna       | Tipo           | Descrição                        |
|--------------|----------------|----------------------------------|
| `id`         | uuid (PK)      | Gerado automaticamente           |
| `nome`       | text           | Nome da skin (ex: Dragon Lore)   |
| `arma`       | text           | Arma (ex: AWP, AK-47)            |
| `preco`      | numeric(12,2)  | Preço em BRL                     |
| `raridade`   | text           | Classificação de raridade        |
| `imagem_url` | text           | URL da imagem (opcional)         |
| `criado_em`  | timestamptz    | Timestamp de criação             |

---

## Funções de CRUD (`src/lib/api.js`)

```js
// Buscar todas as skins ordenadas por preço
const skins = await fetchSkins()

// Inserir nova skin
const nova = await insertSkin({ nome, arma, preco, raridade, imagem_url })

// Deletar por ID
await deleteSkin(id)
```

---

## Modo Demo

Se `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` não estiverem definidas,  
a aplicação usa **dados mock locais** automaticamente — útil para testar o visual  
antes de configurar o banco.

---

## Deploy na Vercel

```bash
# Via CLI
npx vercel --prod

# Ou importe o repositório em vercel.com e configure as env vars acima.
```
