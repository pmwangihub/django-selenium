
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";


export const LogoutAction = createAsyncThunk("auth/logout", async () => {
	const response = await Api.logout();
	return response.data;
})