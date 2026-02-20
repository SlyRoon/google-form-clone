
import { useParams, Link } from 'react-router-dom';
import { useGetFormQuery, useGetResponsesQuery } from '../store/generated/graphql';

import type { AnswerData, ResponseData, QuestionData } from '../types/types'; 

export const FormResponsePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: formData, isLoading: isFormLoading } = useGetFormQuery({ id: id! }, { skip: !id });
  const { data: responsesData, isLoading: isResponsesLoading } = useGetResponsesQuery({ formId: id! }, { skip: !id });

  if (isFormLoading || isResponsesLoading) {
    return <div className="text-center py-20 text-slate-500 font-bold text-xl">Завантаження відповідей...</div>;
  }

  const form = formData?.form;
  const responses: ResponseData[] = (responsesData?.responses as ResponseData[]) || [];

  if (!form) {
    return <div className="text-center py-20 text-slate-500 font-bold text-xl">Форму не знайдено.</div>;
  }

  const checkIsCorrect = (userAns: string[], correctAns: string[]): boolean => {
    if (userAns.length !== correctAns.length) return false;
    const sortedUser = [...userAns].sort();
    const sortedCorrect = [...correctAns].sort();
    return sortedUser.every((val, index) => val === sortedCorrect[index]);
  };

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Відповіді (Звіт)</h1>
            <p className="text-slate-500 mt-1">Форма: <span className="font-bold">{form.title}</span></p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg flex items-center">
              Всього відповідей: {responses.length}
            </div>
            <Link to="/" className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors">
              Назад
            </Link>
          </div>
        </div>

        {responses.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center shadow-sm">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-xl font-bold text-slate-700">Поки що немає жодної відповіді</h2>
            <p className="text-slate-500 mt-2">Поділіться посиланням на форму, щоб почати збирати дані.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {responses.map((response, index) => {
              let score = 0;
              let maxScore = 0;

              return (
                <div key={response.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <div className="border-b border-slate-100 pb-4 mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Учасник #{index + 1}</h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ID: {response.id.slice(0, 8)}...</span>
                  </div>
                  
                  <div className="space-y-4">
                    {form.questions?.map((question: QuestionData) => {
                      const answer = response.answers.find((a: AnswerData) => a.questionId === question.id);
                      const userValues = answer?.value || [];
                      const correctValues = question.correctAnswers || [];
                      
                      const isQuizQuestion = correctValues.length > 0;
                      let isCorrect = false;

                      if (isQuizQuestion) {
                        maxScore += 1;
                        isCorrect = checkIsCorrect(userValues, correctValues);
                        if (isCorrect) score += 1;
                      }

                      let blockStyles = "bg-slate-50 border-slate-100";
                      let icon = null;

                      if (isQuizQuestion) {
                        if (isCorrect) {
                          blockStyles = "bg-green-50 border-green-200";
                          icon = <span className="text-green-600 font-bold">✅ Правильно</span>;
                        } else {
                          blockStyles = "bg-red-50 border-red-200";
                          icon = <span className="text-red-600 font-bold">❌ Неправильно</span>;
                        }
                      }

                      return (
                        <div key={question.id} className={`p-4 rounded-xl border ${blockStyles} transition-colors`}>
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-bold text-slate-700">{question.title}</p>
                            {icon && <div className="text-sm">{icon}</div>}
                          </div>

                          <div className="text-slate-700">
                            <div className="mb-2">
                              <span className="text-xs font-bold text-slate-400 uppercase">Відповідь: </span>
                              {userValues.length > 0 ? (
                                <span className="font-medium">{userValues.join(', ')}</span>
                              ) : (
                                <span className="text-slate-400 italic">Немає відповіді</span>
                              )}
                            </div>

                            {isQuizQuestion && !isCorrect && (
                              <div className="mt-2 pt-2 border-t border-red-100 text-sm">
                                <span className="text-xs font-bold text-red-400 uppercase">Правильна відповідь: </span>
                                <span className="text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded">
                                  {correctValues.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {maxScore > 0 && (
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                      <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-black text-lg">
                        Результат: {score} / {maxScore}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};