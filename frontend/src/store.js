import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        auth: authReducer,
        user: userReducer,
    },
});

export default store;
