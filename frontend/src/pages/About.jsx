export default function About() {
  return (
    <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
          Estrutura da solução
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Frontend em React com integração REST</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          <h3 className="text-lg font-semibold text-white">Interface</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            SPA com páginas simples, componentes reutilizáveis e navegação básica via React Router.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          <h3 className="text-lg font-semibold text-white">Consumo da API</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            O front chama a API de tarefas via fetch e trata loading, erro, criação, atualização e exclusão.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          <h3 className="text-lg font-semibold text-white">Banco de dados</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            O backend usa Prisma + MySQL para persistência das tarefas.
          </p>
        </article>
      </div>
    </section>
  );
}