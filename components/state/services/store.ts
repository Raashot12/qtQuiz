import {
  combineReducers,
  configureStore,
  PreloadedStateShapeFromReducersMapObject,
} from '@reduxjs/toolkit';
import { baseApi as api } from './baseApi';
import { rtkQueryErrorLogger } from './rtkQueryErrorLogger';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});
export const setupStore = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) =>
  configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware).concat(rtkQueryErrorLogger),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
