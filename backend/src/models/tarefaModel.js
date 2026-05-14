// ========================================
// MODEL - CAMADA DE DADOS
// ========================================
// Esta camada é responsável por:
// - Armazenar os dados (em memória, banco de dados, etc.)
// - Implementar a lógica de negócio
// - Realizar operações CRUD (Create, Read, Update, Delete)

import { prisma } from "../config/prisma.js";

// ========================================
// OPERAÇÕES CRUD COM PRISMA
// ========================================

/**
 * Retorna todas as tarefas cadastradas
 * @returns {Promise<Array>} - Promise com array de todas as tarefas
 */
export async function obterTodasTarefas() {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: {
        id: "asc"
      }
    });
    return tarefas;
  } catch (erro) {
    console.error("Erro ao obter todas as tarefas:", erro);
    throw new Error("Erro ao buscar tarefas no banco de dados");
  }
}

/**
 * Procura uma tarefa específica pelo id
 * @param {number} id - ID da tarefa a ser buscada
 * @returns {Promise<Object|null>} - Promise com a tarefa encontrada ou null
 */
export async function obterTarefaPorId(id) {
  try {
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });
    return tarefa;
  } catch (erro) {
    console.error("Erro ao obter tarefa por ID:", erro);
    throw new Error("Erro ao buscar tarefa no banco de dados");
  }
}

/**
 * Cria uma nova tarefa
 * @param {Object} dados - Objeto contendo os dados da tarefa
 * @param {string} dados.descricao - Descrição da nova tarefa
 * @returns {Promise<Object>} - Promise com a tarefa criada
 */
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
    console.error("Erro ao criar tarefa:", erro);
    throw new Error("Erro ao criar tarefa no banco de dados");
  }
}

/**
 * Atualiza uma tarefa existente
 * Pode atualizar a descrição e/ou o status de conclusão
 * @param {number} id - ID da tarefa a ser atualizada
 * @param {Object} dados - Objeto contendo os dados a atualizar
 * @param {string} dados.descricao - Nova descrição (opcional)
 * @param {boolean} dados.concluida - Novo status de conclusão (opcional)
 * @returns {Promise<Object|null>} - Promise com a tarefa atualizada ou null
 */
export async function atualizarTarefa(id, dados) {
  try {
    // Verifica se a tarefa existe antes de atualizar
    const tarefaExistente = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });

    if (!tarefaExistente) {
      return null;
    }

    // Prepara os dados para atualização
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
    console.error("Erro ao atualizar tarefa:", erro);
    throw new Error("Erro ao atualizar tarefa no banco de dados");
  }
}

/**
 * Exclui uma tarefa pelo id
 * @param {number} id - ID da tarefa a ser excluída
 * @returns {Promise<Object|null>} - Promise com a tarefa removida ou null
 */
export async function deletarTarefa(id) {
  try {
    // Verifica se a tarefa existe antes de deletar
    const tarefaExistente = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) }
    });

    if (!tarefaExistente) {
      return null;
    }

    const tarefaRemovida = await prisma.tarefa.delete({
      where: { id: parseInt(id) }
    });

    return tarefaRemovida;
  } catch (erro) {
    console.error("Erro ao deletar tarefa:", erro);
    throw new Error("Erro ao deletar tarefa no banco de dados");
  }
}
