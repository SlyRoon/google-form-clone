import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetFormQuery} from '../store/generated/graphql';
import { useSubmitResponseMutation } from '../store/generated/graphql';

export type AnswerValue = string | string[];

export const useFormFiller = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading: isFetching, error } = useGetFormQuery(
    { id: id! },
    { skip: !id }
  );

  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();

  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (questionId: string, optionValue: string, isChecked: boolean) => {
    setAnswers((prev) => {

      const currentAnswer = prev[questionId];
      const currentArray: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
      
      if (isChecked) {
        return { ...prev, [questionId]: [...currentArray, optionValue] };
      } else {
        return { ...prev, [questionId]: currentArray.filter((v) => v !== optionValue) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value: Array.isArray(value) ? value : [String(value)], 
    }));

    try {
      await submitResponse({
        formId: id,
        answers: formattedAnswers,
      }).unwrap();

      alert('Форму успішно відправлено! Дякуємо');
      navigate('/');
    } catch (err) {
      console.error('Помилка відправки:', err);
      alert('Сталася помилка при відправці');
    }
  };

  return {
    form: data?.form,
    isFetching,
    error,
    isSubmitting,
    answers,
    handleAnswerChange,
    handleCheckboxChange,
    handleSubmit,
  };
};