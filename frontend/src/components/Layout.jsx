import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-white text-slate-950 shadow-lg shadow-cyan-500/20"
      : "text-slate-300 hover:bg-white/10 hover:text-white"
  ].join(" ");

export default function Layout() {
  return (
    <div className="min-h-screen text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
              AV1 DSW
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Sistema de Tarefas
            </h1>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              Tarefas
            </NavLink>
            <NavLink to="/sobre" className={linkClass}>
              Sobre
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}