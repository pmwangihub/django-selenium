import { configureStore } from "@reduxjs/toolkit";
import AuthLoginReducer from "./reducer/LoginReducer";
import JumiaProductsReducer from "./reducer/JumiaProductsReducer";
import JumiaProductsCategoryReducer from "./reducer/JumiaProductsCategoryReducer";
import CeleryTaskReducer from "./reducer/CeleryTaskReducer";

export const store = configureStore({
	reducer: {
		AuthLoginReducer,
		jumiaProducts: JumiaProductsReducer,
		jumiaProductsCategory: JumiaProductsCategoryReducer,
		celeryTask: CeleryTaskReducer,
	},
	devTools: false,
})
