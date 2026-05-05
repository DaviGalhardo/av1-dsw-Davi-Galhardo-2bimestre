// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Retorna todas as tarefas em formato JSON
 * @route GET /tarefas
 */
export async function listarTarefas(req, res) {
  try {
    const tarefas = await TarefaModel.obterTodasTarefas();
    res.status(200).json({
      sucesso: true,
      dados: tarefas,
      total: tarefas.length
    });
  } catch (erro) {
    console.error("Erro ao listar tarefas:", erro);
    res.status(500).json({
      sucesso: false,
      erro: "Erro ao listar tarefas",
      detalhes: erro.message
    });
  }
}

/**
 * Retorna uma tarefa específica com base no id enviado na URL
 * @route GET /tarefas/:id
 */
export async function obterTarefa(req, res) {
  try {
    // Converte o id recebido pela URL para número
    const idNumero = Number(req.params.id);

    // Valida se o id é realmente um número
    if (Number.isNaN(idNumero)) {
      return res.status(400).json({
        sucesso: false,
        erro: "ID inválido"
      });
    }

    // Busca a tarefa pelo id no Model
    const tarefa = await TarefaModel.obterTarefaPorId(idNumero);

    // Se não encontrar, retorna erro 404
    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        erro: "Tarefa não encontrada"
      });
    }

    // Se encontrar, retorna a tarefa
    res.status(200).json({
      sucesso: true,
      dados: tarefa
    });
  } catch (erro) {
    console.error("Erro ao obter tarefa:", erro);
    res.status(500).json({
      sucesso: false,
      erro: "Erro ao obter tarefa",
      detalhes: erro.message
    });
  }
}

/**
 * Cria uma nova tarefa
 * @route POST /tarefas
 */
export async function criarTarefa(req, res) {
  try {
    // Pega a descrição enviada no corpo da requisição
    const { descricao } = req.body;

    // Valida se a descrição foi enviada corretamente
    if (typeof descricao !== "string" || descricao.trim() === "") {
      return res.status(400).json({
        sucesso: false,
        erro: "Descrição é obrigatória"
      });
    }

    // Cria a nova tarefa através do Model
    const tarefaCriada = await TarefaModel.criarTarefa({
      descricao: descricao.trim()
    });

    // Retorna status 201 (criado com sucesso)
    res.status(201).json({
      sucesso: true,
      mensagem: "Tarefa criada com sucesso!",
      dados: tarefaCriada
    });
  } catch (erro) {
    console.error("Erro ao criar tarefa:", erro);
    res.status(500).json({
      sucesso: false,
      erro: "Erro ao criar tarefa",
      detalhes: erro.message
    });
  }
}

/**
 * Atualiza parcialmente uma tarefa existente
 * @route PATCH /tarefas/:id
 */
export async function atualizarTarefa(req, res) {
  try {
    // Converte o id da URL para número
    const idNumero = Number(req.params.id);

    // Pega os dados enviados no corpo da requisição
    const { descricao, concluida } = req.body;

    // Valida o id
    if (Number.isNaN(idNumero)) {
      return res.status(400).json({
        sucesso: false,
        erro: "ID inválido"
      });
    }

    // Valida a descrição, se ela foi enviada
    if (
      descricao !== undefined &&
      (typeof descricao !== "string" || descricao.trim() === "")
    ) {
      return res.status(400).json({
        sucesso: false,
        erro: "Descrição inválida"
      });
    }

    // Valida o status concluida, se ele foi enviado
    if (concluida !== undefined && typeof concluida !== "boolean") {
      return res.status(400).json({
        sucesso: false,
        erro: "concluida deve ser boolean"
      });
    }

    // Prepara os dados para atualização
    const dadosAtualizacao = {};
    if (descricao !== undefined) {
      dadosAtualizacao.descricao = descricao.trim();
    }
    if (concluida !== undefined) {
      dadosAtualizacao.concluida = concluida;
    }

    // Se nenhum dado foi enviado, retorna erro
    if (Object.keys(dadosAtualizacao).length === 0) {
      return res.status(400).json({
        sucesso: false,
        erro: "Nenhum dado foi fornecido para atualização"
      });
    }

    // Tenta atualizar a tarefa através do Model
    const tarefaAtualizada = await TarefaModel.atualizarTarefa(
      idNumero,
      dadosAtualizacao
    );

    // Se não encontrar a tarefa, retorna erro 404
    if (!tarefaAtualizada) {
      return res.status(404).json({
        sucesso: false,
        erro: "Tarefa não encontrada"
      });
    }

    // Se atualizar com sucesso, retorna a tarefa atualizada
    res.status(200).json({
      sucesso: true,
      mensagem: "Tarefa atualizada com sucesso!",
      dados: tarefaAtualizada
    });
  } catch (erro) {
    console.error("Erro ao atualizar tarefa:", erro);
    res.status(500).json({
      sucesso: false,
      erro: "Erro ao atualizar tarefa",
      detalhes: erro.message
    });
  }
}

/**
 * Remove uma tarefa pelo id
 * @route DELETE /tarefas/:id
 */
export async function deletarTarefa(req, res) {
  try {
    // Converte o id da URL para número
    const idNumero = Number(req.params.id);

    // Valida o id
    if (Number.isNaN(idNumero)) {
      return res.status(400).json({
        sucesso: false,
        erro: "ID inválido"
      });
    }

    // Tenta excluir a tarefa através do Model
    const tarefaRemovida = await TarefaModel.deletarTarefa(idNumero);

    // Se não encontrar, retorna erro 404
    if (!tarefaRemovida) {
      return res.status(404).json({
        sucesso: false,
        erro: "Tarefa não encontrada"
      });
    }

    // Retorna a tarefa que foi removida
    res.status(200).json({
      sucesso: true,
      mensagem: "Tarefa excluída com sucesso!",
      dados: tarefaRemovida
    });
  } catch (erro) {
    console.error("Erro ao deletar tarefa:", erro);
    res.status(500).json({
      sucesso: false,
      erro: "Erro ao deletar tarefa",
      detalhes: erro.message
    });
  }
}
