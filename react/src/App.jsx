import './App.css'
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "./resource/actions/CheckAuthenticationAction";
import { JumiaScrape } from './pages/admin/JumiaScrape';
import { Home } from './pages/home/Home';

import { LoginComponent } from './pages/auth/LoginComponent';
import { RegisterComponent } from './pages/auth/RegisterComponent';
import { AlreadyAuthenticated } from './pages/auth/AlreadyAuthenticated';
import { NavBar } from './pages/navbar/NavBar';
import { ProductsCategory } from './pages/products/ProductsCategory';
import { Products } from './pages/products/Products';
import { ProductInfo } from './pages/products/ProductInfo';
import { AccountDetails } from './pages/admin/AccountDetails';
import { AccountSettings } from './pages/admin/AccountSettings';
import { ProfileProducts } from './pages/admin/ProfileProducts';
import { Footer } from './pages/footer/Footer';
import { ScrapeProjectEvents } from './pages/scrape/ScrapeProjectEvents';

const App = React.memo(() => {
	const dispatch = useDispatch();

	const memoizedCheckAuthentication = React.useCallback(() => {
		dispatch(checkAuthentication());
	}, [dispatch]);

	React.useEffect(() => {
		memoizedCheckAuthentication();
	}, [memoizedCheckAuthentication]);

	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/register" element={<RegisterComponent />} />
				<Route path="/authenticated" element={<AlreadyAuthenticated />} />
				<Route path="/profile" element={<AccountDetails />} />
				<Route path="/profile/settings" element={<AccountSettings />} />
				<Route path="/profile/products-alert" element={<ProfileProducts />} />
				<Route path="/profile/scrape" element={<JumiaScrape />} />
				<Route path="/categories" element={<ProductsCategory />} />
				<Route path="/category/:categorySLUG" element={<Products />} />
				<Route path="/product-info/:productSLUG" element={<ProductInfo />} />
				<Route path="/project-scrape" element={<ScrapeProjectEvents />} />
				<Route path='*' element={<Navigate to="/" />} />
			</Routes>
			<Footer />
		</>
	);
});

App.displayName = "App";

export default App;

