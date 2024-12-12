
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";


export const getJumiaProductsCategoryAction = createAsyncThunk("jumiaProducts/getJumiaProducts", async () => {
    const response = await Api.getJumiaProductsCategory();
    return response.data;
})