export default function TaskForm({ value, onChange, onSubmit, loading }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur"
    >
      <label className="mb-3 block text-sm font-medium text-slate-200">
        Nova tarefa
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex.: Estudar para a prova"
          className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Salvando..." : "Adicionar"}
        </button>
      </div>
    </form>
  );
}