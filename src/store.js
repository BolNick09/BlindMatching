import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./slice";

export default configureStore
({
    reducer: 
    {
        save_click_count: mySlice
    }
})