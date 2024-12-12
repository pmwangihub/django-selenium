
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY


export const encryptData = (data) => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};


export const decryptData = (ciPherText) => {
	const bytes = CryptoJS.AES.decrypt(ciPherText, secretKey);
	const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
	return JSON.parse(decryptedData);
};



const objectUpdate = (currentObject, updatedObject) => {
	return {
		...currentObject, ...updatedObject
	}
}
const setItemLocalStorage = (items = []) => {
	const obj = Object.fromEntries(items);
	for (const [key, value] of Object.entries(obj)) {
		localStorage.setItem(key, value);
	}
}

const getItemLocalStorage = (items = []) => {
	const obj = {}
	if (items.length) {
		items.forEach(item => {
			obj[item] = localStorage.getItem(item)
		});
	}
	return obj
}
const removeItemLocalStorage = (items = []) => {
	if (items.length) {
		items.forEach(item => {
			localStorage.removeItem(item)
		});
	}
}

const FormatDate = (isoString) => {
	const date = new Date(isoString);
	const day = date.getUTCDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getUTCFullYear();
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes().toString().padStart(2, '0');

	return `${day} ${month} ${year} at ${hours}:${minutes}`;
}

const PlainDate = (isoString) => {
	const date = new Date(isoString);
	const day = date.getUTCDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getUTCFullYear();


	return `${day} ${month} ${year}`;
}

const truncateText = (text, wordLimit) => {
	const words = text.split(' ');
	if (words.length <= wordLimit) return text;
	return words.slice(0, wordLimit).join(' ') + '...';
};

export const utils = {
	decryptData,
	encryptData,
	objectUpdate,
	removeItemLocalStorage,
	getItemLocalStorage,
	setItemLocalStorage,
	FormatDate,
	PlainDate,
	truncateText
}
