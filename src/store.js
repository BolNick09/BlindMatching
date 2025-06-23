import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./slice";

export default configureStore
({
    reducer: 
    {
        reduceSaver: mySlice
    }
})