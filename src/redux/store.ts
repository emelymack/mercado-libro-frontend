/* import { configureStore} from "@reduxjs/toolkit";
import productReducer from './productSlice'

const store = configureStore({
   reducer: {
      product: productReducer
   },
});

// Tipamos el hook useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store; */