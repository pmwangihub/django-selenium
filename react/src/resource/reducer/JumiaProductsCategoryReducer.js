
import { createSlice } from "@reduxjs/toolkit";
import { getJumiaProductsCategoryAction } from "../actions/JumiaProductsCategoryAction";


const initialState = {
    jPCategoryLoader: false,
    jPCategoryError: null,
    jPCategoryData: null
}

export const JumiaProductsCategoryReducer = createSlice({
    name: "jumiaProductsCategory",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getJumiaProductsCategoryAction.pending, (state) => {
            state.jPCategoryLoader = true
            state.jPCategoryError = null
            state.jPCategoryData = null
        }).addCase(getJumiaProductsCategoryAction.fulfilled, (state, action) => {
            state.jPCategoryLoader = false
            state.jPCategoryError = null
            state.jPCategoryData = action.payload
        }).addCase(getJumiaProductsCategoryAction.rejected, (state, action) => {
            state.jPCategoryLoader = false
            state.jPCategoryError = action.error.message
            state.jPCategoryData = null
        })
    }
})


// export const {} = JumiaProductsCategoryReducer.actions;
export default JumiaProductsCategoryReducer.reducer;