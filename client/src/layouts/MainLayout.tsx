import { Outlet, Link } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black text-indigo-600 tracking-tighter hover:opacity-80 transition-opacity"
          >
            FORMS<span className="text-slate-400">LITE</span>
          </Link>
          <Link
            to="/forms/new"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            + Create Form
          </Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto py-10 px-6">
        <Outlet />
      </main>
    </div>
  );
};
