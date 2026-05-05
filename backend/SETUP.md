# 🎯 Setup e Próximos Passos

## ✨ O que foi Refatorado

### ✅ Controller (`tarefaController.js`)
- [x] Todas as 5 funções convertidas para `async`
- [x] Implementado `await` em todas as chamadas ao model
- [x] `try/catch` em todas as operações
- [x] Respostas JSON padronizadas com `sucesso`, `dados`, `erro`
- [x] Status HTTP corretos (200, 201, 400, 404, 500)
- [x] Validações melhoradas
- [x] Logs de erro no console

### ✅ Model (`tarefaModel.js`)
- [x] Integração com Prisma Client
- [x] Todas as 5 funções convertidas para `async`
- [x] Operações CRUD com Prisma:
  - `obterTodasTarefas()` - findMany
  - `obterTarefaPorId(id)` - findUnique
  - `criarTarefa(dados)` - create
  - `atualizarTarefa(id, dados)` - update
  - `deletarTarefa(id)` - delete
- [x] `try/catch` para todas as operações
- [x] Validação de existência antes de deletar/atualizar

### ✅ Rotas (`tarefaRoutes.js`)
- [x] Atualização de nomenclatura: `excluirTarefa` → `deletarTarefa`
- [x] Todas as rotas apontando para funções async corretamente

### ✅ Schema Prisma (`schema.prisma`)
- [x] Model `Tarefa` configurado com campos corretos
- [x] Timestamps: `createdAt`, `updatedAt`
- [x] Campos: `id`, `descricao`, `concluida`

---

## 🚀 Instruções de Setup

### 1. Instalar Dependências
```bash
cd backend
npm install
```

### 2. Configurar Banco de Dados

**Criar arquivo `.env`:**
```bash
# Para MySQL
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_banco"

# OU Para SQLite (desenvolvimento)
DATABASE_URL="file:./dev.db"

# OU Para PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco"
```

### 3. Executar Migrations
```bash
# Criar/atualizar o banco de dados
npx prisma migrate dev --name init

# OU apenas sincronizar (sem histórico)
npx prisma db push
```

### 4. Gerar Prisma Client
```bash
npx prisma generate
```

### 5. Iniciar o Servidor
```bash
npm start
```

### 6. Testar a API
```bash
# Listar tarefas
curl http://localhost:3000/tarefas

# Criar tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Minha primeira tarefa"}'
```

---

## 📁 Estrutura de Arquivos Refatorada

```
backend/
├── src/
│   ├── controllers/
│   │   └── tarefaController.js      ✅ Refatorado com async/await
│   ├── models/
│   │   └── tarefaModel.js           ✅ Refatorado com Prisma
│   ├── routes/
│   │   └── tarefaRoutes.js          ✅ Atualizado com deletarTarefa
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma                ✅ Model Tarefa configurado
├── .env                             📝 Novo - Configurar DB
├── REFACTORING.md                   📝 Novo - Documentação detalhada
├── TESTES.md                        📝 Novo - Guia de testes
├── SETUP.md                         📝 Este arquivo
└── package.json
```

---

## 🔗 Dependências Necessárias

Certifique-se de ter estas dependências no `package.json`:

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "@prisma/client": "^5.0.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0"
  }
}
```

Se não tiver, instale:
```bash
npm install express @prisma/client
npm install -D prisma
```

---

## ⚙️ Configuração do Express App

Verifique se seu `app.js` está importando as rotas corretamente:

```javascript
import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use(tarefaRoutes);

export default app;
```

---

## 🧪 Verificar Integridade

### 1. Testar Async/Await
```bash
# No arquivo do controller, todas as funções devem ter 'async'
grep "export async function" src/controllers/tarefaController.js
```

### 2. Testar Try/Catch
```bash
# Todas as funções devem ter try/catch
grep -c "try {" src/controllers/tarefaController.js
```

### 3. Testar Importação Prisma
```bash
# O model deve importar PrismaClient
grep "PrismaClient" src/models/tarefaModel.js
```

---

## 📊 Exemplo Completo de Fluxo

```javascript
// 1. Request chega na rota
GET /tarefas/1

// 2. Router chama o controller (agora async)
export async function obterTarefa(req, res) {
  try {
    // 3. Controller faz await da chamada ao model
    const tarefa = await TarefaModel.obterTarefaPorId(1);
    
    // 4. Model executa query Prisma com await
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: 1 }
    });
    
    // 5. Resposta é retornada com sucesso
    res.json({ sucesso: true, dados: tarefa });
  } catch (erro) {
    // 6. Se houver erro, é capturado e retornado
    res.status(500).json({ sucesso: false, erro: erro.message });
  }
}
```

---

## 🔐 Boas Práticas Implementadas

✅ **Async/Await** em vez de Callbacks  
✅ **Try/Catch** para tratamento de erros  
✅ **Prisma** para operações seguras no banco  
✅ **Status HTTP** corretos (200, 201, 400, 404, 500)  
✅ **Validações** de entrada  
✅ **Logs** de erro para debug  
✅ **Respostas Padronizadas** com estrutura `{ sucesso, dados, erro }`  
✅ **Separação de Responsabilidades** (MVC)  

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Cannot find module @prisma/client" | `npm install @prisma/client` |
| "DATABASE_URL is not defined" | Crie/configure o arquivo `.env` |
| "Migration pending" | `npx prisma migrate dev` |
| "Port already in use" | Mude a porta no `server.js` |
| "async function not awaited" | Certifique-se de usar `await` em funções async |
| "Prisma client not initialized" | Importe e instancie `PrismaClient` no model |

---

## 📖 Documentação Adicional

- `REFACTORING.md` - Detalhes completos das mudanças
- `TESTES.md` - Exemplos de testes com curl e Postman
- [Documentação Prisma](https://www.prisma.io/docs)
- [Express Async/Await](https://expressjs.com/en/guide/routing.html)

---

## ✅ Checklist de Verificação

- [ ] `.env` configurado com `DATABASE_URL`
- [ ] `npm install` executado com sucesso
- [ ] `npx prisma migrate dev` completado
- [ ] Servidor inicia sem erros: `npm start`
- [ ] GET `/tarefas` retorna array de tarefas
- [ ] POST `/tarefas` cria uma nova tarefa
- [ ] PATCH `/tarefas/:id` atualiza tarefa
- [ ] DELETE `/tarefas/:id` deleta tarefa
- [ ] Erros retornam status HTTP corretos

---

## 🎉 Próximas Melhorias Sugeridas

1. **Autenticação** - Adicionar JWT ou sessões
2. **Validação** - Usar biblioteca como `zod` ou `joi`
3. **Testes** - Implementar testes com Jest
4. **Documentação** - Gerar docs com Swagger
5. **Logging** - Usar Winston ou Pino para logs
6. **Rate Limiting** - Proteger contra abuso
7. **Paginação** - Adicionar limit/offset em listagens
8. **Filtros** - Buscar por status, data, etc.

---

**Refatoração Concluída! ✨**

Agora seu código segue as melhores práticas com async/await e Prisma.

