
import { createSlice } from "@reduxjs/toolkit";
import { getCeleryTask } from "../actions/CeleryTaskAction";


const initialState = {
    cTaskLoader: false,
    cTaskError: null,
    cTaskData: null
}

export const CeleryTaskReducer = createSlice({
    name: "celeryTask",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getCeleryTask.pending, (state) => {
            state.cTaskLoader = true
            state.cTaskError = null
            state.cTaskData = null
        }).addCase(getCeleryTask.fulfilled, (state, action) => {
            state.cTaskLoader = false
            state.cTaskError = null
            state.cTaskData = action.payload
        }).addCase(getCeleryTask.rejected, (state, action) => {
            state.cTaskLoader = false
            state.cTaskError = action.error.message
            state.cTaskData = null
        })
    }
})


// export const {} = CeleryTaskReducer.actions;
export default CeleryTaskReducer.reducer;