# 🚀 Gerenciador de Tarefas

## 📌 Descrição

O **Gerenciador de Tarefas** é uma API REST desenvolvida para facilitar o gerenciamento de tarefas, permitindo que usuários criem contas, realizem autenticação, gerenciem tarefas (CRUD) e atribuam atividades a membros de times específicos com controle de status e prioridade. A aplicação foi construída com foco em boas práticas de organização de código, separação de responsabilidades e confiabilidade.

### 💡 Funcionalidades

- **Autenticação de Usuários**: Criação de contas e login seguro.
- **Gerenciamento de Tarefas**: Operações completas de CRUD (Criar, Ler, Atualizar, Deletar) para tarefas.
- **Atribuição de Tarefas**: Associação de tarefas a membros de times específicos.
- **Controle de Status e Prioridade**: Definição de status e níveis de prioridade para acompanhamento eficiente das atividades.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o backend.
- **Express**: Framework para construção da API REST.
- **Prisma ORM**: Gerenciamento de banco de dados com mapeamento objeto-relacional.
- **Docker**: Contêinerização para facilitar deploy e desenvolvimento.
- **Jest + Supertest**: Ferramentas para testes automatizados, garantindo a confiabilidade da API.
- **Middlewares**: Implementação de autenticação e autorização para segurança das rotas.

### 💻 Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/eomgn/gerenciador-tarefas.git
   cd gerenciador-tarefas
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente (crie um arquivo `.env` com base no `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Inicie o banco de dados e a aplicação com Docker:
   ```bash
   docker-compose up -d
   ```
5. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
6. Inicie a API:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000` (ou a porta configurada no `.env`).

## 🤝 Contribuições

Quer contribuir com este projeto? Siga estes passos:

```sh
git fork
git checkout -b minha-mudanca
git commit -m "descrição da alteração"
git push origin minha-mudanca
```

Depois, abra um **Pull Request**.

## 🛜 Social

- [Linkedin](https://www.linkedin.com/in/eomgn/)
- [GitHub](https://github.com/eomgn)
- [Rocketseat](https://app.rocketseat.com.br/me/eomgn)

```readme
 Feito com ❤️ e atenção com propósito de aprendizagem contínua.
```
