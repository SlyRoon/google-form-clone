
import { useFormFiller } from '../hooks/useFormFiller';
import QuestionRenderer, { type FormQuestionItem } from '../components/formFillter/QuestionRenderer';

export const FormFillerPage = () => {
  const { 
    form, isFetching, error, isSubmitting, 
    answers, handleAnswerChange, handleCheckboxChange, handleSubmit 
  } = useFormFiller();

  if (isFetching) {
    return <div className="text-center py-20 text-slate-500 font-bold text-xl">Завантаження форми...</div>;
  }
  
  if (error || !form) {
    return <div className="text-center py-20 text-red-500 font-bold text-xl">Форму не знайдено або сталася помилка.</div>;
  }

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border-t-8 border-t-indigo-600 mb-8 border border-slate-200">
          <h1 className="text-4xl font-black text-slate-900 mb-3">{form.title}</h1>
          {form.description && <p className="text-slate-500 text-lg">{form.description}</p>}
        </div>

        <form onSubmit={handleSubmit}>

          {form.questions?.map((q: FormQuestionItem) => ( 
            <QuestionRenderer
              key={q.id}
              question={q}
              currentAnswer={answers[q.id]}
              onChange={(value: string) => handleAnswerChange(q.id, value)}
              onCheckboxChange={(value: string, isChecked: boolean) => handleCheckboxChange(q.id, value, isChecked)}
            />
          ))}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-indigo-300 shadow-lg shadow-indigo-100 transition-all active:scale-95 text-lg"
            >
              {isSubmitting ? 'Відправка...' : 'Надіслати відповіді'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};