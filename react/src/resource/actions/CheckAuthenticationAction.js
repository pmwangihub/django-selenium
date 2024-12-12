
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";


export const checkAuthentication = createAsyncThunk("auth/checkAuthentication", async () => {
	const response = await Api.checkAuthentication();
	return response.data;
})