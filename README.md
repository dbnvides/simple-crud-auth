# 🔐 Auth API - Node.js + Express + Prisma

API de autenticação construída com Node.js, Express, Prisma ORM e JWT. Permite registro e login de usuários com senhas criptografadas.
Ainda em desenvolvimento somente para estudos
---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (jsonwebtoken)**
- **Bcrypt (bcryptjs)**
- **dotenv**
- **Nodemon (dev)**

---

## 📦 Instalação

git clone https://github.com/seu-usuario/auth-api.git
cd auth-api
npm install

## ⚙️ Configuração
1 - Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

DATABASE_URL="postgresql://user:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"

2 -Inicialize o Prisma:

npx prisma migrate dev --name init

3 - Inicie o servidor:

npm run dev

