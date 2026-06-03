import { useEffect, useMemo, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import { criarTarefa, excluirTarefa, listarTarefas, atualizarTarefa } from "../services/tarefaService.js";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");

  async function carregarTarefas() {
    setError("");
    setLoading(true);

    try {
      const resposta = await listarTarefas();
      setTarefas(resposta.dados ?? []);
    } catch (erro) {
      setError(erro.message || "Não foi possível carregar as tarefas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  const resumo = useMemo(
    () => ({
      total: tarefas.length,
      concluidas: tarefas.filter((tarefa) => tarefa.concluida).length
    }),
    [tarefas]
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const texto = descricao.trim();
    if (!texto) {
      setError("Digite uma descrição para criar a tarefa.");
      return;
    }

    setFormLoading(true);
    setError("");

    try {
      await criarTarefa(texto);
      setDescricao("");
      await carregarTarefas();
    } catch (erro) {
      setError(erro.message || "Não foi possível criar a tarefa");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleToggle(tarefa) {
    setActionLoadingId(tarefa.id);
    setError("");

    try {
      await atualizarTarefa(tarefa.id, {
        concluida: !tarefa.concluida
      });
      await carregarTarefas();
    } catch (erro) {
      setError(erro.message || "Não foi possível atualizar a tarefa");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleDelete(id) {
    setActionLoadingId(id);
    setError("");

    try {
      await excluirTarefa(id);
      await carregarTarefas();
    } catch (erro) {
      setError(erro.message || "Não foi possível excluir a tarefa");
    } finally {
      setActionLoadingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            Integração React + API + MySQL
          </p>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Cadastro e listagem de tarefas com backend Express e Prisma.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Esta interface consome a API REST do backend, mostra os dados em lista, permite criar novas tarefas, alternar o status de conclusão e excluir registros.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">React SPA</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Tailwind CSS</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Fetch API</span>
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/20">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Total de tarefas</p>
            <p className="mt-2 text-3xl font-semibold text-white">{resumo.total}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Concluídas</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-300">{resumo.concluidas}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Ações disponíveis</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Cadastrar, atualizar status e excluir tarefas com feedback visual de carregamento e erro.
            </p>
          </div>
        </div>
      </section>

      <TaskForm
        value={descricao}
        onChange={setDescricao}
        onSubmit={handleSubmit}
        loading={formLoading}
      />

      {error ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-white">Lista de tarefas</h3>
            <p className="text-sm text-slate-400">
              Dados carregados diretamente da API.
            </p>
          </div>

          <button
            type="button"
            onClick={carregarTarefas}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Recarregar
          </button>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
            Carregando tarefas...
          </div>
        ) : tarefas.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-300">
            Nenhuma tarefa cadastrada ainda.
          </div>
        ) : (
          <div className="grid gap-4">
            {tarefas.map((tarefa) => (
              <TaskCard
                key={tarefa.id}
                tarefa={tarefa}
                onToggle={handleToggle}
                onDelete={handleDelete}
                busy={actionLoadingId === tarefa.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}