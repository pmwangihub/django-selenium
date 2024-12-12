
import { createSlice } from "@reduxjs/toolkit";
import { getJumiaProducts } from "../actions/JumiaProductsAction";


const initialState = {
    productsLoader: false,
    productsError: null,
    productsData: null
}

export const JumiaProductsReducer = createSlice({
    name: "jumiaProducts",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getJumiaProducts.pending, (state) => {
            state.productsLoader = true
            state.productsError = null
            state.productsData = null
        }).addCase(getJumiaProducts.fulfilled, (state, action) => {
            state.productsLoader = false
            state.productsError = null
            state.productsData = action.payload
        }).addCase(getJumiaProducts.rejected, (state, action) => {
            state.productsLoader = false
            state.productsError = action.error.message
            state.productsData = null
        })
    }
})


// export const {} = JumiaProductsReducer.actions;
export default JumiaProductsReducer.reducer;