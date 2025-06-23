import { createSlice } from "@reduxjs/toolkit";

export const mySlice = createSlice({
    name: 'clickCount',
    initialState:
    {
        clicks: 0,
        globalTime:0
    },
    reducers:
    {
        saveClickCount: (state, action) => 
        {
            state.clicks = action.payload
        },
        saveGlobalTime: (state, action) => 
        {
            state.globalTime = action.payload
        },
        resetGameState: (state) => 
        {
            state.clicks = 0;
            state.globalTime = 0;
        }
    },
})

export const { saveClickCount, saveGlobalTime, resetGameState } = mySlice.actions;

export default mySlice.reducer