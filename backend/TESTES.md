# 📚 Guia de Testes - API de Tarefas com Async/Await

## 🚀 Iniciando o Servidor

```bash
cd backend
npm install
npx prisma migrate dev
npm start
```

---

## 📡 Endpoints e Exemplos de Teste

### 1️⃣ **Listar Todas as Tarefas**

**Request:**
```bash
curl -X GET http://localhost:3000/tarefas
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "descricao": "Estudar química",
      "concluida": false,
      "createdAt": "2024-04-30T10:00:00Z",
      "updatedAt": "2024-04-30T10:00:00Z"
    },
    {
      "id": 2,
      "descricao": "Criar páginas no Figma",
      "concluida": true,
      "createdAt": "2024-04-30T10:05:00Z",
      "updatedAt": "2024-04-30T10:05:00Z"
    }
  ],
  "total": 2
}
```

---

### 2️⃣ **Obter Tarefa Específica**

**Request:**
```bash
curl -X GET http://localhost:3000/tarefas/1
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "descricao": "Estudar química",
    "concluida": false,
    "createdAt": "2024-04-30T10:00:00Z",
    "updatedAt": "2024-04-30T10:00:00Z"
  }
}
```

**Response com ID Inválido (404):**
```json
{
  "sucesso": false,
  "erro": "Tarefa não encontrada"
}
```

---

### 3️⃣ **Criar Nova Tarefa**

**Request:**
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Estudar matemática"
  }'
```

**Response (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa criada com sucesso!",
  "dados": {
    "id": 3,
    "descricao": "Estudar matemática",
    "concluida": false,
    "createdAt": "2024-04-30T10:10:00Z",
    "updatedAt": "2024-04-30T10:10:00Z"
  }
}
```

**Response com Descrição Vazia (400):**
```json
{
  "sucesso": false,
  "erro": "Descrição é obrigatória"
}
```

---

### 4️⃣ **Atualizar Tarefa (Parcialmente)**

**Request - Atualizar Descrição:**
```bash
curl -X PATCH http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Estudar química avançada"
  }'
```

**Request - Marcar como Concluída:**
```bash
curl -X PATCH http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "concluida": true
  }'
```

**Request - Atualizar Ambos:**
```bash
curl -X PATCH http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Estudar química avançada",
    "concluida": true
  }'
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa atualizada com sucesso!",
  "dados": {
    "id": 1,
    "descricao": "Estudar química avançada",
    "concluida": true,
    "createdAt": "2024-04-30T10:00:00Z",
    "updatedAt": "2024-04-30T10:15:00Z"
  }
}
```

**Response com Descrição Inválida (400):**
```json
{
  "sucesso": false,
  "erro": "Descrição inválida"
}
```

**Response com concluida Inválido (400):**
```json
{
  "sucesso": false,
  "erro": "concluida deve ser boolean"
}
```

**Response sem Dados (400):**
```json
{
  "sucesso": false,
  "erro": "Nenhum dado foi fornecido para atualização"
}
```

---

### 5️⃣ **Deletar Tarefa**

**Request:**
```bash
curl -X DELETE http://localhost:3000/tarefas/1
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Tarefa excluída com sucesso!",
  "dados": {
    "id": 1,
    "descricao": "Estudar química",
    "concluida": true,
    "createdAt": "2024-04-30T10:00:00Z",
    "updatedAt": "2024-04-30T10:15:00Z"
  }
}
```

**Response com ID Não Encontrado (404):**
```json
{
  "sucesso": false,
  "erro": "Tarefa não encontrada"
}
```

---

## 🛠️ Testes com Postman

### Importar Collection

1. Abra o Postman
2. Clique em **Import**
3. Cole o JSON abaixo ou selecione o arquivo

```json
{
  "info": {
    "name": "API de Tarefas",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Listar Tarefas",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/tarefas",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tarefas"]
        }
      }
    },
    {
      "name": "Obter Tarefa",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/tarefas/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tarefas", "1"]
        }
      }
    },
    {
      "name": "Criar Tarefa",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"descricao\": \"Nova tarefa\"}"
        },
        "url": {
          "raw": "http://localhost:3000/tarefas",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tarefas"]
        }
      }
    },
    {
      "name": "Atualizar Tarefa",
      "request": {
        "method": "PATCH",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"concluida\": true}"
        },
        "url": {
          "raw": "http://localhost:3000/tarefas/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tarefas", "1"]
        }
      }
    },
    {
      "name": "Deletar Tarefa",
      "request": {
        "method": "DELETE",
        "url": {
          "raw": "http://localhost:3000/tarefas/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["tarefas", "1"]
        }
      }
    }
  ]
}
```

---

## ✅ Casos de Teste Importantes

### Teste de Validação

| Caso | Entrada | Status | Resultado |
|------|---------|--------|-----------|
| Descrição vazia | `{"descricao": ""}` | 400 | "Descrição é obrigatória" |
| ID inválido | `/tarefas/abc` | 400 | "ID inválido" |
| ID não encontrado | `/tarefas/9999` | 404 | "Tarefa não encontrada" |
| concluida não boolean | `{"concluida": "sim"}` | 400 | "concluida deve ser boolean" |
| Nenhum dado enviado | `{}` | 400 | "Nenhum dado foi fornecido para atualização" |

---

## 🔍 Observar Logs

Ao testar, observe os logs do servidor:

```
Erro ao listar tarefas: [erro específico]
Erro ao criar tarefa: [erro específico]
Erro ao atualizar tarefa: [erro específico]
Erro ao deletar tarefa: [erro específico]
```

---

## 🌐 Usando Thunder Client (VS Code)

Se estiver usando VS Code, instale a extensão **Thunder Client**:

1. Crie uma nova requisição
2. Selecione o método HTTP
3. Insira a URL
4. Configure headers se necessário
5. Adicione o body em JSON

---

## 📊 Estrutura de Dados

### Modelo Tarefa

```javascript
{
  id: number,           // Auto gerado
  descricao: string,    // Descrição da tarefa
  concluida: boolean,   // Status de conclusão
  createdAt: datetime,  // Data de criação
  updatedAt: datetime   // Data da última atualização
}
```

---

## 🐛 Troubleshooting

### Erro: "cannot find module @prisma/client"
```bash
npm install @prisma/client
```

### Erro: "DATABASE_URL não definida"
```bash
# Verifique seu arquivo .env
cat .env
```

### Erro: "Migration pending"
```bash
npx prisma migrate dev
```

### Erro: "Connection refused"
```bash
# Verifique se o servidor está rodando
npm start
```

