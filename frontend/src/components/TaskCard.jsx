function formatDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export default function TaskCard({ tarefa, onToggle, onDelete, busy }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-cyan-400/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                tarefa.concluida
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "bg-cyan-400/15 text-cyan-300"
              }`}
            >
              {tarefa.concluida ? "Concluída" : "Pendente"}
            </span>
            <span className="text-xs text-slate-400">#{tarefa.id}</span>
          </div>

          <h3 className={`text-lg font-semibold ${tarefa.concluida ? "text-slate-400 line-through" : "text-white"}`}>
            {tarefa.descricao}
          </h3>

          <p className="text-sm text-slate-400">
            Criada em {formatDate(tarefa.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onToggle(tarefa)}
            disabled={busy}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {tarefa.concluida ? "Reabrir" : "Concluir"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(tarefa.id)}
            disabled={busy}
            className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}