
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";


export const getJumiaProducts = createAsyncThunk("jumiaProducts/getJumiaProducts", async () => {
    const response = await Api.getJumiaProducts();
    return response.data;
})