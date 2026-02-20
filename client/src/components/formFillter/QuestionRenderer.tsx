import React from 'react';


export interface FormQuestionItem {
  id: string;
  title: string;
  type: string;
  options?: string[] | null;
}

interface QuestionRendererProps {
  question: FormQuestionItem;
  currentAnswer?: string | string[]; 
  onChange: (value: string) => void;
  onCheckboxChange: (value: string, isChecked: boolean) => void;
}

export default function QuestionRenderer({ 
  question, 
  currentAnswer, 
  onChange, 
  onCheckboxChange 
}: QuestionRendererProps) {
  

  const stringAnswer = typeof currentAnswer === 'string' ? currentAnswer : '';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{question.title}</h3>

      <div className="space-y-3">

        {question.type === 'TEXT' && (
          <textarea
            className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-indigo-500 outline-none transition-colors resize-none min-h-[100px]"
            placeholder="Ваша відповідь..."
            value={stringAnswer}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            required
          />
        )}


        {question.type === 'DATE' && (
          <input
            type="date"
            className="w-full md:w-64 p-3 border-2 border-slate-100 rounded-xl focus:border-indigo-500 outline-none transition-colors cursor-pointer"
            value={stringAnswer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            required
          />
        )}


        {question.type === 'MULTIPLE_CHOICE' && (
          <div className="flex flex-col gap-3">
            {question.options?.map((opt: string, idx: number) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opt}
                  checked={stringAnswer === opt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                  className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  required
                />
                <span className="text-slate-700 group-hover:text-indigo-600 transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        )}


        {question.type === 'CHECKBOX' && (
          <div className="flex flex-col gap-3">
            {question.options?.map((opt: string, idx: number) => {

              const isChecked = Array.isArray(currentAnswer) && currentAnswer.includes(opt);
              return (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckboxChange(opt, e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-slate-700 group-hover:text-indigo-600 transition-colors">{opt}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}