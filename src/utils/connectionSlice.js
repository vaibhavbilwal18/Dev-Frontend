import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
    name: 'connection',
    initialState: [], 
    reducers: {
        addConnections: (state, action) => {
            return Array.isArray(action.payload) ? action.payload : [];
        },
        removeConnection: (state) => {
            return []; 
        },
    }
});

export const { addConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;