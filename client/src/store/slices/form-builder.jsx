import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formElements: [],
  selectedElement: null,
  formId: null,
  formName: 'Untitled form'
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.formElements.push(action.payload);
    },
    updateElement: (state, action) => {
      const updatedElement = action.payload;
      const index = state.formElements.findIndex((el) => el.id === updatedElement.id);
      if (index !== -1) {
        state.formElements[index] = { ...state.formElements[index], ...updatedElement };

        if (state.selectedElement?.id === updatedElement.id) {
          state.selectedElement = { ...state.formElements[index] };
        }
      }
    },
    moveElement: (state, action) => {
      const { id, newPosition } = action.payload;
      const elementIndex = state.formElements.findIndex((el) => el.id === id);
      if (elementIndex !== -1) {
        const [removed] = state.formElements.splice(elementIndex, 1);
        state.formElements.splice(newPosition, 0, removed);
      }
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },
    setFormName: (state, action) => {
      state.formName = action.payload;
    },
    setFormId: (state, action) => {
      state.formId = action.payload;
    },

    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { addElement, updateElement, moveElement, setSelectedElement, setFormName, setFormId, resetForm } = formBuilderSlice.actions;
export default formBuilderSlice.reducer;
