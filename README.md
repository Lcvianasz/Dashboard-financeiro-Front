# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 📄 README do Frontend (`README-frontend.md`)

```markdown
# Dashboard Financeiro - Frontend

Interface web para controle financeiro pessoal e carteira de investimentos.

## 📋 Tecnologias

- React 18
- TypeScript
- Vite
- Axios
- React Router DOM
- Recharts (gráficos)
- Lucide React (ícones)
- CSS Modules + CSS customizado

## 🚀 Funcionalidades

- ✅ Dashboard com resumo de receitas/despesas e gráficos
- ✅ Gerenciamento de metas financeiras
- ✅ Lançamento de transações (entrada/saída)
- ✅ Carteira de investimentos (visualização, compra, venda)
- ✅ Cotação de ativos em tempo real (via API integrada)
- ✅ Gráfico de rentabilidade por ativo
- ✅ Layout responsivo e tema escuro

## 🛠️ Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend rodando em `http://localhost:8080`

## ⚙️ Instalação e execução

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/dashboard-financeiro-frontend.git
cd dashboard-financeiro-frontend

    Instale as dependências

bash

npm install
# ou
yarn install

    Configure o proxy (opcional)
    O arquivo vite.config.ts já possui proxy para /api apontando para http://localhost:8080.

    Execute o projeto

bash

npm run dev

A aplicação estará disponível em http://localhost:3000.
📁 Estrutura do Projeto
text

src/
├── api/               – Configuração do Axios e serviços de API
├── components/        – Componentes reutilizáveis (Sidebar, Tabela, Cards, etc.)
├── hooks/             – Hooks personalizados (useCarteira, useCotacao)
├── pages/             – Páginas da aplicação (Dashboard, Metas, Transacoes, Investimentos)
├── types/             – Definições TypeScript
├── utils/             – Funções utilitárias (formatação de moeda, percentual)
├── App.tsx            – Rotas principais
└── main.tsx           – Ponto de entrada

🧪 Scripts Disponíveis

    npm run dev – Inicia o servidor de desenvolvimento (porta 3000)

    npm run build – Gera a build de produção

    npm run preview – Visualiza a build localmente

    npm run lint – Executa o ESLint

🔗 Integração com o Backend

Certifique-se de que o backend esteja rodando na porta 8080.
O frontend utiliza um proxy para evitar problemas de CORS:
ts

// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  }
}

🎨 Personalização

    As cores e estilos podem ser alterados em src/index.css e nos CSS modules de cada componente.

    O tema escuro é padrão, mas pode ser modificado globalmente.

📌 Observações

    O header X-User-Id: 1 é adicionado automaticamente em todas as requisições via interceptor do Axios (para testes).

    Os gráficos são gerados com Recharts e respondem aos dados reais da carteira.

👨‍💻 Autor
Lucas Viana Souza
