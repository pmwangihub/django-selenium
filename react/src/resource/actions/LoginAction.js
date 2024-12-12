
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";


export const authLoginAction = createAsyncThunk("auth/login", async (object) => {
	const { email, password } = object;
	const response = await Api.login(email, password);
	return response.data;
})