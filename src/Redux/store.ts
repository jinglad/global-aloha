import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import thunk from "redux-thunk";
import librarySlice from "./librarySlice";

const combinedReducer = combineReducers({
    user: userSlice,
    library: librarySlice
});

const reducer = (state: any, action: any) => {
    // TODO: add condition for HYDRATE
    return combinedReducer(state, action);
};

const makeStore = ({ isServer }: any) => {
    if (isServer) {
        //If it's on server side, create a store
        return configureStore({reducer, middleware:[thunk]});
    } else {
        //If it's on client side, create a store which will persist
        const { persistStore, persistReducer, autoRehydrate } = require("redux-persist");
        const storage = require("redux-persist/lib/storage").default;


        const persistConfig = {
            key: "global-aloha",
            storage
        };

        const persistedReducer = persistReducer(persistConfig, reducer); 

        const store: any = configureStore({
          reducer:persistedReducer,
          middleware:[thunk]
        }); 

        store.__persistor = persistStore(store); 

        return store;
    }
};

export const wrapper = createWrapper(makeStore);