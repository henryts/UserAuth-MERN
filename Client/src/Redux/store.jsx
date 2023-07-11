import { configureStore} from "@reduxjs/toolkit";
import authStore from "../Features/AuthSlice";
import adminAuthStore from '../Features/AdminAuthaslice'

const store = configureStore({
    reducer: {
        auth:authStore,
        adminAuth:adminAuthStore
    }
});
export default store;