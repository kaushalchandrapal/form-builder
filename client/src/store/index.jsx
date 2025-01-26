import { configureStore } from '@reduxjs/toolkit';

import formBuilderReducer from './slices/form-builder';

const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
  },
});

export default store;