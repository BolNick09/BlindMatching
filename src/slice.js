import { createSlice } from "@reduxjs/toolkit";

export const mySlice = createSlice({
    name: 'clickCount',
    initialState:
    {
        clicks: 0,
        globalTime:0,
        gameField: [],
        isGameActive: false,
        playerName: ''
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

        saveGameField: (state, action) => 
        {
            if (Array.isArray(action.payload?.cards)) 
            {
                state.gameField = action.payload.cards;
                state.isGameActive = true;
            }
        },
        savePlayerName: (state, action) => 
        { 
            state.playerName = action.payload;
        },
        resetGameState: (state) => 
        {
            state.clicks = 0;
            state.globalTime = 0;
            state.gameField = null;
            state.isGameActive = false;
        }
    },
})

export const 
{ 
  saveClickCount, 
  saveGlobalTime, 
  saveGameField, 
  resetGameState,
  savePlayerName
} = mySlice.actions;

export default mySlice.reducer