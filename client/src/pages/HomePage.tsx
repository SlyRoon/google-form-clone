import React from 'react';
import { Link } from 'react-router-dom';
import { useGetFormsQuery } from '../store/generated/graphql';
import type { FormSummary } from '../types/types'; 

export const HomePage = () => {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) {
    return <div className="text-center py-20 text-slate-500 font-bold text-xl">Завантаження форм...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-bold text-xl">Помилка завантаження. Перевір підключення до сервера.</div>;
  }

  const forms: FormSummary[] = data?.forms || [];

  return (
    <div className="py-8 px-4 sm:px-6"> 
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Мої форми</h1>
            <p className="text-slate-500 mt-1">Керуйте своїми опитуваннями та переглядайте результати</p>
          </div>
          <Link 
            to="/forms/new" 
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 whitespace-nowrap"
          >
            + Створити нову форму
          </Link>
        </div>

        {forms.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center shadow-sm">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">У вас ще немає форм</h2>
            <p className="text-slate-500 mb-6">Створіть свою першу форму, щоб почати збирати відповіді.</p>
            <Link to="/forms/new" className="text-indigo-600 font-bold hover:underline">Створити форму зараз →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div key={form.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-full">
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">{form.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6">
                    {form.description || 'Опис відсутній...'}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 mt-auto">
                  <Link 
                    to={`/forms/${form.id}/fill`}
                    className="w-full text-center px-4 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Заповнити форму
                  </Link>
                  <Link 
                    to={`/forms/${form.id}/response`}
                    className="w-full text-center px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Переглянути відповіді
                  </Link>
                </div>
                
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};