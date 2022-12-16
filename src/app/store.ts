import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import moviesReducer from '../features/movies/movieSlide';
import drawerReducer from '../features/drawer/drawer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movies: moviesReducer,
    drawer: drawerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
