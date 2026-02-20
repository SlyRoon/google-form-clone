import React from 'react';
import type { QuestionDraft } from '../../store/slices/formBuilderSlice';

interface QuestionItemProps {
  question: QuestionDraft;
  onUpdateLabel: (id: string, label: string) => void;
  onChangeType: (id: string, type: string) => void;
  onAddOption: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateOption: (questionId: string, optionIndex: number, label: string) => void;
  onToggleCorrect: (questionId: string, optionValue: string) => void; // <-- ДОДАЛИ
}

export default function QuestionItem({ 
  question, onUpdateLabel, onChangeType, onAddOption, onRemove, onUpdateOption, onToggleCorrect 
}: QuestionItemProps) {
  
  const isChoice = question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 relative">
      <button 
        type="button"
        onClick={() => onRemove(question.id)}
        className="absolute right-4 top-4 text-slate-300 hover:text-red-500 transition-colors p-1"
        title="Видалити питання"
      >
        ✕
      </button>

      <div className="flex flex-col md:flex-row gap-4 mb-6 pr-8">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-tight">Текст запитання</label>
          <input
            type="text"
            placeholder="Введіть ваше запитання..."
            value={question.label || ''}
            onChange={(e) => onUpdateLabel(question.id, e.target.value)}
            className="w-full text-lg font-semibold border-b-2 border-slate-100 py-2 focus:border-indigo-500 outline-none transition-colors bg-transparent"
          />
        </div>

        <div className="flex items-end">
          <select 
            value={question.type}
            onChange={(e) => onChangeType(question.id, e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 font-bold cursor-pointer"
          >
            <option value="TEXT">📝 Текстове поле</option>
            <option value="MULTIPLE_CHOICE">🔘 Один вибір</option>
            <option value="CHECKBOX">✅ Кілька виборів</option>
            <option value="DATE">📅 Дата</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {question.type === 'TEXT' && (
          <div className="w-full p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-sm italic">
            Тут користувач зможе вписати свій текст... (Перевірка правильності тексту не підтримується)
          </div>
        )}

        {question.type === 'DATE' && (
          <div className="flex flex-col gap-2">
            <input 
              type="date" 
              disabled
              className="w-full md:w-64 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed"
            />
          </div>
        )}

        {isChoice && (
          <div className="space-y-3 pl-2 border-l-4 border-slate-100">
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-tighter">Варіанти відповідей (відмітьте правильні):</label>
            {question.options?.map((opt, idx) => {

              const isCorrect = question.correctAnswers?.includes(opt);

              return (
                <div key={idx} className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() => onToggleCorrect(question.id, opt)}
                    className={`w-7 h-7 flex items-center justify-center rounded-md border-2 transition-all ${
                      isCorrect 
                        ? 'border-green-500 bg-green-500 text-white shadow-sm' 
                        : 'border-slate-300 bg-slate-50 text-transparent hover:border-green-300'
                    }`}
                    title="Позначити як правильну"
                  >
                    ✓
                  </button>
                  
                  <input 
                    type="text"
                    value={opt}
                    placeholder={`Варіант ${idx + 1}`}
                    onChange={(e) => onUpdateOption(question.id, idx, e.target.value)}
                    className={`flex-1 text-sm border-b py-1 transition-all outline-none bg-transparent ${
                      isCorrect ? 'border-green-300 font-bold text-green-800' : 'border-transparent focus:border-indigo-300'
                    }`}
                  />
                </div>
              );
            })}
            <button 
              type="button"
              onClick={() => onAddOption(question.id)}
              className="mt-2 flex items-center gap-2 text-indigo-600 text-xs font-black hover:text-indigo-800 transition-colors py-2 px-3 rounded-lg hover:bg-indigo-50 active:scale-95"
            >
              + ДОДАТИ ВАРІАНТ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}