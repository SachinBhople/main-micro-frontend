import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "order/cartApi";
import { orderApi } from "order/orderApi";
import { productsApi } from "product/productsApi";
import { authApi } from "auth/authApi";
import { userApi } from "admin/userApi";
import { adminApi } from "admin/adminApi";
import { productApi } from "admin/productApi";
import authSlice from "auth/authSlice";



const reduxStore = configureStore({
    reducer: {
        [cartApi.reducerPath]: cartApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        auth: authSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cartApi.middleware, orderApi.middleware, productsApi.middleware,
            authApi.middleware, userApi.middleware, adminApi.middleware, productApi.middleware
        ),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
