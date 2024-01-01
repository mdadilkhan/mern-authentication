import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'



const rootReducer=combineReducers({
  user:userReducer,
  // suppose we have many reducer u can add here using key value after the comma
})
const persistConfig = {
  key: 'root',
  version: 1,
  storage,

  // if u dont want som reducer to be in persistStore do blacklist or do white list or dont do whitelist simply write the reducer name
  // blacklist: ['user'], 
  // whitelist: ['user']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlware)=> getDefaultMiddlware({
    serializableCheck:false
  }),
})



export const persistor=persistStore(store)