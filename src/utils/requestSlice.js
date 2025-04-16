import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name: 'requests',
    initialState: [],
    reducers: {
        addRequests: (state, action) => {
            // Log to debug the incoming payload
            console.log("Adding requests to store:", action.payload);
            return Array.isArray(action.payload) ? action.payload : [];
        },
        removeRequest: (state, action) => {
            // Log to debug the removal operation
            console.log("Removing request with ID:", action.payload);
            return state.filter(request => request._id !== action.payload);
        },
    }
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;