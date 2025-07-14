import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSubCategory: [],
  allCategory: [],  
  allProduct: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setAllSubCategory: (state, action) => {
      state.allSubCategory = action.payload;

    },
    setAllProduct :(state,action)=>{
      state.allProduct= action.payload
    }

    // Add more reducers as needed
  },
});

export const { setAllCategory, setAllSubCategory } = productSlice.actions;
export default productSlice.reducer;