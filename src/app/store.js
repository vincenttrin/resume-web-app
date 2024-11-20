import { configureStore } from '@reduxjs/toolkit';
import gridGameSlice from '../pages/gridGame/gridGameSlice';



export const store = configureStore({
  reducer: {
    [gridGameSlice.name]: gridGameSlice.reducer,
  },
});
