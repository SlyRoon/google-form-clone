import React from 'react';
import type { QuestionDraft } from '../../store/slices/formBuilderSlice';
import QuestionItem from './QuestionItem';

interface QuestionListProps {
  questions: QuestionDraft[];
  onUpdateLabel: (id: string, label: string) => void; 
  onChangeType: (id: string, type: string) => void;
  onAddOption: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateOption: (questionId: string, optionIndex: number, label: string) => void;
}

export default function QuestionList({ 
  questions, onUpdateLabel, onChangeType, onAddOption, onRemove, onUpdateOption 
}: QuestionListProps) {
  return (
    <div className="space-y-6 mt-8">
      {questions.map((q) => (
        <QuestionItem 
          key={q.id} 
          question={q} 
          onUpdateLabel={onUpdateLabel} 
          onChangeType={onChangeType}
          onAddOption={onAddOption}
          onRemove={onRemove}
          onUpdateOption={onUpdateOption}
        />
      ))}
    </div>
  );
}