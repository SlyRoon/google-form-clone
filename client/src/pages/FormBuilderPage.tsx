import FormHeader from "../components/formBuilder/FormHeader";
import QuestionList from "../components/formBuilder/QuestionList";
import { useFormBuilder } from "../hooks/useFormActions";

export const FormBuilderPage = () => {
  const { 
    title, description, questions, isLoading, 
    handleUpdateTitle, handleUpdateDescription, 
    handleAddQuestion, handleUpdateQuestion, 
    handleChangeQuestionType, handleAddOption,
    handleRemoveQuestion, handleUpdateOption, 
    handleToggleCorrect, 
    saveForm 
  } = useFormBuilder();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Конструктор</h1>
            <p className="text-slate-500">Створіть опитування за кілька кліків</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleAddQuestion('TEXT')}
              className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:shadow-md transition-all active:scale-95"
            >
              + Питання
            </button>
            <button 
              onClick={saveForm}
              disabled={isLoading}
              className="flex-1 md:flex-none px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-indigo-300 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              {isLoading ? 'Зберігаємо...' : 'Опублікувати'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <FormHeader 
            title={title} 
            description={description} 
            onTitleChange={handleUpdateTitle} 
            onDescriptionChange={handleUpdateDescription} 
          />

          <QuestionList 
            questions={questions} 
            onUpdateLabel={handleUpdateQuestion}
            onChangeType={handleChangeQuestionType} 
            onAddOption={handleAddOption}
            onRemove={handleRemoveQuestion} 
            onUpdateOption={handleUpdateOption} 
            onToggleCorrect={handleToggleCorrect} 
          />
        </div>

      </div>
    </div>
  );
};