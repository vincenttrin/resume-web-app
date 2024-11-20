import { configureStore } from '@reduxjs/toolkit';
import gridGameSlice from '../pages/gridGame/gridGameSlice';
import morseSlice from '../pages/morse/morseSlice';



export const store = configureStore({
  reducer: {
    [gridGameSlice.name]: gridGameSlice.reducer,
    [morseSlice.name]: morseSlice.reducer,
  },
});
