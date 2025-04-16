import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
    name: 'connection',
    initialState: [], // Changed from null to empty array
    reducers: {
        addConnection: (state, action) => {
            // Ensure we're working with an array
            return Array.isArray(action.payload) ? action.payload : [];
        },
        removeConnection: (state) => {
            return []; // Changed from null to empty array
        },
    }
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;