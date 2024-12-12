
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";


export const getCeleryTask = createAsyncThunk("celeryTask/getCeleryTask", async () => {
    const response = await Api.getCeleryTask();
    return response.data;
})