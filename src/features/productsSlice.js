import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    // Other initial state properties
  },
  reducers: {
    // Define reducers here
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    // More reducers can be added here
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
