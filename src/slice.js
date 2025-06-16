import { createSlice } from "@reduxjs/toolkit";

export const mySlice = createSlice({
    name: 'clickCount',
    initialState:
    {
        value: 0
    },
    reducers:
    {
        saveClickCount: (state, action) => 
        {
            state.value = action.payload
        },
    },
})

export const { saveClickCount } = mySlice.actions

export default mySlice.reducer