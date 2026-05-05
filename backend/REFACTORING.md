# 🔄 Refatoração: Async/Await com Prisma

## Resumo das Mudanças

Refatoração completa do controller e model para usar **async/await** com **Prisma**, incluindo tratamento robusto de erros.

---

## 📝 Mudanças no Controller (`tarefaController.js`)

### 1. **Async/Await em Todas as Funções**
- ✅ Todas as funções agora são `async`
- ✅ Todas as chamadas ao model usam `await`
- ✅ Funções: `listarTarefas`, `obterTarefa`, `criarTarefa`, `atualizarTarefa`, `deletarTarefa`

```javascript
// ANTES
export function listarTarefas(req, res) {
  const tarefas = TarefaModel.obterTodasTarefas();
  res.json(tarefas);
}

// DEPOIS
export async function listarTarefas(req, res) {
  try {
    const tarefas = await TarefaModel.obterTodasTarefas();
    res.status(200).json({
      sucesso: true,
      dados: tarefas,
      total: tarefas.length
    });
  } catch (erro) {
    // ... tratamento de erro
  }
}
```

### 2. **Try/Catch em Todas as Operações**
Cada função agora possui tratamento de erros com `try/catch`:
- ✅ Captura exceções do Prisma
- ✅ Registra erros no console
- ✅ Retorna respostas de erro apropriadas

### 3. **Respostas JSON Padronizadas**
Todas as respostas agora seguem um padrão consistente:

```json
{
  "sucesso": true,
  "dados": {},
  "total": 0
}
```

#### Respostas de Erro
```json
{
  "sucesso": false,
  "erro": "Descrição do erro",
  "detalhes": "Detalhes técnicos"
}
```

### 4. **Status HTTP Corretos**
- ✅ `200` - Sucesso em operações GET/PATCH/DELETE
- ✅ `201` - Recurso criado (POST)
- ✅ `400` - Validação falhou
- ✅ `404` - Recurso não encontrado
- ✅ `500` - Erro interno do servidor

### 5. **Validações Melhoradas**
- ✅ Validação de ID inválido
- ✅ Validação de descrição vazia
- ✅ Validação de tipo de dados (`concluida` deve ser boolean)
- ✅ Validação de dados vazios na atualização

---

## 🗄️ Mudanças no Model (`tarefaModel.js`)

### 1. **Integração com Prisma**
```javascript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

### 2. **Funções Async com Prisma**

#### `obterTodasTarefas()`
```javascript
export async function obterTodasTarefas() {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: { id: "asc" }
    });
    return tarefas;
  } catch (erro) {
    throw new Error("Erro ao buscar tarefas no banco de dados");
  }
}
```

#### `obterTarefaPorId(id)`
```javascript
export async function obterTarefaPorId(id) {
  try {
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });
    return tarefa;
  } catch (erro) {
    throw new Error("Erro ao buscar tarefa no banco de dados");
  }
}
```

#### `criarTarefa(dados)`
```javascript
export async function criarTarefa(dados) {
  try {
    const novaTarefa = await prisma.tarefa.create({
      data: {
        descricao: dados.descricao.trim(),
        concluida: false
      }
    });
    return novaTarefa;
  } catch (erro) {
    throw new Error("Erro ao criar tarefa no banco de dados");
  }
}
```

#### `atualizarTarefa(id, dados)`
```javascript
export async function atualizarTarefa(id, dados) {
  try {
    // Verifica existência
    const tarefaExistente = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!tarefaExistente) return null;
    
    // Atualiza apenas campos fornecidos
    const dadosAtualizacao = {};
    if (dados.descricao !== undefined) {
      dadosAtualizacao.descricao = dados.descricao.trim();
    }
    if (dados.concluida !== undefined) {
      dadosAtualizacao.concluida = dados.concluida;
    }
    
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: dadosAtualizacao
    });
    
    return tarefaAtualizada;
  } catch (erro) {
    throw new Error("Erro ao atualizar tarefa no banco de dados");
  }
}
```

#### `deletarTarefa(id)`
```javascript
export async function deletarTarefa(id) {
  try {
    // Verifica existência
    const tarefaExistente = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!tarefaExistente) return null;
    
    const tarefaRemovida = await prisma.tarefa.delete({
      where: { id: parseInt(id) }
    });
    
    return tarefaRemovida;
  } catch (erro) {
    throw new Error("Erro ao deletar tarefa no banco de dados");
  }
}
```

### 3. **Tratamento de Erros**
- ✅ Try/catch em todas as operações Prisma
- ✅ Mensagens de erro descritivas
- ✅ Logs no console para debug

---

## 🛣️ Mudanças nas Rotas (`tarefaRoutes.js`)

### Atualização de Nomenclatura
```javascript
// ANTES
router.delete("/tarefas/:id", TarefaController.excluirTarefa);

// DEPOIS
router.delete("/tarefas/:id", TarefaController.deletarTarefa);
```

---

## 📊 Resumo CRUD Completo

| Operação | Método | Rota | Status |
|----------|--------|------|--------|
| **Listar** | GET | `/tarefas` | ✅ 200 |
| **Obter por ID** | GET | `/tarefas/:id` | ✅ 200 |
| **Criar** | POST | `/tarefas` | ✅ 201 |
| **Atualizar** | PATCH | `/tarefas/:id` | ✅ 200 |
| **Deletar** | DELETE | `/tarefas/:id` | ✅ 200 |

---

## 🔍 Exemplo de Uso

### Criar Tarefa
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Nova tarefa"}'
```

**Resposta (201)**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa criada com sucesso!",
  "dados": {
    "id": 1,
    "descricao": "Nova tarefa",
    "concluida": false
  }
}
```

### Atualizar Tarefa
```bash
curl -X PATCH http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"concluida": true}'
```

**Resposta (200)**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa atualizada com sucesso!",
  "dados": {
    "id": 1,
    "descricao": "Nova tarefa",
    "concluida": true
  }
}
```

### Deletar Tarefa
```bash
curl -X DELETE http://localhost:3000/tarefas/1
```

**Resposta (200)**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa excluída com sucesso!",
  "dados": {
    "id": 1,
    "descricao": "Nova tarefa",
    "concluida": true
  }
}
```

---

## 📋 Pré-requisitos

Certifique-se de que você tem:
- ✅ `@prisma/client` instalado
- ✅ Schema Prisma configurado com model `Tarefa`
- ✅ Migrations aplicadas com `npx prisma migrate`
- ✅ `.env` configurado corretamente

---

## 🚀 Próximos Passos

1. Executar migrations do Prisma
2. Testar todas as rotas
3. Adicionar validações adicionais conforme necessário
4. Implementar autenticação/autorização

