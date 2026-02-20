import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { useCreateFormMutation } from '../store/generated/graphql';
import { 
  setTitle, setDescription, addQuestion, removeQuestion, 
  updateQuestionLabel, changeQuestionType, addOption, updateOptionLabel,
  toggleCorrectAnswer 
} from '../store/slices/formBuilderSlice';

export const useFormBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, description, questions } = useSelector((state: RootState) => state.formBuilder);
  const [createForm, { isLoading }] = useCreateFormMutation();

  const handleUpdateTitle = (val: string) => dispatch(setTitle(val));
  const handleUpdateDescription = (val: string) => dispatch(setDescription(val));
  const handleAddQuestion = (type: string = 'TEXT') => dispatch(addQuestion({ type, label: '' }));
  const handleUpdateQuestion = (id: string, label: string) => dispatch(updateQuestionLabel({ id, label }));
  const handleChangeQuestionType = (id: string, type: string) => dispatch(changeQuestionType({ id, type }));
  const handleAddOption = (id: string) => dispatch(addOption(id));
  const handleRemoveQuestion = (id: string) => dispatch(removeQuestion(id));
  const handleUpdateOption = (questionId: string, optionIndex: number, label: string) => 
    dispatch(updateOptionLabel({ questionId, optionIndex, label }));

  const handleToggleCorrect = (questionId: string, optionValue: string) => 
    dispatch(toggleCorrectAnswer({ questionId, optionValue }));

  const saveForm = async () => {
    if (!title.trim()) return alert('Назва форми обовʼязкова!');
    
    const payload = {
      title,
      description: description || "",
      questions: questions.map(q => ({
        title: q.label || "Питання без назви",
        type: q.type,
        options: q.options || [],
        correctAnswers: q.correctAnswers || [] 
      }))
    };

    try {
      await createForm(payload).unwrap();
      alert('Форму успішно створено!');
      navigate('/'); 
    } catch (error: unknown) { 
      console.error(error); 
      alert('Сталася помилка при збереженні');
    }
  };

  return {
    title, description, questions, isLoading,
    handleUpdateTitle, handleUpdateDescription, handleAddQuestion,
    handleUpdateQuestion, handleChangeQuestionType, handleAddOption,
    handleRemoveQuestion, handleUpdateOption, 
    handleToggleCorrect,
    saveForm
  };
};