import { configureStore } from '@reduxjs/toolkit';
import gridGameSlice from './features/gridGame/gridGameSlice';
import morseSlice from './features/morse/morseSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [gridGameSlice.name]: gridGameSlice.reducer,
      [morseSlice.name]: morseSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
