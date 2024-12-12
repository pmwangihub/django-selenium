
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";


export const authRegisterAction = createAsyncThunk("auth/register", async function(object){
	const response = await Api.register(object);
	return response.data;
});