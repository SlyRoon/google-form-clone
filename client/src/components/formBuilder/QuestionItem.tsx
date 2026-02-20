import React from 'react';
import type { QuestionDraft } from '../../store/slices/formBuilderSlice';

interface QuestionItemProps {
  question: QuestionDraft;
  onUpdateLabel: (id: string, label: string) => void;
  onChangeType: (id: string, type: string) => void;
  onAddOption: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateOption: (questionId: string, optionIndex: number, label: string) => void;
  onToggleCorrect: (questionId: string, optionValue: string) => void;
}

export default function QuestionItem({ 
  question, onUpdateLabel, onChangeType, onAddOption, onRemove, onUpdateOption, onToggleCorrect 
}: QuestionItemProps) {
  
  const isChoice = question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX';
  const hasCorrectDate = question.type === 'DATE' && question.correctAnswers && question.correctAnswers.length > 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 relative">
      <button 
        type="button"
        onClick={() => onRemove(question.id)}
        className="absolute right-4 top-4 text-slate-300 hover:text-red-500 transition-colors p-1"
      >
        ✕
      </button>

      <div className="flex flex-col md:flex-row gap-4 mb-6 pr-8">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-tight">Текст запитання</label>
          <input
            type="text"
            value={question.label || ''}
            onChange={(e) => onUpdateLabel(question.id, e.target.value)}
            className="w-full text-lg font-semibold border-b-2 border-slate-100 py-2 focus:border-indigo-500 outline-none transition-colors bg-transparent"
          />
        </div>

        <div className="flex items-end">
          <select 
            value={question.type}
            onChange={(e) => onChangeType(question.id, e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 font-bold cursor-pointer"
          >
            <option value="TEXT">📝 Текстове поле</option>
            <option value="MULTIPLE_CHOICE">🔘 Один вибір</option>
            <option value="CHECKBOX">✅ Кілька виборів</option>
            <option value="DATE">📅 Дата</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">

        {question.type === 'DATE' && (
          <div className="space-y-3 pl-2 border-l-4 border-indigo-400 bg-indigo-50/50 p-4 rounded-r-xl">
            <label className="block text-xs font-bold text-indigo-500 uppercase tracking-tighter">
              Встановіть правильну дату для тесту:
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="date" 

                value={question.correctAnswers?.[0] || ''}
                onChange={(e) => onToggleCorrect(question.id, e.target.value)}
                className={`p-3 border-2 rounded-xl outline-none transition-all font-bold ${
                  hasCorrectDate ? 'border-green-500 bg-white text-green-700' : 'border-slate-200 bg-white'
                }`}
              />
              {hasCorrectDate && (
                <span className="text-green-600 font-black text-sm animate-pulse">✓ ПРАВИЛЬНА ВІДПОВІДЬ ЗБЕРЕЖЕНА</span>
              )}
            </div>
          </div>
        )}

        {isChoice && (
          <div className="space-y-3 pl-2 border-l-4 border-slate-100">
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-tighter">Варіанти відповідей:</label>
            {question.options?.map((opt, idx) => {
              const isCorrect = question.correctAnswers?.includes(opt);
              return (
                <div key={idx} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleCorrect(question.id, opt)}
                    className={`w-7 h-7 flex items-center justify-center rounded-md border-2 transition-all ${
                      isCorrect ? 'border-green-500 bg-green-500 text-white' : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    ✓
                  </button>
                  <input 
                    type="text"
                    value={opt}
                    onChange={(e) => onUpdateOption(question.id, idx, e.target.value)}
                    className={`flex-1 text-sm border-b py-1 outline-none bg-transparent ${
                      isCorrect ? 'border-green-300 font-bold text-green-800' : 'border-transparent focus:border-indigo-300'
                    }`}
                  />
                </div>
              );
            })}
            <button 
              type="button"
              onClick={() => onAddOption(question.id)}
              className="mt-2 text-indigo-600 text-xs font-black hover:bg-indigo-50 py-2 px-3 rounded-lg"
            >
              + ДОДАТИ ВАРІАНТ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}