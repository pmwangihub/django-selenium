import axios from "axios";
import Cookies from "universal-cookie";

const securedHeaders = {
	"Content-Security-Policy": "default-src 'self'; script-src 'self' https://apis.google.com",
	"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "no-referrer-when-downgrade",
	"Permissions-Policy": "geolocation=(self)",
};

let http = function (c_type = "application/json") {
	let cookies = new Cookies();
	let XCSRFToken = cookies.get("csrftoken");

	let headers = {
		"Content-type": c_type,
		"Accept": c_type,
		"X-CSRFToken": XCSRFToken,
		...securedHeaders,
	};

	return axios.create({
		baseURL: localStorage.getItem("host"),
		headers: headers,
		withCredentials: true,
	});
};

export const checkAuthentication = function () {
	return http().get("auth/check-auth/");

};

const logout = function () {
	return http().get("auth/logout/");
};

const deleteAccount = function (object) {
	return http().post("auth/delete-account/", object);
};

const login = function (email, password) {
	return http().post("auth/login/", {
		email,
		password,
	});
};

const register = function (object) {
	return http().post("auth/register/", object);
};

const contactMe = function (object) {
	return http().post("jumia/contact-me/", object);
};

/**
 * @summary get specific product existence
 * @param {*} object 
 * @returns 
 */
const getProfileProduct = function (object) {
	return http().post("jumia/user-product/", object);
};

/**
 * @summary Get all products
 * @param {*} object 
 * @returns 
 */
const getProfileProducts = function () {
	return http().get("jumia/user-products/");
};

const subscribeProfileProducts = function (object) {
	return http().post("jumia/product-subscribe/", object);
};


const getCeleryTask = function () {
	return http().get("jumia/task_result/")
};


const getJumiaProducts = function () {
	return http().get("home/jumia-products/")
};

const getProductEvents = function (slug) {
	return http().get(`jumia/product_events/${slug}`)
};


const getJumiaProductsCategory = function () {
	return http().get(`jumia/category/`)
};

const getCategoryProducts = function (slug) {
	return http().get(`jumia/category_products/${slug}/`)
};

const jumiaScrape = function (data) {
	return http().post(`jumia/jumia-scrape/`, data)
};



export const Api = {
	login,
	logout,
	register,
	checkAuthentication,
	deleteAccount,
	jumiaScrape,
	subscribeProfileProducts,
	contactMe,
	getJumiaProducts,
	getJumiaProductsCategory,
	getCeleryTask,
	getProductEvents,
	getCategoryProducts,
	getProfileProducts,
	getProfileProduct,
};

