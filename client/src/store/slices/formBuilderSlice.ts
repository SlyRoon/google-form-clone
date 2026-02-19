import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface QuestionDraft {
  id: string;
  type: string;
  label: string;
  options?: string[];
}

export interface FormBuilderState {
  title: string;
  description: string;
  questions: QuestionDraft[];
}

const initialState: FormBuilderState = {
  title: "",
  description: "",
  questions: [],
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },

    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },

    addQuestion(state, action: PayloadAction<{ type: string; label: string }>) {
      const isChoice =
        action.payload.type === "MULTIPLE_CHOICE" ||
        action.payload.type === "CHECKBOX";
      const newQuestion: QuestionDraft = {
        id: Date.now().toString(),
        type: action.payload.type,
        label: action.payload.label,
        options: isChoice ? ["Варіант 1"] : [],
      };
      state.questions.push(newQuestion);
    },

    removeQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },

    updateQuestionLabel(
      state,
      action: PayloadAction<{ id: string; label: string }>,
    ) {
      const question = state.questions.find((q) => q.id === action.payload.id);
      if (question) {
        question.label = action.payload.label;
      }
    },

    changeQuestionType(
      state,
      action: PayloadAction<{ id: string; type: string }>,
    ) {
      const question = state.questions.find((q) => q.id === action.payload.id);
      if (question) {
        question.type = action.payload.type;
        const isChoice =
          action.payload.type === "MULTIPLE_CHOICE" ||
          action.payload.type === "CHECKBOX";

        if (isChoice && (!question.options || question.options.length === 0)) {
          question.options = ["Варіант 1"];
        } else if (!isChoice) {
          question.options = [];
        }
      }
    },

    addOption(state, action: PayloadAction<string>) {
      const question = state.questions.find((q) => q.id === action.payload);
      if (question) {
        if (!question.options) question.options = [];
        question.options.push(`Варіант ${question.options.length + 1}`);
      }
    },

    updateOptionLabel(
      state,
      action: PayloadAction<{
        questionId: string;
        optionIndex: number;
        label: string;
      }>,
    ) {
      const question = state.questions.find(
        (q) => q.id === action.payload.questionId,
      );
      if (question && question.options) {
        question.options[action.payload.optionIndex] = action.payload.label;
      }
    },

    removeOption(
      state,
      action: PayloadAction<{ questionId: string; optionIndex: number }>,
    ) {
      const question = state.questions.find(
        (q) => q.id === action.payload.questionId,
      );
      if (question && question.options) {
        question.options.splice(action.payload.optionIndex, 1);
      }
    },

    resetBuilder: () => initialState,
  },
});

export const {
  setTitle,
  setDescription,
  addQuestion,
  removeQuestion,
  updateQuestionLabel,
  changeQuestionType,
  addOption,
  updateOptionLabel,
  removeOption,
  resetBuilder,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
