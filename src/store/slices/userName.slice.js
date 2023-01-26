import { createSlice } from '@reduxjs/toolkit';

export const userNameSlice = createSlice({
		name: 'userName',
    initialState: '',
    reducers: {
      auth: (state, action) => {
        const user = action.payload
        return user
      }
    }
})

export const { auth } = userNameSlice.actions;

export default userNameSlice.reducer;