import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./resource/store";


const root = document.getElementById('jumia_case_study');

(function () {
	const host = import.meta.env.VITE_HOST;
	localStorage.setItem('host', host)
	ReactDOM.createRoot(root).render(

		<Provider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
		</Provider>


	);

}());
{/* <React.StrictMode></React.StrictMode>, */ }