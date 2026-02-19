import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { useCreateFormMutation } from '../store/generated/graphql';
import { 
  setTitle, setDescription, addQuestion, removeQuestion, 
  updateQuestionLabel, changeQuestionType, addOption, updateOptionLabel 
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

  const saveForm = async () => {
    if (!title.trim()) return alert('Назва форми обовʼязкова!');
    try {
      await createForm({
        title, description,
        questions: questions.map(q => ({
          title: q.label || "Без назви",
          type: q.type,
          options: q.options || []
        }))
      }).unwrap();
      alert('Форму успішно створено!');
      navigate('/'); 
    } catch (error) { console.error(error); }
  };


  return {
    title, description, questions, isLoading,
    handleUpdateTitle, handleUpdateDescription, handleAddQuestion,
    handleUpdateQuestion, handleChangeQuestionType, handleAddOption,
    handleRemoveQuestion, handleUpdateOption, saveForm
  };
};